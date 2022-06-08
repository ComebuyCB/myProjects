let gaKey = ''
if ( window.location.origin === 'https://comebuycb.github.io' ){
  gaKey = 'G-X0H8GHYWS9'
} else {
  gaKey = 'G-RK820WFQV2'
}
let gaScript = document.createElement('script')
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-' + gaKey
document.documentElement.firstChild.appendChild(gaScript)
gaScript.onload = function () {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  let code = `
    var script = document.createElement("script");
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', '${gaKey}');

    $.get('https://json.geoiplookup.io/?callback=?', res => {
      gtag('event', 'localHost', {
        'event_category': window.location.pathname,
        'event_label': new Date().toLocaleDateString() + ' ' + res.district + ' ' + res.ip,
        'non_interaction': true
      })
    }, 'json')
  `
  script.appendChild( document.createTextNode(code) )
  document.documentElement.firstChild.appendChild(script)
}

$(function(){
    htmlRepeat()
    urlSelected()

    document.documentElement.style.setProperty('--inner-height', `${window.innerHeight}px`)
    window.onresize = function(){
        document.documentElement.style.setProperty('--inner-height', `${window.innerHeight}px`)
    }
})

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
 * 用URL參數判斷該html 顯示與否
 */
function urlSelected(){
    let queryString = window.location.search.replace(/\?/g,'').replace(/\#.*/g,'')
    let urlSearchParams = new URLSearchParams(queryString)
    let value = urlSearchParams.get('param')

    // show target
    $('[js-url-param]').hide()
    $(`[js-url-param*=${value}]`).show()

    // remove target
    // $.each( $('[js-url-param]'), function(idx,ele){
    //     let params = $(ele).attr('js-url-param').split('||')
    //     if( params.indexOf(value) === -1 ){
    //         $(ele).remove()
    //     }
    // })

    // // active trigger
    // $.each( $('a[href]'), function(idx,ele){
    //     if ( $(ele).attr('href').indexOf('?param=') > -1 ){
    //         $(ele).removeClass('active')
    //     }
    //     if ( $(ele).attr('href').indexOf(`?param=${value}`) > -1 ){
    //         $(ele).addClass('active')
    //     }
    // })

    // $.each( $('select[onchange]'), function(idx,ele){
    //     if ( $(ele).attr('onchange').indexOf('?param=') > -1 ){
    //         $(ele).val(value)
    //     }
    // })
}