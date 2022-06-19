/*
    規則說明：
    1. 所有自訂的class，前墜皆會加上"_"。
    2. 此檔案的function，前墜皆會加上"_"。 (但單頁的function不加，可以更好區別function位置。)
    3. 所有出現在此處的js，必定共用。 (所以單頁才用到的js，就只會寫在該頁。)
    4. 在HTML中，"js-"出現在css或attribute中，必定跟js有關。
*/

    // 每一頁依賴的JS
    $(function(){
        new _PopTarget // 彈出方框，點擊其他地方關閉。
        new _BindBackdrop('._wrap','_m-wrap-backdrop') // 方框彈出時，出現半透明背景。
        new _ScrollNav('#m-navbar') // 手機版菜單上下滑 顯示/隱藏
    })


    /** 判斷HTML物件，產生頁籤 => [<] [1][2][3]...[5][6] [>]
     * @requires 依賴套件: jquery.twbsPagination.min.js
     * @param {string} contSel 參考物件 EX: '#table > tr'
     * @param {string} drawSel 繪製頁籤 EX: '#pagination'
     * @param {number} showEntries 一頁顯示幾個? EX: 10
     * 
     * 使用方法： 
     * JS: new _Pagination({ contSel: '#table > tr', drawSel: '#pagination'})
     * HTML:   
     *      <table id="table"> <tr></tr>... </table>
     *      <ul id="pagination"></ul>
     */
    class _Pagination {
        constructor(args){
            let def = {
                contSel: null,
                drawSel: null,
                entries: 10,
                notJoinContSel: '.js-pagination-item-none'
            }
            Object.assign(def,args)
            Object.assign(this,def)
            this.$pagination = null
            $('body').append(`<style>${this.notJoinContSel}{display: none!important;}</style>`)
            this.twbsPagination()
        }

        get totalItems(){
            return $(this.contSel).not(this.notJoinContSel).length
        }

        get totalPages(){
            return 1 + parseInt( this.totalItems / this.entries )
        }

        update(args){
            Object.assign(this,{...args})
            this.twbsPagination()
        }

        twbsPagination(){
            this.switchItems(1)
            if (this.$pagination){
                this.$pagination.twbsPagination('destroy');
            }
            if (this.totalPages > 1){
                let This = this
                this.$pagination = $(This.drawSel).twbsPagination({
                    totalPages: This.totalPages,
                    visiblePages: 7,
                    prev: '<i class="fa fa-angle-left fz-18"></i>',
                    next: '<i class="fa fa-angle-right fz-18"></i>',
                    first: '',
                    last: '',
                    onPageClick: function (event, page) {
                        This.switchItems(page)
                    }
                })
            }
        }

        switchItems(page){
            $(this.contSel).hide()
            let shows = this.entries * (page - 1)
            for ( let i=0; i<this.entries; i++ ){
                $(this.contSel).not(this.notJoinContSel).eq( i + shows ).show()
            }
        }
    }



    /*  功能說明：
        - 在Html上設定[目標]。 <js-popTarget="#target">
        - 按下此Html將使[目標]顯示。 $('#target').show()
        - 按下其他處將使[目標]隱藏。 $('#target').hide()

        使用方法：
            1. js-popTarget 指定目標
            2. js-popTarget-mode 可設成 'toggle' ( show會變成toggle )
            3. js-popTarget-function 打開目標後執行自訂的 function
            EX: <button js-popTarget="#menu" js-popTarget-mode="toggle" js-popTarget-function="alert('you opened!')"> Menu </button>
                <nav id="menu"> 目標內容... </nav>
    */
    class _PopTarget {
        constructor(){
            this.targets = []
            if ( $('[js-popTarget]').length > 0 ){
                this.showTarget()
                this.filterTarget()
                this.hideTarget()
            }
        }

        showTarget(){
            // 設置 js-popTarget 的目標，click 後打開目標
            let _this = this
            $('[js-popTarget]').each( function(){
                let target = $(this).attr('js-popTarget')
                _this.targets.push( target )
                $(this).on('click',function(){
                    if ( $(this).attr('js-popTarget-mode') === 'toggle' ){
                        $(target).toggle()
                    } else {
                        $(target).show()
                    }
                    if ( $(this).attr('js-popTarget-function') ){
                        Function( $(this).attr('js-popTarget-function') )()
                    }
                })
            })
        }

        // 篩選重複
        filterTarget(){
            this.targets = this.targets.filter( (elem, index, arr)=>{
                return arr.indexOf(elem) === index
            })
        }

        // 按下其他地方時，隱藏目標
        hideTarget(){
            $.each( this.targets, function( index, elem ){
                $(document).click(function(e) {
                    let targetName = $(e.target).attr('js-popTarget') ? 
                        $(e.target).attr('js-popTarget') : 
                        $(e.target).closest('[js-popTarget]').attr('js-popTarget')
                        
                    /* 隱藏目標條件：
                        1. [按下處html] 是 [目標html] 
                        2. [按下處html] 是 [目標html] 的裡面
                        3. [按下處是開關，開關的目標名字] 等於 [目標名字]
                        4. [按下處的父類是開關，開關的目標名字] 等於 [目標名字]
                        以上皆非，則關閉目標。
                    */
                    if ( !$(elem).is(e.target) && $(elem).has(e.target).length === 0 && !$(elem).is( $(targetName) ) ) {
                        $(elem).hide()
                    }
                })
            })
        }
    }



    /*  功能說明：
        - 在Html上設定[目標]。 <js-backdrop-bind="#target">
        - 當[目標]隱藏時，隱藏backdrop。
        - 當[目標]顯示時，顯示backdrop。

        - #target的顯示/隱藏，會使目標處新增/刪除css。 也就達到隨#target顯示/隱藏，同步新增/刪除backdrop效果。

        使用方法：
            JS: new _BindBackdrop('.wrap','bg-primary')
            HTML: 
                <div class="wrap">
                    <button js-backdrop-bind="#target" onclick="$('#target').toggle()">MENU</button>
                    <nav id="target" style="display:none"> 目標內容... </nav>
                </div>
    */
    class _BindBackdrop {
        constructor( targetSel, backdropClass ){
            this.target = targetSel || '._warp'
            this.backdrop = backdropClass || '_backdrop'
            this.backdropHideItself = true

            let This = this
            $(document).on('click', function(e){
                // let jsBackdrop = null
                // if ( $(e.target).attr('js-backdrop') || $(e.target).closest('[js-backdrop]').attr('js-backdrop') ){
                //     jsBackdrop = $(e.target).attr('js-backdrop') || $(e.target).closest('[js-backdrop]').attr('js-backdrop')
                // }

                // 綁定目標，如果目標隱藏，backdrop也會隱藏
                if ( $('[js-backdrop-bind]').length > 0 ){
                    let BackdropShow = false
                    $.each( $('[js-backdrop-bind]'), function( index, elem ){
                        let tgSel = $(elem).attr('js-backdrop-bind')
                        if ( $(tgSel).length > 0 && !( $(tgSel).css('display') === 'none') ){
                            BackdropShow = true
                        }
                    })
                    if (BackdropShow){
                        $(This.target).addClass(This.backdrop)
                    } else {
                        $(This.target).removeClass(This.backdrop)
                    }
                }

                // 判斷 js-backdrop 為 show/hide
                // if ( jsBackdrop == 'hide' ){
                //     $(This.target).removeClass(This.backdrop)
                // } else if ( jsBackdrop == 'show' ){
                //     $(This.target).addClass(This.backdrop)
                // }
            })
            
            // if (this.backdropHideItself){
            //     $(document).on('click', function(e){
            //         if ( $(e.target).hasClass(This.backdrop) ){
            //             $(This.target).removeClass(This.backdrop)
            //         }
            //     })
            // }
        }
    }

    // 同上
    function _bindBackdrop( targetSel, backdropClass ){
        $(document).on('click', function(e){
            if ( $('[js-backdrop-bind]').length > 0 ){
                let BackdropShow = false
                $.each( $('[js-backdrop-bind]'), function( index, elem ){
                    let tgSel = $(elem).attr('js-backdrop-bind')
                    if ( !( $(tgSel).css('display') === 'none') ){
                        BackdropShow = true
                    }
                })
                if (BackdropShow){
                    $(targetSel).addClass(backdropClass)
                } else {
                    $(targetSel).removeClass(backdropClass)
                }
            }
        })
    }



    function _toTop(){
        window.scrollTo(0,0)
    }


    /**
     * 客製化手機版菜單行為 - 上下滑 顯示/隱藏。
     */
    class _ScrollNav {
        constructor(jqSel){
            this.prevPos = window.pageYOffset,
            this.jqSel = jqSel
            this.onScroll()
        }
        onScroll(){
            let This = this
            window.onscroll = function() {
                let currentPos = window.pageYOffset
                if ( This.prevPos > currentPos ) {
                    $(This.jqSel).css('bottom', "-52px")
                } else {
                    $(This.jqSel).css('bottom', "0")
                }
                This.prevPos = currentPos
            }
        }
    }

    // 自動縮放超出寬度範圍的圖片。
    class _AutoResizeEditorImg{
        constructor(sel){
            this.sel = sel
            this.update()
            // this.onResize()
        }

        update(){
            let This = this
            $.each( $(This.sel).find('img'), function(index,elem){
                let cnt = 2*10*100 // 設定2分鐘圖出不來就取消判斷圖大小
                let timer = setInterval( function(e) { // 偵測圖片是否已載好，故用timer迴圈
                    cnt --
                    if ( elem.naturalWidth > 0 ) {
                        clearInterval(timer)
                        let attrWidth = $(elem).attr('width')
                        if ( attrWidth !== undefined && +attrWidth > 0 ){
                            $(elem).css( 'max-width', +attrWidth )
                        } else {
                            $(elem).css( 'max-width', elem.naturalWidth )
                        }
                        $(elem).addClass('w-100 h-auto')
                    }
                    if ( cnt < 0 ){
                        clearInterval(timer)
                        let srcUrl = $(elem).attr('src')
                        $(elem).attr('src', srcUrl + '---Timeout!').attr('alt','Image loading timeout')
                        console.log('載圖逾時')
                    }
                    console.log('載圖中')
                }, 10);

                elem.onload = function(e){
                    // console.log(e)
                }

                elem.onerror = function(){ // 壞圖就直接取消判斷
                    clearInterval(timer);
                }
            })
        }

        dealImg(){
            let This = this
            $.each( $(This.sel).find('img'), function(index,elem){
                if ( elem.naturalWidth > 0 ) {
                    clearInterval(timer)
                    $(elem).css('max-width', elem.naturalWidth )
                }
            })
        }

        onResize(){
            let This = this
            $(window).on('resize',function(){
                This.dealImg()
            })
        }
    }


    class _OwlPeople {
        constructor(sel){
            this.owlPost = sel || '._owl-people'
            this.update()
            this.onResize()
        }

        update(){
            var checkWidth = window.innerWidth
            var owlPost = $( this.owlPost );
            if (checkWidth > 768) {
                $.each( owlPost, function(idx){
                    if (typeof owlPost.eq(idx).data('owl.carousel') != 'undefined') {
                        owlPost.eq(idx).data('owl.carousel').destroy()
                    }
                    owlPost.eq(idx).removeClass('owl-carousel')
                })
            } else if (checkWidth < 768) {
                owlPost.addClass('owl-carousel')
                owlPost.owlCarousel({
                    items: 1,
                    dots: false,
                    nav: true,
                    margin: 20,
                    responsive:{
                        0:{
                            items:2,
                            autoWidth: true,
                        },
                        576:{
                            items:3,
                            autoWidth: true,
                        },
                        768:{
                            items:3,
                            autoWidth: true,
                        },
                        // 992:{
                        //     items:4,
                        // },
                        // 1200:{
                        //     items:5,
                        // }
                    },
                    navText : [
                        "<i class='fa fa-chevron-left text-white fz-15'></i>",
                        "<i class='fa fa-chevron-right text-white fz-15'></i>"
                    ]
                })
            }
        }

        onResize(){
            let This = this
            $(window).resize( function(){ 
                This.update()
            });
        }
    }


/*====== TODO: 以下有空再研究，用不到可刪 ======*/
// var si = new _SearchInput({
//   data: ajaxData,
// })
// si.returnData()
class _SearchInput{
    constructor(args){
        let def = {
            data: [],
            compares: [
                {input: 'Law', targets: ['title','content'] },
                {input: '', targets: ['title',''] },
            ],
            matchSels: []
        }
        Object.assign(def,args)
        Object.assign(this,def)
        toCompare()
    }

    update(args){
        Object.assign(this,{...args})
        toCompare()
    }

    toCompare(){
        $.each( this.data, function( dIdx, data ){
            $.each( this.compares, function( cIdx, compare ){
                let inpTxt = compare.input.toLowerCase()
            })
        })
    }
}

/**
 * 搜尋input的字，使目標秀出，非目標隱藏
 * 搜尋input的字，與container裡的compare的字做比較，如果不同則使hider隱藏。
 * @param {string} input - EX: this
 * @param {string} compare - EX: 'td'
 * @param {string} container - EX: 'table'
 * @param {string} hider - EX: 'tr'
 * @param {string} hideClass - Add hideClass replace $.hide()
 */
function _searchInput( input, compare, container, hider, hiderClass ){
    let value = $(input).val()
    if (value == "" || value == undefined){
        switchTarget( hider,'show')
        return false;
    }

    switchTarget( hider,'hide')
    let lValue = $.trim( value.toString().toLowerCase() )
    $.each( $(container + ' ' + compare), function(index,elem){
        let lText = $.trim( $(elem).text().toString().toLowerCase() )
        if ( lText.indexOf( lValue ) > -1 ){
            switchTarget( elem,'show')
        }
    })

    function switchTarget( sel, display = 'show' ){
        if ( display == 'show' ){
            if ( hiderClass ){
                $(sel).closest(hider).removeClass(hiderClass)
            } else {
                $(sel).closest(hider).show();
            }
        } else {
            if ( hiderClass ){
                $(sel).closest(hider).addClass(hiderClass)
            } else {
                $(sel).closest(hider).hide();
            }
        }
    } 
}
