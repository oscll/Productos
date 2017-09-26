Dropzone.autoDiscover = false;
$(document).ready(function () {
    $('#SubmitProductos').click(function () {
        validate_product();
    });

     $.get("modules/products/controller/controller_products.class.php?load_data=true",
            function (response) {
                //alert(response.product);
                if (response.product === "") {
                    $("#name").val("");
                    $("#text_prod").val("");
                    $("#price").val("");
                    $("#cod_prod").val("");
                    $("#cant_prod").val("");
                    var inputButton = document.getElementsByClassName('actionButton');
                    for (var i = 0; i < inputButton.length; i++) {
                        if (inputButton[i].checked) {
                            inputButton[i].checked = false;
                        }
                    }
                    var inputElements = document.getElementsByClassName('pagoCheckbox');
                    for (var i = 0; i < inputElements.length; i++) {
                        if (inputElements[i].checked) {
                            inputElements[i].checked = false;
                        }
                    }
                } else {
                    $("#name").val( response.product.name);
                    $("#text_prod").val( response.product.text_prod);
                    $("#price").val( response.product.price);
                    $("#estado").val( response.product.estado);
                    $("#cod_prod").val( response.product.cod_prod);
                    $("#cant_prod").val( response.product.cant_prod);
                    var action = response.product.action
                    var inputButton = document.getElementsByClassName('actionButton');
                    for (var i = 0; i < inputButton.length; i++) {
                        if (action === inputButton) {
                            inputButton[i].checked = true;
                        }
                    }
                    var pago = response.product.pago;
                    var inputElements = document.getElementsByClassName('pagoCheckbox');
                    for (var i = 0; i < pago.length; i++) {
                        for (var j = 0; j < inputElements.length; j++) {
                            if(pago[i] ===inputElements[j] )
                                inputElements[j].checked = true;
                        }
                    }
                }
            }, "json");

    //Dropzone function //////////////////////////////////
    $("#dropzone").dropzone({
        url: "modules/products/controller/controller_products.class.php?upload=true",
        addRemoveLinks: true,
        maxFileSize: 1000,
        dictResponseError: "Ha ocurrido un error en el server",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
        init: function () {
            this.on("success", function (file, response) {
                //alert(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'right': '300px'}, 300);
            });
        },
        complete: function (file) {
            /* if(file.status == "success"){
            alert("El archivo se ha subido correctamente: " + file.name);
            }  */
        },
        error: function (file) {
/*             alert("Error subiendo el archivo " + file.name); */        
        },
        removedfile: function (file, serverFileName) {
            var name = file.name;
            $.ajax({
                type: "POST",
                url: "modules/products/controller/controller_products.class.php?delete=true",
                data: "filename=" + name,
                success: function (data) {
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    if (json.res === true) {
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                            //alert("Imagen eliminada: " + name);
                        } else {
                            false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                        } else {
                            false;
                        }
                    }
                }
            });
        }
    });

    var v_text_prod =document.getElementById('text_prod').value.trim().length;
    var name_reg = /^[0-9a-zA-Z]{2,30}\s*$/; 
    var price_reg =/^([0-9]*[.])[0-9]+/;
    var cod_prod_reg = /^([0-9]{8})*$/;
    var cant_prod_reg = /^[0-9]{1,6}\s*$/;
    var action_reg = /((\bbuy\b)|(\bsell\b))/;
    var estado_reg = /((\bnew\b)|(\bused_good\b)|(\bused_bad\b)|(\bbroken\b))/;

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

    $("#text_prod").keyup(function () {
        if (v_text_prod) {
            $(".error").fadeOut();
            return false;
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

function validate_product(){
    var result = true;

    var name = document.getElementById('name').value;
    var text_prod = document.getElementById('text_prod').value;
    var price = document.getElementById('price').value;
    var estado = document.getElementById('estado').value;
    var cod_prod = document.getElementById('cod_prod').value;
    var cant_prod = document.getElementById('cant_prod').value;
    var action;
    var inputButton = document.getElementsByClassName('actionButton');
    for (var i = 0; i < inputButton.length; i++) {
        if (inputButton[i].checked) {
            action = inputButton[i].value;
        }
    }

    var pago = [];
    var inputElements = document.getElementsByClassName('pagoCheckbox');
    var j = 0;
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            pago[j] = inputElements[i].value;
            j++;
        }
    }

    var v_text_prod =document.getElementById('text_prod').value.trim().length;
    var name_reg = /^[0-9a-zA-Z]{2,30}\s*$/; 
    var price_reg =/^([0-9]*[.])[0-9]+/;
    var cod_prod_reg = /^([0-9]{8})*$/;
    var cant_prod_reg = /^[0-9]{1,6}\s*$/;
    var action_reg = /((\bbuy\b)|(\bsell\b))/;
    var estado_reg = /((\bnew\b)|(\bused_good\b)|(\bused_bad\b)|(\bbroken\b))/;

    $(".error").remove();
    if ($("#name").val() == "") {
       $("#name").focus().after("<span class='error'>Introduce name</span>");
       result = false;
       return false;
    } else if (!name_reg.test($("#name").val())) {
       $("#name").focus().after("<span class='error'>Error format name (example).</span>");
       result = false;
       return false;
    }

    if ($("#text_prod").val() == "") {
       $("#text_prod").focus().after("<span class='error'>Introduce una descripcion</span>");
       result = false;
       return false;
    } else if (!v_text_prod) {
       $("#text_prod").focus().after("<span class='error'>Error format description.</span>");
       result = false;
       return false;
    } 

    if ($("#price").val() == "") {
        $("#price").focus().after("<span class='error'>Introduce precio</span>");
        result = false;
        return false;
    } else if (!price_reg.test($("#price").val())) {
       $("#price").focus().after("<span class='error'>Precio debe ser Float (5.99)</span>");
       result = false;
       return false;
    }

    if ($("#estado").val() == "") {
       $("#estado").focus().after("<span class='error'>Selecciona una opcion</span>");
       result = false; 
       return false;
    } else if (!estado_reg.test($("#estado").val())) {
        $("#estado").focus().after("<span class='error'>Selecciona una opcion valida</span>");
        result = false;
        return false;
    }
 
    if ($("#cod_prod").val() == "") {
        $("#cod_prod").focus().after("<span class='error'>Introduce el codigo del producto</span>");
        result = false;
        return false;
    } else if (!cod_prod_reg.test($("#cod_prod").val())) {
        $("#cod_prod").focus().after("<span class='error'>Debe tener 8 numeros enteros </span>");
        result = false;
        return false;
    }
 
    if ($("#cant_prod").val() == "") {
        $("#cant_prod").focus().after("<span class='error'>Introduce precio</span>");
        result = false;
        return false;
    } else if (!cant_prod_reg.test($("#cant_prod").val())) {
        $("#cant_prod").focus().after("<span class='error'>Cantidad numeros enteros positivos y inferior a 1.000.000</span>");
        result = false;
        return false;
    }
    
    if ($("input:radio[name=action]:checked").val() === null) {
       $("#action2").focus().after("<span class='error'>Selecciona una opcion</span>");
       result = false;
       return false;
    } else if (!action_reg.test($("input:radio[name=action]:checked").val())) {
        $("#action2").focus().after("<span class='error'>Selecciona una opcion valida</span>");
        result = false;
        return false;
    }
 
    if ($("input:checkbox:checked").length === 0) {
        $("#pago-error").focus().after("<span class='error'>Selecciona una opcion</span>");
        result = false;
        return false;
    }
    console.log("log = "+result);
    if(result){
        var data = {
            "name":name, "text_prod":text_prod, "price":price, "estado":estado, "cod_prod":cod_prod, "cant_prod":cant_prod, "action":action, "pago":pago
        };
        console.log(data);
        var data_products_JSON = JSON.stringify(data);
        $.post('modules/products/controller/controller_products.class.php',
                {alta_products_json: data_products_JSON},
        function (response) {

            console.log("1 "+response);

            if (response.success) {
                window.location.href = response.redirect;
            } 
            //alert(response);  //para debuguear
            //}); //para debuguear
        //}, "json").fail(function (xhr) {
        
        }, "json").fail(function(xhr, status, error) {
       
            console.log("2 "+xhr.responseText);
            console.log("3 "+xhr.responseJSON);


            $(".styerror").remove();
            if(xhr.responseJSON.error != null){
                if (xhr.responseJSON.error.name)
                    $("#name").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.name + "</span>");
                if (xhr.responseJSON.error.text_prod)
                    $("#text_prod").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.text_prod + "</span>");
                if (xhr.responseJSON.error.price)
                    $("#price").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.price + "</span>");
                if (xhr.responseJSON.error.estado)
                    $("#estado").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.estado + "</span>");
                if (xhr.responseJSON.error.cod_prod)
                    $("#cod_prod").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.cod_prod + "</span>");
                if (xhr.responseJSON.error.cant_prod)
                    $("#cant_prod").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.cant_prod + "</span>");
                if (xhr.responseJSON.error.action)
                    $("#action2").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.action + "</span>");
                if (xhr.responseJSON.error.pago)
                    $("#pago-error").focus().after("<span  class='styerror'>" + xhr.responseJSON.error.pago + "</span>");
            }
            if (xhr.responseJSON.error_avatar)
                $("#dropzone").focus().after("<span  class='styerror'>" + xhr.responseJSON.error_avatar + "</span>");
            if (xhr.responseJSON.success1) {
                if (xhr.responseJSON.img_avatar !== "Productos/media/default-avatar.png") {
                    //$("#progress").show();
                    //$("#bar").width('100%');
                    //$("#percent").html('100%');
                    //$('.msg').text('').removeClass('msg_error');
                    //$('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right' : '300px' }, 300);
                }
            } else {
                $("#progress").hide();
                $('.msg').text('').removeClass('msg_ok');
                $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
            }
        });
    }
}