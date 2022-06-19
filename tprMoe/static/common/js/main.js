// 頁面至頂功能。
$(document).on('click', '#toTop', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})


/** 
 * 同步手機板\<select\>與電腦版\<input type="radio"\>的共用name值之value值
 * @param {string} name \<input\>與\<select\>的name值
 * @param {(name:string, value:string)} callBack name / value
 */
function Sync_radio_and_select( name, callBack ){
    $(`[name=${name}]`).on('change', function(){
        let value = $(this).val()
        $(`[type=radio][name=${name}][value=${value}]`).prop("checked", true)
        $(`select[name=${name}]`).val( value )
        callBack( name, value )
    })
}


/**
 * 該目標底下的 img/video/iframe 寬全滿，並設定該屬性 width 改成 max-width
 * @param {string} target 目標editor
 */
function editor_autoResize_media( target ){
    let imgs = $(target).find('img')
    $.each( imgs, function( idx, ele){
        $(ele).on('load',function(){
            $(ele).css('max-width', $(ele).attr('width')+'px').addClass('w-100 h-auto')
        })
    })

    let video = $(target).find('video')
    $.each( video, function( idx, ele){
        $(ele).on('load',function(){
            $(ele).css('max-width', $(ele).attr('width')+'px').addClass('w-100 h-auto')
        })
    })

    let iframe = $(target).find('iframe')
    $.each( iframe, function( idx, ele){
        $(ele).css('max-width', $(ele).attr('width')+'px').addClass('w-100 ar_16/10')
    })
}
