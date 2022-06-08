
$(function(){
    htmlRepeat()
    urlSelected()
    detectDevice_RemoveAnother()
    followCursor()
})

/*=== Common Js ===*/
    /**
     * 找url的參數值
     * @param {(string|string[]|{})} param 可填寫: name / [name...] / '' / {}
     * @param {string} url =window.location.href
     * @return {(string|string[]|{})} 回傳值
     */
    function getUrlParam( param, url ){
        let vUrl = url || window.location.href
        let queryString = vUrl.replace(/.*\?/g,'').replace(/#.*/g,'')
        const urlSearchParams = new URLSearchParams(queryString)
        
        // 文字
        if ( param && typeof param === 'string' ){
            return urlSearchParams.get(param)
        }

        // 陣列
        if ( param && Array.isArray(param) ){
            return param.map( r => urlSearchParams.get(r) )
        }

        // 空值 || "" || {}
        if ( typeof param === 'undefined' || param === '' || ( typeof param === 'object' && Object.keys(param).length == 0 ) ){
            console.log( Object.fromEntries(urlSearchParams.entries()) )
            return Object.fromEntries(urlSearchParams.entries())
        }
        
        return null
    }
    /* 範例: */
    // console.log( '單個: return 字串', getUrlParam('type') )
    // console.log( '多個: return 陣列', getUrlParam(['type','length']) )
    // console.log( '空值: return 物件', getUrlParam(), getUrlParam(''), getUrlParam({}) )
    // console.log( '第二參數指定連結:', getUrlParam('type', 'www.abc.com?type=123') )



    /**
     * 1. js-popTarget 指定目標打開，按其他處關閉目標
     * 2. js-popTargetMode 可設成 'toggle'
     * EX: <button js-popTarget="#menu" js-popTargetMode="toggle">Menu</button>
     *     <nav id="menu"> 目標內容... </nav>
     */
    class PopupTargets {
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
                    if ( $(this).attr('js-popTargetMode') === 'toggle' ){
                        $(target).toggle()
                    } else {
                        $(target).show()
                    }
                })
            })
        }

        // 篩選重複
        filterTarget(){
            this.targets.filter( (elem, index, arr)=>{
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

    /**
     * 複製該html N次
     */
    function htmlRepeat(){
        $.each( $('[js-html-repeat]'), function(idx,ele){
            let repeat = $(ele).attr('js-html-repeat')
            $(ele).removeAttr('js-html-repeat')
            
            let tpl = $(ele)[0].outerHTML
            let str = `<!-- js-html-repeat="${repeat}"-->`
            for ( let i=0; i<+repeat; i++){
                str += tpl
            }
            $(ele)[0].outerHTML = str
        })
    }


    /**
     * 是否為行動裝置?
     * return {boolean}
     */
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0))
    }


    /**
     * 移除不正確的裝置
     * <div js-device="pc"> 手機版將被移除
     * <div js-device="mobile"> 電腦版將被移除
     */
    function detectDevice_RemoveAnother(){
        if ( isTouchDevice() ){
            $('[js-device=pc]').remove()
        } else {
            $('[js-device=mobile]').remove()
        }
    }



/*=== For Templates ===*/
    function _alert( title, content, fn, text_ok ){
        if (title){
            $('#alert').find('.js-title').show()
            if (title == 'success'){
                $('#alert').find('.js-title').html('').addClass('icon_success')
            } else {
                $('#alert').find('.js-title').html( title ).removeClass('icon_success')
            }
        } else {
            $('#alert').find('.js-title').hide()
        }

        if (content){
            $('#alert').find('.js-content').show().html( content )
        } else {
            $('#alert').find('.js-content').hide()
        }
        
        // $('#alert').find('.js-ok').text( text_ok || '確認' )

        if (fn){
            $('#alert').one('hidden.bs.modal', function(){
                fn()
            })
        }

        $('#alert').modal('show')
    }


    function _confirm( title, content, fn, text_ok, text_no ){
        if (title){
            $('#confirm').find('.js-title').show()
            $('#confirm').find('.js-title').html( title )
        } else {
            $('#confirm').find('.js-title').hide()
        }

        if (content){
            $('#confirm').find('.js-content').show().html( content )
        } else {
            $('#confirm').find('.js-content').hide()
        }

        // $('#confirm').find('.js-ok').text( text_ok || '是' )
        // $('#confirm').find('.js-no').text( text_no || '否' )
        
        if (fn){
            $('#confirm').find('.js-ok').off().one('click',function(){
                fn()
                $('#confirm').modal('hide')
            })
        }

        $('#confirm').modal('show')
    }


    /**
     * 物件跟隨滑鼠移動
     */
    function followCursor(){
        let $target = $('.js-follow-cursor')
        $target.closest('.js-follow-cursor-container').on('mousemove', function(evt){
            let oW = $(this).outerWidth()
            let oH = $(this).outerHeight()

            /* 滑鼠在 closest 內的位置 */
            let px = evt.clientX - evt.currentTarget.getBoundingClientRect().left
            let py = evt.clientY - evt.currentTarget.getBoundingClientRect().top

            /* 偏移量/2 */
            let dx = ( px - (oW/2) ) / 2
            let dy = ( py - (oH/2) ) / 2

            let left = (oW/2) + dx
            let top = (oH/2) + dy

            $(this).children().css({'left': left ,'top': top })
        })
        $target.closest('.js-follow-cursor-container').on('mouseleave', function(evt){
            $target.css({'left': '50%', 'top': '50%'})
        })
    }


    /**
     * 人物跑馬燈
     * @requires jquery.marquee
     */
    function characterMarquee( target ){
        let str = $(target).html()
        let speed = $(target).width() * 16

        $(target).html( str + str )

        $(target).marquee({
            duration: speed,
            delayBeforeStart: -speed / 1.6,
            gap: 0,
            direction: 'right',
            duplicated: true
        })
    }

    /**
     * 切割 banner 的 title & desc 的縱向字數，
     * js-banner-title 縱向標題文字
     * js-banner-desc 縱向敘述文字
    */
    function sliceVerticalText(){
        let text_title = []
        let text_desc = []

        init()
        update()
        $(window).on('resize',function(){
            update()
        })

        function init(){
            $.each( $('.js-banner-title'), function(idx,ele){
                text_title.push( $(ele).text() )
            })
            $.each( $('.js-banner-desc'), function(idx,ele){
                text_desc.push( $(ele).text() )
            })
        }

        function update(){
            $.each( $('.js-banner-title'), function(idx,ele){
                let text = text_title[idx]
                if ( window.innerWidth >= 992 ){
                    let max_len = ( window.innerWidth >= 1200 ) ? 31 : 25
                    if ( text.length > max_len ){
                        text = text.slice(0,max_len) + '…'
                    }
                }
                $(ele).text( text )
            })
            $.each( $('.js-banner-desc'), function(idx,ele){
                let text = text_desc[idx]
                if ( window.innerWidth >= 992 ){
                    let max_len = ( window.innerWidth >= 1200 ) ? 82 : 67
                    if ( text.length > max_len ){
                        text = text.slice(0,max_len) + '…'
                    }
                }
                $(ele).text( text )
            })
            
        }
    }

    function urlSelected(){
        let queryString = window.location.search.replace(/\?/g,'').replace(/\#.*/g,'')
        let urlSearchParams = new URLSearchParams(queryString)
        let value = urlSearchParams.get('param')

        // show target
        $('[js-url-param]').hide()
        $(`[js-url-param*=${value}]`).show()

        // active trigger
        $.each( $('a[href]'), function(idx,ele){
            if ( $(ele).attr('href').indexOf('?param=') > -1 ){
                $(ele).removeClass('active')
            }
            if ( $(ele).attr('href').indexOf(`?param=${value}`) > -1 ){
                $(ele).addClass('active')
            }
        })

        $.each( $('select[onchange]'), function(idx,ele){
            if ( $(ele).attr('onchange').indexOf('?param=') > -1 ){
                $(ele).val(value)
            }
        })
    }