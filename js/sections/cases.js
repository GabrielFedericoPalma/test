$("#cases .touchslider-casses, #cases .touchslider-viewport-mobile").touchSlider({
    mouseTouch: true,
    pagination: ".touchslider-nav-item"
});

$('#cases .cases-box').on('click',function(){
    var id=$(this).attr('id');
    
    Shadowbox.open({
        content: "", 
        player: "html",
        width: $(window).innerWidth(),
        height: $(window).innerHeight(),
        options: {
            onFinish: function(){
                loadCase(id);
            }
        }
    });
});

Shadowbox.init();

//if browser do not support css3 transitions
if($('html.csstransitions').length==0){
    $('#cases .cases-box-general').on('mouseover','.cases-box',function(){
        $(this).find('.view').fadeIn('fast');
    });

    $('#cases .cases-box-general').on('mouseout','.cases-box .view',function(){
        $('#cases .cases-box-general .view').fadeOut('fast');
    });
}