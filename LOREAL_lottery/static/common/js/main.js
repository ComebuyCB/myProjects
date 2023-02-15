set100vh()
window.onresize = function(){
    set100vh()
}

function set100vh(){
    document.documentElement.style.setProperty('--100vh', window.innerHeight + 'px' )
}


/**
 * 在容器內放置一張圖片<img>，使圖片超出位置可以在容器內自由拖曳。(需載入jqueryUI)
 * @param {string} boxSel box Selector 圖片可視的範圍視窗，
 * @param {string} filmSel film Selector 圖片的上一層<div>，
 * @param {string} imgSel img Selector 圖片本身<img>，
 * @param {object} option 設定值如下:
 * 
 * @param {boolean} option.draggable 是否可抓取 (依賴jqueryUI)
 * @param {boolean} option.scrollable 是否可滑鼠滾動
 * @param {boolean} option.cursorGrab 鼠標是否要有抓取的圖示
 * @param {array} option.defaultPosition [X,Y]，圖片初始位置(X,Y值 0~100)，預設值: [50,50]置中，
 * @param {number} option.limitStrength 超出外圍後，難以拖拉的強度
 * HTML範例: <div id="BOX"> <div class="CONT"> <img id="IMG"/> </div> </div> ==> JS: JS_dragImgInBox('#BOX','#CONT','#IMG')
 */
function JS_dragImgInBox( boxSel, filmSel, imgSel, option = {} ) {
    let OPT = {
        'draggable': true,
        'scrollable': true,
        'cursorGrab': true,
        'defaultPosition': [50,50],
        'limitStrength': 4,
        'onInit': function(){},
        'onResize': function(){},
    }

    Object.assign( OPT, option )

    let oSel = {
        scale: { // 比例 = 寬 / 高 (以寬為準)
            clipped: 'y',
            box: 0,
            img: 0,
            update: function () {
                oSel.scale.box = +( $(boxSel).outerWidth() / $(boxSel).outerHeight() ).toFixed(5)
                oSel.scale.img = +( $(imgSel).outerWidth() / $(imgSel).outerHeight() ).toFixed(5)
                $(boxSel).css({ '--boxRatio': oSel.scale.box });
                $(boxSel).css({ '--imgRatio': oSel.scale.img });
            },
            autoCover: function () {
                if (oSel.scale.box < oSel.scale.img) { // 盒寬 < 圖寬 (代表圖寬超出範圍，所以圖填滿高100%後，圖寬就會跑出去。)
                    oSel.scale.clipped = 'x'
                    $(filmSel).css({ 'width': 'auto', 'height': '100%' })
                    $(imgSel).css({ 'width': 'auto', 'height': '100%' })
                } else {
                    oSel.scale.clipped = 'y'
                    $(filmSel).css({ 'width': '100%', 'height': 'auto' })
                    $(imgSel).css({ 'width': '100%', 'height': 'auto' })
                }
            },
        }
    }

    let oIMG = {
        defaultPos: { // 初始圖片位置 (置中)
            left: 0,
            top: 0,
            update: function () {
                let defLeft = ( $(boxSel).outerWidth() - $(imgSel).outerWidth() ) * (OPT.defaultPosition[0] * 0.01);
                let defTop = ( $(boxSel).outerHeight() - $(imgSel).outerHeight() ) * (OPT.defaultPosition[1] * 0.01);

                oIMG.defaultPos.left = defLeft;
                oIMG.defaultPos.top = defTop;
                oIMG.preMovePos.left = defLeft;
                oIMG.preMovePos.top = defTop;

                if (oSel.scale.clipped === 'x') {
                    $(filmSel).css({ 'top': 0, 'left': defLeft });
                } else {
                    $(filmSel).css({ 'top': defTop, 'left': 0 });
                }
            }
        },
        preMovePos: { // 前一次的位置
            left: 0,
            top: 0,
        },
        limit: { // 圖片邊界
            left: 0,
            top: 0,
            maxLeft: 0,
            maxTop: 0,
            update: function () {
                oIMG.limit.maxLeft = $(boxSel).outerWidth() - $(imgSel).outerWidth();
                oIMG.limit.maxTop = $(boxSel).outerHeight() - $(imgSel).outerHeight();
            }
        },
        outOfLimit: { // 是否超出邊界
            left: false,
            top: false,
        }
    }

    $(boxSel).css({ 'overflow': 'hidden', 'user-select': 'none' })
    $(filmSel).css({ 'display': 'inline-block', 'position': 'relative' })
    $(imgSel).css({ 'display': 'block', 'visibility': 'hidden' })

    const updatePosition = () => {
        oSel.scale.update();
        oSel.scale.autoCover();
        oIMG.defaultPos.update();
        oIMG.limit.update();
        return {
            ratio: oSel.scale.img, 
            clipped: oSel.scale.clipped,
        }
    }

    let timer = setInterval( ()=> {
        if ( $(imgSel).get(0).complete ){
            $(imgSel).css('visibility', 'visible')
            const callBackObj = updatePosition()
            OPT.onInit( callBackObj )
            clearInterval(timer)
        }
    }, 10)
    
    $(window).bind('resize', function() { // 視窗改變大小事件
        const callBackObj = updatePosition()
        OPT.onResize( callBackObj )
    })


    const FN_scrollable = () => { // 滾輪事件
        $(window).bind('wheel', function (event) {
            if ( $(event.target).hasClass('modal') || $(event.target).closest('.modal').length > 0 ){ // 客製化~ 如果BS的modal打開時，目標不滑動。
                return;
            }
            if( event.originalEvent.deltaY < 0 ){
                // console.log('Scroll up');
                if (oSel.scale.clipped === 'x') {
                    oIMG.preMovePos.left = (oIMG.preMovePos.left + 100 > oIMG.limit.left) ? oIMG.limit.left : oIMG.preMovePos.left + 100;
                    $(filmSel).not('.animating').stop().animate({
                        left: oIMG.preMovePos.left
                    }, 200)
                } else {
                    oIMG.preMovePos.top = (oIMG.preMovePos.top + 100 > oIMG.limit.top) ? oIMG.limit.top : oIMG.preMovePos.top + 100;
                    $(filmSel).not('.animating').stop().animate({
                        top: oIMG.preMovePos.top
                    }, 200)
                }
            } else {
                // console.log('Scroll down');
                if (oSel.scale.clipped === 'x') {
                    oIMG.preMovePos.left = (oIMG.preMovePos.left - 100 < oIMG.limit.maxLeft) ? oIMG.limit.maxLeft : oIMG.preMovePos.left - 100;
                    $(filmSel).not('.animating').stop().animate({
                        left: oIMG.preMovePos.left
                    }, 200)
                } else {
                    oIMG.preMovePos.top = (oIMG.preMovePos.top - 100 < oIMG.limit.maxTop) ? oIMG.limit.maxTop : oIMG.preMovePos.top - 100;
                    $(filmSel).not('.animating').stop().animate({
                        top: oIMG.preMovePos.top
                    }, 200)
                }
            }
        });
    }

    const FN_draggable = () => {
        let csGrab = OPT.cursorGrab ? 'grab' : ''
        let csGrabbing = OPT.cursorGrab ? 'grabbing' : ''
        $(filmSel).css({ 'cursor': csGrab });

        $(filmSel).on('mousedown', function (event) {
            $(this).css({ 'cursor': OPT.cursorGrab ? 'grabbing' : '' })
            
            // console.log( // for debug
            //     //event, 
            //     'left: '+((event.offsetX/event.target.offsetWidth)*100).toFixed(1)+'%; top: '+((event.offsetY/event.target.offsetHeight)*100).toFixed(1)+'%;',
            //     ' '+((event.offsetX/event.target.offsetWidth)*100).toFixed(1)+'% '+((event.offsetY/event.target.offsetHeight)*100).toFixed(1)+'%'
            // )
        }).on('mouseup', function () {
            $(this).css({ 'cursor': csGrab });
        }).on('mouseenter', function () {
            $(this).css({ 'cursor': csGrab });
        })

        let cntMove = 0;
        $(filmSel).draggable({
            start: function (evt, ui) {
                cntMove = 0;
                $(this).css('pointer-events','');
            },
            drag: function (evt, ui) {
                cntMove ++;
                if ( cntMove > 10 ){ // 如果移動
                    $(this).css('pointer-events','none');
                    // console.log('按連結將會無效')
                }

                $(this).css({ 'cursor': csGrabbing });
                
                oIMG.outOfLimit.left = false;
                oIMG.outOfLimit.top = false;
    
                /* LEFT 若不超出左右邊界，紀錄前一個位置(preMovePos) --> 目的: 當drag事件stop後: 如果超出邊界，則回到這位置(preMovePos) */
                if (ui.position.left > oIMG.limit.left) {
                    ui.position.left = (ui.position.left - oIMG.preMovePos.left) / OPT.limitStrength; /* 若超出邊界，使抓取移動變難 */
                    oIMG.outOfLimit.left = true
                }
                if (ui.position.left < oIMG.limit.maxLeft) {
                    ui.position.left = (ui.position.left - oIMG.preMovePos.left) / OPT.limitStrength + oIMG.limit.maxLeft;
                    oIMG.outOfLimit.left = true
                }
                
                if (!oIMG.outOfLimit.left) {
                    oIMG.preMovePos.left = ui.position.left; /* 若未超出邊界，紀錄前一個位置 = 現在位置，作為下次取用 */
                }
    
                /* TOP */
                if (ui.position.top > oIMG.limit.top) {
                    ui.position.top = (ui.position.top - oIMG.preMovePos.top) / OPT.limitStrength;
                    oIMG.outOfLimit.top = true
                }
                if (ui.position.top < oIMG.limit.maxTop) {
                    ui.position.top = (ui.position.top - oIMG.preMovePos.top) / OPT.limitStrength + oIMG.limit.maxTop;
                    oIMG.outOfLimit.top = true
                }
                if (!oIMG.outOfLimit.top) {
                    oIMG.preMovePos.top = ui.position.top;
                }
            },
            stop: function (evt, ui) {
                cntMove = 0;
                $(this).css('pointer-events','');
                /* 抓取放開時，若超出邊界，利用動畫將圖片返回上一個位置 */
                if (oIMG.outOfLimit.left || oIMG.outOfLimit.top) {
                    $(this).stop().animate({
                        left: oIMG.preMovePos.left,
                        top: oIMG.preMovePos.top
                    }, 250, function () {
                        $(this).removeClass('animating')
                    }).addClass('animating') // 做個標記，正在動畫的class
                }
            },
        });
    }

    if ( OPT.scrollable ){
        FN_scrollable()
    }

    if ( OPT.draggable ){
        FN_draggable()
    }
}


function JS_randomDegForXY( option = {} ){ // 隨機角度生成XY定點
    let OPT = {
        total: 52,
        radius: 10,
        interval: [[]],
    }
    Object.assign( OPT, option )

    let rd = Math.floor( Math.random() * OPT.total )
    if ( OPT.interval[0][0] !== undefined ){
        let arr = []
        for (let [st,ed] of OPT.interval){
            arr = arr.concat( Array.from({length: ed-st+1}, (val,idx) => idx + st ) )
        }
        rd = arr[ Math.floor( Math.random() * arr.length ) ] 
    }

    let perDeg = 360 / OPT.total
    let deg = rd * perDeg // 角度
    let rad = deg * Math.PI / 180 // 弧度
    let x = Math.cos( rad ) * OPT.radius
    let y = Math.sin( rad ) * OPT.radius
    return [x,y]
}


function JS_renderShine( opt ){
    const obj = {
        container: '#shineBox',
        className: 'shiny',
        mid: {x: 50, y: 50},
        x: 0,
        y: 0,
        width: 20,
        ratio: 1.77,
        maxQty: 60,
    }
    Object.assign( obj, opt )
    if ( $('.'+ obj.className).length >= obj.maxQty ){ return true }
    const dur = (Math.random() * 1.5 + 1).toFixed(1)
    const imgSrc = '../static/common/img/shine.png'
    const left = (obj.x + obj.mid.x).toFixed(2)
    const top = ((obj.y*obj.ratio) + obj.mid.y).toFixed(2)
    const el = `<img class="${obj.className}" src="${imgSrc}" style="--width: ${obj.width}%; left: ${left}%; top: ${top}%; animation-duration: ${dur}s;" onanimationend="$(this).remove()">`
    $(obj.container).append( el )
}

// function randomXY( num ){
//     let z2 = num ** 2
//     let y2 = Math.random() * z2
//     let y = Math.sqrt(y2)
//     let x = Math.sqrt(z2 - y2)
//     return [ Number( x.toFixed(3) ), Number( y.toFixed(3) ) ]
// }