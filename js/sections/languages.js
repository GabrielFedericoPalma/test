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

if ($('#eng a').hasClass('select')) {
    reloadContent("");
} else if ($('#esp a').hasClass('select')) {
    reloadContent("-esp");
} else if ($('#por a').hasClass('select')) {
    reloadContent("-por");
}

function reloadContent(idioma){
    $('article section.home').load('includes'+idioma+'/home.html',intro.finish()),
    $('article section.cases').load('includes'+idioma+'/cases.html',intro.finish()),
    $('article section.clients').load('includes'+idioma+'/clients.html',intro.finish()),
    $('article section.about_us').load('includes'+idioma+'/about_us.html',intro.finish()),
    $('article section.what_we_do').load('includes'+idioma+'/what_we_do.html',intro.finish()),
    $('article section.hr').load('includes'+idioma+'/hr.html',intro.finish()),
    $('article section.contact_us').load('includes'+idioma+'/contact_us.html',intro.finish())
}

function set_html_lang_class(){
    
    var html = $('html');
    
    if(langSelected == ''){
        html.addClass('lang-eng');
    }else{
        html.addClass('lang'+langSelected);
    }
    
    switch(langSelected){
        case '-esp':
            html.removeClass('lang-eng lang-por');
			ga('send', 'event', 'W3 Americas', 'Home','Idioma Espanol');
            break;
        case '-por':
            html.removeClass('lang-esp lang-eng');
			ga('send', 'event', 'W3 Americas', 'Home','Idioma Portugues');
            break;
        default:
            html.removeClass('lang-esp lang-por');
			ga('send', 'event', 'W3 Americas', 'Home','Idioma Ingles');
            break;            
    }
}

