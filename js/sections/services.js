$('#services-box-3btns-btninf').click(function(){
    Shadowbox.open({
        content:    '<div class="services-box-transparent-map imageBig"><a href="#"></a></div>',
        player:     "html",
        height:     314,
        width:      865
    });
});

$('.second, .third').css('display', 'none');

$("#services-box-3col-linksfooter-btn1, #services-box-transparent-btnclose").click(function(){
    reoloadHr();
});
$(".starImage").click(function(){
    $(".imageBig").css('rel', 'lightbox');
});
$(".consulting").click(function(){
    orange1();
});

$(".development").click(function(){
    orange2();
});

$(".management").click(function(){
    orange3();
});
$("#back").click(function(e){
    backbox();
    e.preventDefault();
});

$("#services-box-transparent-btnside-left").click(function(){
    var orange1V = $('#orange1').css("display");
    var orange2V = $('#orange2').css("display");
    var orange3V = $('#orange3').css("display");
    if(orange1V == "block"){
        reoloadHr();
    }
    if(orange2V == "block"){
        orange1();
    }
    if(orange3V == "block"){
        orange2();
    }
});

$("#services-box-transparent-btnside-right").click(function(){
    var orange1V = $('#orange1').css("display");
    var orange2V = $('#orange2').css("display");
    var orange3V = $('#orange3').css("display");
    if(orange1V == "block"){
        orange2();
    }
    if(orange2V == "block"){
        orange3();
    }
    if(orange3V == "block"){
        reoloadHr();
    }
});

function orange1(){
    $('.all, #orange2, #orange3').hide();
    $('.third, #orange1').fadeIn();
}
function orange2(){
    $(".all, #orange1, #orange3").hide();
    $('.third, #orange2').fadeIn();
}
function orange3(){
    $(".all, #orange1, #orange2").hide();
    $('.third, #orange3').fadeIn();
}
function reoloadHr(){
    $(".all").hide();
    $('.second').fadeIn();
    $('.tits-txt').text('How we do it');
}
function backbox(){
    $(".all").hide();
    $('.services-box.first').fadeIn();
    $('.tits-txt').text('What we do');
}