var _ES = { // Element Size
    sclTop: 0, // window.pageYOffset,
    sclBot: 0, // window.pageYOffset + window.innerHeight,
    winHei: 0, // window.innerHeight,
    winWid: 0, // window.innerWidth,
    pageHei: 0, // document.body.offsetHeight,
    headerHei: 0, // $('header').outerHeight(),
    footerHei: 0, // $('.footer_body').outerHeight(),
}
// console.log( 'sclTop','sclBot','winHei','winWid','pageHei','headerHei','footerHei' )
function elemSize(){
    _ES.sclTop = window.pageYOffset;
    _ES.sclBot = window.pageYOffset + window.innerHeight;
    _ES.winHei = window.innerHeight;
    _ES.winWid = window.innerWidth;
    _ES.pageHei = document.body.offsetHeight;
    _ES.headerHei = $('header').outerHeight();
    _ES.footerHei = $('.footer_body').outerHeight();

    // console.log( _ES.sclTop,_ES.sclBot,_ES.winHei,_ES.winWid,_ES.pageHei,_ES.headerHei,_ES.footerHei )
}

/* 修正畫面上的所有定位 */
function updateLocation() {
    elemSize();
    if (_ES.sclTop > 150) {
        $('.fixed_backToTop').show();
    } else {
        $('.fixed_backToTop').hide();
    }

    if ( _ES.sclBot + 1 > _ES.pageHei - _ES.footerHei ){
        $('.footer_top').addClass('mostBottom')
    } else {
        $('.footer_top').removeClass('mostBottom')
    }
}



/*=== 常用功能 ===*/
    /**
     * 指定現在的URL的參數，獲取該值
     * @param {string} sParam 參數
     * @returns {string} 該參數值
     */
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    /** 
     * 設置cookie
     * @param {string} name name
     * @param {string} value value
     * @param {boolean/number/string} expire 預設:false:不設定; true:10年; number: 1(秒); String:"2030-01-01T00:00:00";
     * @param {string} valueType 若value是物件時，下'json' 將把value值先轉成字串再存入cookie。
     */
    function setCookie( name, value, expire, valueType ) {
        if ( valueType && valueType.toLowerCase() == "json" ){
            value = JSON.stringify(value);
        }
        var today = new Date();
        var expStr = "";
        if (expire){
            if (expire === true) {
                today.setDate( 365*10 )
                expStr = today.toGMTString()
            } else if ( typeof(expire) === 'number' ){
                today.setTime( Math.floor( expire * 1000 + Date.now() ) )
                console.log( today )
                expStr = today.toGMTString()
            } else if ( typeof(expire) === 'string' ) {
                expStr = new Date( expire ).toGMTString()
            } else {
                alert( 'setCookie param Error!' )
            }
        }else{
            expStr = "Session";
        }
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expStr + ';path=/';
    }
    // setCookie('aaa','true',true)
    // setCookie('bbb','number',10)
    // setCookie('eee','string',"2025-11-11T00:00:00")
    // setCookie('ddd','nothing')
    // setCookie('eee',[{'a':'aa'},{'b':'bb'}],'','json')


    /** 
     * 取得cookie
     * @param {string} name name
     * @param {string} valueType 若value先前是物件轉字串時，下'json' 把value值還原成物件。
     * @returns {string} 回傳 value
     */
    function getCookie( name, valueType ) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null){
            if ( valueType && valueType.toLowerCase() == "json" ){
                return JSON.parse( decodeURIComponent(arr[2]) );
            }
            return decodeURIComponent(arr[2]);
        }
        return null;
    }


    /**
     * 偵測是否為手機
     * @returns {boolean} 是否為手機
     */
    function isMobileDevice() {
        var mobileDevices = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
        var isMobileDevice = false;
        for (i = 0; i < mobileDevices.length; i++) {
            if (navigator.userAgent.match(mobileDevices[i])) {
                isMobileDevice = true;
                break;
            }
        }
        return isMobileDevice;
    }

    /*function fullScreen( target ){ 
        $( target ).css({'width': window.innerWidth, 'height': window.innerHeight })
    }*/

    /**
     * 視窗高去扣除像header這類的浮動高，得到最終的高度。
     * @param {string} target ex: "#fullScreen"
     * @param {array} navTargetArray ex: ["#header","#footer"]
     */
    function fullScreenSubNav(target, navTargetArray) {
        var navTargetArray = navTargetArray ? navTargetArray : false
        var sumHeight = 0;
        if ( navTargetArray ) {
            navTargetArray.forEach(function (ele) {
                if ($(ele).length > 0) {
                    sumHeight += $(ele).outerHeight();
                }
            });
        }
        $(target).css({ 'width': '100%', 'height': window.innerHeight - sumHeight })
    }

    /**
     * 偵測是否為IE
     * @return {number} IE version, 0 = not IE。
     */
    function IEVersion() {
        var userAgent = navigator.userAgent; //取得瀏覽器的userAgent字串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判斷是否IE<11瀏覽器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6; //IE版本<=7
            }   
        } else if(isIE11) {
            return 11; //IE11  
        }else{
            return 0;//不是ie瀏覽器
        }
    }

    /**
     * 回上一頁
     * @param {string} url 
     */
    function historyBack( url ){
        if (document.referrer && document.referrer.indexOf(url) > -1 ){
            history.back();
        } else {
            window.location.href = url;
        }
    }

    /*function pressEvent(e) { // move、start、end
        if (isMobileDevice()) {
            switch (e) {
                case 'move':
                    return 'touchmove';
                    break;
                case 'start':
                    return 'touchstart';
                    break;
                case 'end':
                    return 'touchend';
                    break;
            }
        } else {
            switch (e) {
                case 'move':
                    return 'mousemove';
                    break;
                case 'start':
                    return 'mousedown';
                    break;
                case 'end':
                    return 'mouseup';
                    break;
            }
        }
    }*/



/*=== 特定頁面使用 ===*/
    /* header */
    function headerMenu_Selected(){
        var nowPath = window.location.pathname;
        $('.nav_links').find('a').each( function( idx, ele ){
            var menuLink = $(ele).attr('href');
            // console.log(menuLink)
            if ( nowPath.indexOf(menuLink) > -1) {
                $(ele).addClass('active');
            }
        })
    }
    $(function(){
        headerMenu_Selected()
    })

    /** 
     * 按下圖片，處理 header、footer的 顯示、隱藏
     * index.html、exhibition.html、exhibition_stand.html
     * @param {string} defaultHide 是否預設隱藏?
     * @param {number} minWidth 高於螢幕寬多少做這件事?
     */
    function dealToggleNav( clickSel, defaultHide, minWidth ){
        var toToggleNav = true;
        $('main').on('mousedown',function(){
            toToggleNav = true;
        }).on('mousemove',function(){
            toToggleNav = false;
        }).on('mouseup',function(event){
            if ( toToggleNav === true && event.target.id.indexOf('hover-links-pc') > -1){
                updateLocation();
                $('header').slideToggle({
                    start: function(){
                    },
                    progress: function(){
                        $('.js-stickHeader').css({'top': $('header')[0].offsetHeight + 'px'})
                    }
                });
                $('footer').slideToggle({
                    start: function(){
                        $('.footer_top').fadeToggle()
                    },
                    progress: function(){
                        $('.js-stickFooter').css({'bottom': $('footer')[0].offsetHeight + 'px'})
                    }
                });
            }
        })
        
        if ( clickSel ){
            $(clickSel).on('click', function(){
                updateLocation();
                $('header').slideToggle({
                    start: function(){
                    },
                    progress: function(){
                        $('.js-stickHeader').css({'top': $('header')[0].offsetHeight + 'px'})
                    }
                });
                $('footer').slideToggle({
                    start: function(){
                        $('.footer_top').fadeToggle()
                    },
                    progress: function(){
                        $('.js-stickFooter').css({'bottom': $('footer')[0].offsetHeight + 'px'})
                    }
                });
            })
        }

        function defaultHideNav( defHide ){
            if ( defHide === true || defHide === 'hide' ){
                $('header').hide();
                $('footer').hide();
                $('.footer_top').hide();
                $('.js-stickHeader').css({'top': ''})
                $('.js-stickFooter').css({'bottom': ''})
            } else if ( defHide === 'slideUp') {
                $('header').slideUp('slow');
                $('footer').slideUp('slow');
                $('.footer_top').fadeOut('slow');
                $('.js-stickHeader').css({'top': ''})
                $('.js-stickFooter').css({'bottom': ''})
            } else {
                $('header').show();
                $('footer').show();
                $('.footer_top').show();
                $('.js-stickHeader').css({'top': $('header').height() + 'px'})
                $('.js-stickFooter').css({'bottom': $('footer').height() + 'px'})
            }
        }

        function initNav(){
            $('header').css({'display': ''})
            $('footer').css({'display': ''})
            $('.footer_top').css({'display': ''})
            $('.js-stickFooter').css({'bottom': ''})
        }

        minWidth = minWidth ? minWidth : 0;

        updateLocation();
        if ( window.innerWidth >= minWidth ){
            defaultHideNav( defaultHide )
        }

        $(window).on('resize', function () {
            if ( window.innerWidth >= minWidth ){
                defaultHideNav( defaultHide )
            } else {
                initNav()
            }
        })
    }



/*=== 自製套件 ===*/
    /**
     * 在容器內放置一張圖片<img>，使圖片超出位置可以在容器內自由拖曳。(需載入jqueryUI)
     * @param {string} boxSel box Selector 圖片可視的範圍視窗，
     * @param {string} filmSel film Selector 圖片的上一層<div>，
     * @param {string} imgSel img Selector 圖片本身<img>，
     * @param {object} option 設定值如下:
     * @param {array} option.defaultPosition [X,Y]，圖片初始位置(X,Y值 0~100)，預設值: [50,50]置中，
     * @param {number} option.limitStrength 超出外圍後，難以拖拉的強度
     * @param {boolean} option.cursorGrab 鼠標是否要有抓取的圖示
     * @param {boolean} option.swiper 參雜swiper套件...
     * HTML範例: <div id="BOX"> <div class="CONT"> <img id="IMG"/> </div> </div> ==> JS: dragImgInBox('#BOX','#CONT','#IMG')
     */
    function dragImgInBox(boxSel, filmSel, imgSel, option ) {
        var oOption = option ? option : {};
        var OPT = {
            'defaultPosition': oOption.defaultPosition || [50,50],
            'limitStrength': oOption.limitStrength || 4,
            'cursorGrab': oOption.cursorGrab === false ? false : true,
            'swiper': oOption.swiper || false, // 客製化
        }

        var oSel = {
            scale: { // 比例 = 寬 / 高 (以寬為準)
                box: 0,
                img: 0,
                update: function () {
                    oSel.scale.box = $(boxSel).outerWidth() / $(boxSel).outerHeight();
                    oSel.scale.img = $(imgSel).outerWidth() / $(imgSel).outerHeight();
                },
                autoCover: function () {
                    if (oSel.scale.box < oSel.scale.img) { // 盒寬 < 圖寬 (代表圖寬超出範圍，所以圖填滿高100%後，圖寬就會跑出去。)
                        $(filmSel).css({ 'width': 'auto', 'height': '100%' })
                        $(imgSel).css({ 'width': 'auto', 'height': '100%' })
                    } else {
                        $(filmSel).css({ 'width': '100%', 'height': 'auto' })
                        $(imgSel).css({ 'width': '100%', 'height': 'auto' })
                    }
                }
            }
        }

        var oIMG = {
            defaultPos: { // 初始圖片位置 (置中)
                left: 0,
                top: 0,
                update: function () {
                    var defLeft = ( $(boxSel).outerWidth() - $(imgSel).outerWidth() ) * (OPT.defaultPosition[0] * 0.01);
                    var defTop = ( $(boxSel).outerHeight() - $(imgSel).outerHeight() ) * (OPT.defaultPosition[1] * 0.01);

                    oIMG.defaultPos.left = defLeft;
                    oIMG.defaultPos.top = defTop;
                    oIMG.preMovePos.left = defLeft;
                    oIMG.preMovePos.top = defTop;

                    if (oSel.scale.box < oSel.scale.img) {
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
        };

        oSel.scale.update();
        oSel.scale.autoCover();
        oIMG.defaultPos.update();
        oIMG.limit.update();

        // 視窗改變大小事件
        $(window).bind('resize', function () {
            var tm = setTimeout(function(){
                oSel.scale.update();
                oSel.scale.autoCover();
                oIMG.defaultPos.update();
                oIMG.limit.update();
                clearTimeout(tm)
            },0)
        })

        // 滾輪事件
        $(window).bind('wheel', function (event) {
            if ( $(event.target).hasClass('modal') || $(event.target).closest('.modal').length > 0 ){ // 客製化~ 如果BS的modal打開時，目標不滑動。
                return;
            }
            if( event.originalEvent.deltaY < 0 ){
                // console.log('Scroll up');
                if (oSel.scale.box < oSel.scale.img) {
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
                if (oSel.scale.box < oSel.scale.img) {
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
        
        $(boxSel).css({ 'overflow': 'hidden', 'user-select': 'none' })
        $(filmSel).css({ 'display': 'inline-block', 'position': 'relative' })
        $(imgSel).css({ 'display': 'block' })
        
        if ( OPT.cursorGrab ){
            $(filmSel).css({ 'cursor': 'grab' });
        }
        $(filmSel).on('mousedown', function (event) {
            if ( OPT.cursorGrab ){
                $(this).css({ 'cursor': 'grabbing' });
            }
            console.log( // for debug
                //event, 
                'left: '+((event.offsetX/event.target.offsetWidth)*100).toFixed(1)+'%; top: '+((event.offsetY/event.target.offsetHeight)*100).toFixed(1)+'%;',
                ' '+((event.offsetX/event.target.offsetWidth)*100).toFixed(1)+'% '+((event.offsetY/event.target.offsetHeight)*100).toFixed(1)+'%'
            )
        }).on('mouseup', function () {
            if ( OPT.cursorGrab ){
                $(this).css({ 'cursor': 'grab' });
            }
        }).on('mouseenter', function () {
            if ( OPT.cursorGrab ){
                $(this).css({ 'cursor': 'grab' });
            }
        })

        var cntMove = 0;
        $(filmSel).draggable({
            start: function (evt, ui) {
                cntMove = 0;
                $(this).removeClass('prevent_event');
            },
            drag: function (evt, ui) {
                cntMove ++;
                if ( cntMove > 10 ){ // 如果移動
                    console.log('按連結將會無效')
                    $(this).addClass('prevent_event');
                }
                if ( OPT.cursorGrab ){
                    $(this).css({ 'cursor': 'grabbing' });
                }
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
                    if (OPT.swiper && (ui.position.left > oIMG.limit.left+100 || ui.position.left+100 < oIMG.limit.maxLeft)){ // 客製化 -- swiper_pc是該套件參數(global)
                        swiper_pc.allowTouchMove = false;
                    }
                }else{
                    if (OPT.swiper && (ui.position.left > oIMG.limit.left+100 || ui.position.left+100 < oIMG.limit.maxLeft)){ // 客製化 -- swiper_pc是該套件參數(global)
                        swiper_pc.allowTouchMove = true;
                    }
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
                $(this).removeClass('prevent_event');
                /* 抓取放開時，若超出邊界，利用動畫將圖片返回上一個位置 */
                if (oIMG.outOfLimit.left || oIMG.outOfLimit.top) {
                    $(this).stop().animate({
                        left: oIMG.preMovePos.left,
                        top: oIMG.preMovePos.top
                    }, 250, function () {
                        $(this).removeClass('animating')
                    }).addClass('animating') // 做個標記，正在動畫的class
                }
                if (OPT.swiper){ // 客製化 -- swiper_pc是該套件參數(global)
                    swiper_pc.allowTouchMove = false;
                }
            },
        });
    }



/*=== 監聽事件 ===*/
    $(document).on('click', '.fixed_backToTop', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })

    window.onscroll = function () {
        updateLocation()
    };

    window.onresize = function () {
        $(function () {
            updateLocation()
        })
    };



/*=== DOM渲染後事件 ===*/
    $(function () {
        updateLocation();
        $('.modal.backdrop_gray').on('show.bs.modal', function (e) {
            $(function () {
                $('.modal-backdrop').addClass('backdrop_gray');
            })
        });
        // $(window).on('mousemove', function(event){
        //     console.log( event.screenX, event.screenY )
        // })
    })