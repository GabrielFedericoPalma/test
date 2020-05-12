//ANIMACION DE LOS POPUPS
$('#about_us .touchslider-item a').on('click', function (e){
    e.preventDefault();
    
    var id = $(this).attr('id'),
    $width = (id == 'our_team') ? 800 : 500,
    $height = (id == 'our_team') ? 563 : 492;
    
    Shadowbox.open({
        content: "",
        player: "html",
        handleOversize: "resize",
        width: $width,
        height: $height,
        options: {
            onFinish: function(){
                loadCase(id);
            }
        }
    });
});