$(document).ready(function () {

/*     var email_reg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var address_reg = /^[a-z0-9- -.]+$/i;
    var pass_reg = /^[0-9a-zA-Z]{6,32}$/;
    var string_reg = /^[A-Za-z]{2,30}$/;
    var usr_reg = /^[0-9a-zA-Z]{2,20}$/; */


    var name_reg = /^[0-9a-zA-Z]{2,30}\s*$/; 
    var price_reg =/^([0-9]*[.])[0-9]+/;
    var cod_prod_reg = /^([0-9]{8})*$/;
    var cant_prod_reg = /^[0-9]{1,6}\s*$/;
    var action_reg = /((\bbuy\b)|(\bsell\b))/;
    var estado_reg = /((\bnew\b)|(\bused_good\b)|(\bused_bad\b)|(\bbroken\b))/;

    $("#SubmitProductos").click(function () {
        $(".error").remove();
         if ($("#name").val() == "") {
            $("#name").focus().after("<span class='error'>Introduce name</span>");
            return false;
        } else if (!name_reg.test($("#name").val())) {
            $("#name").focus().after("<span class='error'>Error format name (example).</span>");
            return false;
        } 

        if ($("#price").val() == "") {
            $("#price").focus().after("<span class='error'>Introduce precio</span>");
            return false;
        } else if (!price_reg.test($("#price").val())) {
            $("#price").focus().after("<span class='error'>Precio debe ser Float (5.99)</span>");
            return false;
        }

        if ($("#estado").val() == "") {
            $("#estado").focus().after("<span class='error'>Selecciona una opcion</span>");
            return false;
        } else if (!estado_reg.test($("#estado").val())) {
            $("#estado").focus().after("<span class='error'>Selecciona una opcion valida</span>");
            return false;
        }

        if ($("#cod_prod").val() == "") {
            $("#cod_prod").focus().after("<span class='error'>Introduce el codigo del producto</span>");
            return false;
        } else if (!cod_prod_reg.test($("#cod_prod").val())) {
            $("#cod_prod").focus().after("<span class='error'>Debe tener 8 numeros enteros </span>");
            return false;
        }

        if ($("#cant_prod").val() == "") {
            $("#cant_prod").focus().after("<span class='error'>Introduce precio</span>");
            return false;
        } else if (!cant_prod_reg.test($("#cant_prod").val())) {
            $("#cant_prod").focus().after("<span class='error'>Cantidad numeros enteros positivos y inferior a 1.000.000</span>");
            return false;
        }
        
        if ($("input:radio[name=action]:checked").val() === null) {
            $("#action2").focus().after("<span class='error'>Selecciona una opcion</span>");
            return false;
        } else if (!action_reg.test($("input:radio[name=action]:checked").val())) {
            $("#action2").focus().after("<span class='error'>Selecciona una opcion valida</span>");
            return false;
        }

        if ($("input:checkbox:checked").length === 0) {
            $("#pago-error").focus().after("<span class='error'>Selecciona una opcion</span>");
            return false;
        }


        $("#form_user").submit();
        $("#form_user").attr("action", "index.php?module=products");

    });

    //realizamos funciones para que sea más práctico nuestro formulario
    $("#name").keyup(function () {
        $(".error").remove();
        if (name_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }else{
            if ($("#name").val() == "") {
                $("#name").focus().after("<span class='error'>Introduce name</span>");
                return false;
            } else if (!name_reg.test($("#name").val())) {
                $("#name").focus().after("<span class='error'>Error format name (example).</span>");
                return false;
            }
    
        }
    });

     $("#price").keyup(function () {
        if (price_reg.test($(this).val()) ) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#estado").on('change',function () {
        if (estado_reg.test($(this).val()) ) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#cod_prod").keyup(function () {
        if ($(this).val() != "" && cod_prod_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#cant_prod").keyup(function () {
        if (cant_prod_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("input:radio[name=action]").change(function () {
        if ($("input:radio[name=action]:checked").val() != "" &&action_reg.test($("input:radio[name=action]:checked").val())) {
            console.log("fuckthis");
            $(".error").fadeOut();
            return false;
        }
    });

    $("input:checkbox").change(function () {
        if ($("input:checkbox:checked").length > 0){
            $(".error").fadeOut();
            return false;
        }
    });
    
}); 
