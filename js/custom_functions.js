$(document).ready(function(){

    //FIX IE
    function isIE() {
        ua = navigator.userAgent;
        /* MSIE used to detect old browsers and Trident used to newer ones*/
        var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
        return is_ie; 
    }

    //Navegador Firefox
    var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (isIE()||es_firefox){
        $('#certificados').css('width','230px');
    }
    //END FIX IE

    //FORM FUNCTIONS
    var validForm = false;
    var $name = $('#name');
    var $mail = $('#email');
    var $msj_required_name = $('span.name.required');
    var $msj_required_mail = $('span.mail.required');
    var $msj_regular_mail = $('span.mail.regular');

    //Form On Change Functions
    $($name).change(function(){
        required();
    });

    $($mail).change(function(){
        required();
        
        var reg_email = validateEmail($mail.val());

        if(!reg_email&&$mail.val().length>0){
            $($msj_required_mail).fadeOut(function(){
                $msj_regular_mail.fadeIn();
            });
        }else{
            $msj_regular_mail.fadeOut();
        }

    })
    //Form On Change Functions

    //Form Submit function
    $('#submit').click(function(e){

        required();

        var $mail_regular_is_visible = $($msj_regular_mail).is(':visible');

        if($name.val().length!==0&&$mail.val().length!==0&&!$mail_regular_is_visible){
            validForm = true;
        }else{
            validForm = false;
        }

        if(!validForm){
            e.preventDefault();
        }else{
            //alert('Your message has been sent, thank you.');
            $('#submit').fadeOut(function(){
                $('#submit_msj').fadeIn();
            });
        }
       
    });
    //End Form Submit function

    function required(){
        if($name.val().length==0){
            $($msj_required_name).fadeIn();
        }else{
            $($msj_required_name).fadeOut();
        }

        if($mail.val().length==0){
            $($msj_required_mail).fadeIn();
        }else{
            $($msj_required_mail).fadeOut();
        }
    };

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
        };

    //END FORM FUNCTIONS

});