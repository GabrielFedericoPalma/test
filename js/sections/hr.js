$.extend( $.validator.messages,mensajes[langSelected] );
var formulariorh = $("#formhr").validate({
    ignore: "", //permite validar input hidden
    rules: {
        txtName: "required",
        txtPhone: {
            required: true,
            minlength: 8
        },
        txtEmail: {
            required: true,
            email: true
        },
        txtCV:"required",
        txtPosition: {
            required: true
        },
        txtComments: {
            maxlength: 300
        }
    }
});

$('.simulator-select').unbind("click").bind("click",function(e){

    e.stopPropagation();
    
    var $this = $(this),
    $list = $('.simulator-select-option');
    
    if($list.is(':visible')){
        $list.hide();
        $this.removeClass( "simulator-selecthover" );
        $('.simulator-select').css( 'background-position', 'right top' ); 
    }else{
        $list.show();
        $this.addClass( "simulator-selecthover" );
        $('.simulator-select').css( 'background-position', 'right bottom' ); 
    }
});

$('.simulator-select-option li').each(function(){
    $(this).on('click',function(){
        //$('.inputhiddenhr').val($(this).html());
        $('#txtPosition').val($(this).html());
        $('.simulator-select-option').hide();
        $('#spanSelect').html($(this).html());     
        $('.simulator-select').css( 'background-position', 'right top' );   

$("#formhr").valid();
    });
});

msgCh={
    "":'Available characters.',
    "-esp":'Caracteres disponibles.',
    "-por":'Caracteres disponíveis.'
}

$('textarea[name="txtComments"]').on('keyup',function () {
    var max = 300;
    var len = $(this).val().length;
    var chars = max - len;
    $('#charHr').text(chars+' '+msgCh[langSelected]);
});


function uploadAjax(){
    if(formulariorh.valid()){
        var inputFileImage = document.getElementById('txtCV'),
        file = inputFileImage.files[0];
        data = new FormData();
        data.append('txtCV',file);
        data.append('txtName',$('#formhr input[name=txtName]').val());
        data.append('txtEmail',$('#formhr input[name=txtEmail]').val());
        data.append('txtPhone',$('#formhr input[name=txtPhone]').val());
        data.append('txtPosition',$('#formhr #spanSelect').html());
        data.append('txtComments',$('#formhr textarea[name=txtComments]').val());
        data.append('form', $('#formhr input[name=form]').val());
        var url = $("#formhr").attr("action");
        $.ajax({
            url:url,
            type:'POST',
            contentType:false,
            data:data,
            processData:false,
            cache:false,
            success: function(data){
                var resp=$.parseJSON(data)
                if(resp.msg!='error'){
                    $('#formhr input[name=txtName]').val('');
			        $('#formhr input[name=txtEmail]').val('');
			        $('#formhr input[name=txtPhone]').val('');
			        $('#formhr textarea[name=txtComments]').val('');
					ga('send', 'event', 'W3 Americas', 'Home','Join our team - Send');
                    alert("Enviado correctamente");                    
                }else{
                    alert("Error al enviar");                   
                }
            }
        });
        
    }
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}
var browObj = jQuery.browser;

$('#formhr').on('submit',function(e){
    if(browObj.msie != true){
        if(browObj.version != "8.0" && browObj.version != "9.0"){
            e.preventDefault();
            uploadAjax(); 			
        };
    }
});
$('.simulator-select-option#selectoption').mouseover(function() {
    $('.simulator-select').css( 'background-position', 'right bottom' );
});

if(browObj.msie == true){
    if(browObj.version == "8.0" || browObj.version == "9.0"){
        var $_GET = getQueryParams(document.location.search);
        if($_GET['vg'] == 1){
            $('#formhr .btns').append( '<br/><p style="color: #EB4C26;font-size: 16px;">Mail send</p>' );
            var hrOf = menu.getElementOffset('hr');
            menu.scrollMove(hrOf,0);
            menu.setActiveSection('hr');
        }else if($_GET['vg'] == 2){
            $('#formhr .btns').append( '<br/><p style="color: #EB4C26;font-size: 16px;">Mail not send</p>' );
            var hrOf = menu.getElementOffset('hr');
            menu.scrollMove(hrOf,0);
            menu.setActiveSection('hr');
        }
    }
}