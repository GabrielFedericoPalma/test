$.extend( $.validator.messages,mensajes[langSelected] );
var fromulario =  $("#formContatct").validate({
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
        txtComments2: {
            maxlength: 300
        },
        txtSubject:"required"
    },
});

msgCh={
    "":'Available characters.',
    "-esp":'Caracteres disponibles.',
    "-por":'Caracteres disponíveis.'
}
$('textarea[name="txtComments2"]').on('keyup',function () {
    var max = 300;
    var len = $(this).val().length;
    var chars = max - len;
    $('#countChars').text(chars+' '+msgCh[langSelected]);
});

function uploadAjaxContact(){
    if(fromulario.valid()){
        var data = new FormData();
        data.append('txtName',$('#formContatct input[name=txtName]').val());
        data.append('txtEmail',$('#formContatct input[name=txtEmail]').val());
        data.append('txtPhone',$('#formContatct input[name=txtPhone]').val());
        data.append('txtBusinessInfo',$('#formContatct input[name=txtBusinessInfo]').val());
        data.append('txtCompany',$('#formContatct input[name=txtCompany]').val());
        data.append('txtTitle',$('#formContatct input[name=txtTitle]').val());
        data.append('txtSubject',$('#formContatct input[name=txtSubject]').val());
        data.append('txtComments',$('#formContatct textarea[name=txtComments2]').val());
        data.append('form', $('#formContatct input[name=formcontact]').val());


        var url = $("#formContatct").attr("action");

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
                    $('#formContatct input[name=txtName]').val('');
			        $('#formContatct input[name=txtEmail]').val('');
			        $('#formContatct input[name=txtPhone]').val('');
			        $('#formContatct input[name=txtBusinessInfo]').val('');
			        $('#formContatct input[name=txtCompany]').val('');
			        $('#formContatct input[name=txtTitle]').val('');
			        $('#formContatct input[name=txtSubject]').val('');
			        $('#formContatct textarea[name=txtComments2]').val('');
					ga('send', 'event', 'W3 Americas', 'Home','Contact Us - Send');
                    alert("Enviado correctamente");                   
                }else{
                    alert("Error al enviar");                  
                }
            }
        });
    }
}

$('#formContatct').on('submit',function(e){
    e.preventDefault();
    uploadAjaxContact();
});