//INCLUDES
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if(!getParameterByName('lang')){
    var langSelected = "";
}else{
    var langSelected = '-' + getParameterByName('lang'); // "lenguaje"
}

//Si existe una sección declarada por querystring
if(getParameterByName('section')){
    var section = getParameterByName('section');
}else{
    var section = 'home';
}

var menu={
        activeSection:section,
        setHomeActive:function(){
            //Si existe una sección declarada por querystring, hacemos scroll hasta ella.
            if(section != 'home'){
                menu.scrollMove($('#'+section).offset().top,section);
                menu.setActiveSection(section);
            }else{
                menu.scrollMove(0,menu.activeSection);
                menu.setActiveSection('home');
            }
            menu.setScrollersHandler();
            menu.setScrollersMenuHandler();
            menu.getLogoMove();
        },
        setActiveSection:function(classElement){
            $('.btns-txts li a').filter('.'+menu.activeSection).removeClass('select');
            $('#nav_menu ul li a.'+classElement+', #box-nav ul li a.'+classElement).addClass("select");
            menu.activeSection=classElement.split(' ')[0];
        },
        getElementOffset:function (el){
            var element = el.split(" ");
            return Math.floor($('#'+element[0]).offset().top);
        },
        getActiveSection:function(){
            return menu.activeSection;
        },
        getPrevSection: function(active){
            var sections=$('#nav_menu ul.btns-txts li a'),
                activeSection=sections.filter('.'+active),
                actualIndex=sections.index(activeSection);
            if(actualIndex==0) return sections.eq(0).attr('class').split(' ')[0];;
            return sections.eq(actualIndex-1).attr('class');
        },
        getNextSection: function(active){
            var sections=$('#nav_menu ul.btns-txts li a'),
                activeSection=sections.filter('.'+active),
                actualIndex=sections.index(activeSection);
            if(actualIndex==6) return sections.eq(actualIndex).attr('class').split(' ')[0];;
            return sections.eq(actualIndex+1).attr('class');
        },
        scrollMove: function(sectionMove,section){
            jQuery('html, body').animate({scrollTop:sectionMove}, 'slow',function(){
            });
        },
        setScrollersHandler:function(){
            $('.scrollers a').on('click', function(){
                var $this=$(this),
                    nextSection;

                if($this.hasClass('arriba')){
                    nextSection=menu.getPrevSection(menu.activeSection);
                }else if($this.hasClass('abajo')){
                    nextSection=menu.getNextSection(menu.activeSection);
                }
                menu.scrollMove(menu.getElementOffset(nextSection),nextSection);
            });
        },
        setScrollersMenuHandler:function(){
            $('#nav_menu ul.btns-txts li a').on('click', function(){
                var $this=$(this),
                section = $this.attr('class').split(' ')[0];
				ga('send', 'event', 'W3 Americas', 'Home',section); //Metrica
                menu.scrollMove(menu.getElementOffset(section),section);
            });
        },
        setScrollersMenuMobileHandler:function(){
            $('#box-nav ul.btns-txts li a').on('click', function(){
                var $this=$(this),
                    section = $this.attr('class').split(' ')[0];
					ga('send', 'event', 'W3 Americas - Mobile', 'Home - Mobile',section); //Metrica Movile
                menu.scrollMove(menu.getElementOffset(section),section);
            });
        },
        getActiveSectionByScroll:function(){
            var activeOffset=menu.getElementOffset(menu.activeSection),
                nextEl=menu.getNextSection(menu.activeSection),
                prevEl=menu.getPrevSection(menu.activeSection),
                nextOffset=menu.getElementOffset(nextEl),
                prevOffset=menu.getElementOffset(prevEl),
                currentOffset = Math.floor($(window).scrollTop()) + 1,
                targetSection=menu.activeSection,
                scrollBottom=$(document).height() - $(window).height() - $(window).scrollTop();
            if(currentOffset >= nextOffset || scrollBottom==0){
                targetSection=nextEl;
            }else 
            if(currentOffset < activeOffset){
                targetSection=prevEl;
            }

            if(targetSection != menu.activeSection)
                menu.setActiveSection(targetSection);
                
            
        },
        getLogoMove:function(){
            $('.w3-logo').on('click', function(){
                menu.scrollMove(0,0);
				ga('send', 'event', 'W3 Americas', 'Home','w3 logo'); //Metrica
            });
        }
    };

function resizeHandler(){
    $('.touchslider-viewport>div,.touchslider-viewport').each(function(){
        $(this).height($(this).innerHeight);
    });
}

$(window).scroll(menu.getActiveSectionByScroll);
$(window).resize(resizeHandler);

//Cambia la url actual para poder compartir la sección de rh directamente
function change_url_hr(){
    var getUrl = window.location;
    var url = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    if(langSelected){
        var newUrl = url+'?lang='+langSelected.substr(1,4)+'&section=hr';
    }else{
        var newUrl = url+'?section=hr';
    }
    history.pushState({}, null, newUrl);
}


$('header nav#nav_menu-mobile').load('includes'+langSelected+'/nav_menu-mobile.html',menu.setScrollersMenuMobileHandler);
$('header nav#nav_menu').load('includes'+langSelected+'/nav_menu.html',menu.setHomeActive);


function reloadMenu(idioma){
    $('header nav#nav_menu-mobile').load('includes'+langSelected+'/nav_menu-mobile.html',menu.setScrollersMenuMobileHandler);
    $('header nav#nav_menu').load('includes'+langSelected+'/nav_menu.html',menu.setHomeActive);
}

function loadCase(id){
    $.ajax(
    {
        url:"includes"+ langSelected +"/inter-popup/" + id + ".html",
        success : function(responseText)
        {
            $('#sb-player').html(responseText);
            $('div[data-selctor="' + id + '"] .touchslider-cassespop').touchSlider({
                autoplay: true,
                currentClass: "touchslider-nav-item-current"
            });
            $('.closepopup').on('click',function(){
                Shadowbox.close();
            });
        }
    })
}
function loadShadowBox(id){
    $.ajax(
    {
        url:"includes"+langSelected+"/inter-popup/" + id + ".html",
        success : function(responseText)
        {
            $('#sb-player').html(responseText);
            $('.closepopup').on('click',function(){
                Shadowbox.close();
            });
        }
    })
}

//Función para obtener parámetros por querystring
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

switch(langSelected) {
    case '':
        $("#mensaje").removeClass('msj-por');
        $("#mensaje").removeClass('msj-esp');   
        $('#mensaje').html('Chat with Alex and ask him about W3.'); // NUEVO
        break;
    case '-por':
        $("#mensaje").addClass('msj-por');
        $('#mensaje').html('Alex está disponível para responder sobre W3 mas por enquanto só em inglês!'); // NUEVO
        break;
    case '-esp':
        $("#mensaje").removeClass('msj-por');
        $("#mensaje").addClass('msj-esp');
        $('#mensaje').html('Chatea con Alex y pregúntale sobre W3. Por ahora en inglés.'); // NUEVO
    break;
    default:
    break;
}
/*

$("#eng a").click(function() {
    $(".leng a").removeClass('select');
    $(this).addClass('select');
    langSelected = "";
    reloadMenu(langSelected);
    set_html_lang_class();
	$("#mensaje").removeClass('msj-por');
	$("#mensaje").removeClass('msj-esp');	
	$('#mensaje').html('Chat with Alex and ask him about W3.'); // NUEVO
});
$("#por a").click(function() {
    $(".leng a").removeClass('select');
    $(this).addClass('select');
    langSelected = "-por";
    reloadMenu(langSelected);
    set_html_lang_class();
	$("#mensaje").addClass('msj-por');
	$('#mensaje').html('Alex está disponível para responder sobre W3 mas por enquanto só em inglês!'); // NUEVO
});
$("#esp a").click(function() {
    $(".leng a").removeClass('select');
    $(this).addClass('select');
    langSelected = "-esp";
    reloadMenu(langSelected);
    set_html_lang_class();	
	$("#mensaje").removeClass('msj-por');
	$("#mensaje").addClass('msj-esp');
	$('#mensaje').html('Chatea con Alex y pregúntale sobre W3. Por ahora en inglés.'); // NUEVO
});

*/