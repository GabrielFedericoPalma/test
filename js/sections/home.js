$(".touchslider-home").touchSlider({
    mouseTouch: true,
    pagination: ".touchslider-nav-item"
});

$('.touchslider-item hgroup a[id]').on('click',function(){
    var id=$(this).attr('id');
    Shadowbox.open({
        content: "",
        player: "html",
        width: window.innerWidth,
        height: window.innerHeight,
        mouseTouch: true,
        options:{
            onFinish: function(){
                loadCase(id);
            }
        }
    });
});