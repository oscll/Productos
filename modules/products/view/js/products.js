Dropzone.autoDiscover = false;
$(document).ready(function () {
    $('#SubmitProductos').click(function () {
        validate_product();
    });
    $.get("../load_data_product/",
            function (response) {
                //alert(response.product);
                if (response.product == "") {
                    $("#name").val("");
                    $("#text_prod").val("");
                    $("#price").val("");
                    $("#cod_prod").val("");
                    $("#cant_prod").val("");
                    $('#country').val('Select country');
                    $('#province').val('Select province');
                    $('#city').val('Select city');
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
                    $('#province').val(response.product.province);
                    $('#city').val(response.product.city);
                    $("#proddesc").val(response.product.proddesc);
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
        url: "../upload/",
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
                url: "../delete_product/",
                data: {"filename":name},
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
                            alert("Imagen eliminada: " + name);
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
    //Dependent combos //////////////////////////////////
    load_countries_v1();
    $("#province").empty();
    $("#province").append('<option value="" selected="selected">Select province</option>');
    $("#province").prop('disabled', true);
    $("#city").empty();
    $("#city").append('<option value="" selected="selected">Select city</option>');
    $("#city").prop('disabled', true);

    $("#country").change(function() {
		var country = $(this).val();
		var province = $("#province");
		var city = $("#city");
		if(country !== 'ES'){
	        province.prop('disabled', true);
	        city.prop('disabled', true);
	        $("#province").empty();
		    $("#city").empty();
		}else{
	        province.prop('disabled', false);
	        city.prop('disabled', false);
	        load_provinces_v1();
		}//fi else
	});

	$("#province").change(function() {
        var prov = $(this).val();
		if(prov > 0){
			load_cities_v1(prov);
		}else{
			$("#city").prop('disabled', false);
		}
	});
});//End document ready

function validate_product(){
    var result = true;

    var name = document.getElementById('name').value;
    var text_prod = document.getElementById('text_prod').value;
    var price = document.getElementById('price').value;
    var estado = document.getElementById('estado').value;
    var cod_prod = document.getElementById('cod_prod').value;
    var cant_prod = document.getElementById('cant_prod').value;
    var country = document.getElementById('country').value;
    var province = document.getElementById('province').value;
    var city = document.getElementById('city').value;
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
    if ($("#country").val() === "" || $("#country").val() === "Select country" || $("#country").val() === null) {
        $("#country").focus().after("<span class='error'>Select one country</span>");
        return false;
    }
    if ($("#province").val() === "" || $("#province").val() === "Select province") {
        $("#province").focus().after("<span class='error'>Select one province</span>");
        return false;
    }
    if ($("#city").val() === "" || $("#city").val() === "Select city") {
        $("#city").focus().after("<span class='error'>Select one city</span>");
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
        if (province === null) {
            province = 'default_province';
        }else if (province.length === 0) {
            province = 'default_province';
        }else if (province === 'Select province') {
            return 'default_province';
        }
        if (city === null) {
            city = 'default_city';
        }else if (city.length === 0) {
            city = 'default_city';
        }else if (city === 'Select city') {
            return 'default_city';
        }
        var data = {
            "name":name, "text_prod":text_prod, "price":price, "estado":estado, "cod_prod":cod_prod, "cant_prod":cant_prod, "action":action, "pago":pago ,"country": country, "province": province, "city": city
        };
        console.log(data);
        var data_products_JSON = JSON.stringify(data);
        $.post('../alta_products/',
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
                if(xhr.responseJSON.error.country)
                    $("#error_country").focus().after("<span  class='error1'>" + xhr.responseJSON.error.country + "</span>");
                if(xhr.responseJSON.error.province)
                    $("#error_province").focus().after("<span  class='error1'>" + xhr.responseJSON.error.province + "</span>");       
                if(xhr.responseJSON.error.city)
                    $("#error_city").focus().after("<span  class='error1'>" + xhr.responseJSON.error.city + "</span>");       
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
function load_countries_v2(cad) {
    $.getJSON( cad, function(data) {
        $("#country").empty();
        $("#country").append('<option value="" selected="selected">Select country</option>');
        $.each(data, function (i, valor) {
            $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
        });
    })
    .fail(function(data) {
        alert( "error load_countries" );
    });
}
function load_countries_v1() {
    $.get( "../load_country/",
        function( response ) {
            //console.log(response);
            if(response === 'error'){
                load_countries_v2("../../resources/ListOfCountryNamesByName.json");
            }else{
                load_countries_v2("../load_country/"); //oorsprong.org
            }
    })
    .fail(function(response) {
        load_countries_v2("../../resources/ListOfCountryNamesByName.json");
    });
}

function load_provinces_v2() {
    $.get("../../resources/provinciasypoblaciones.xml", function (xml) {
	    $("#province").empty();
	    $("#province").append('<option value="" selected="selected">Select province</option>');
        $(xml).find("provincia").each(function () {
            console.log(this);
            var id = $(this).attr('id');
            var name = $(this).find('nombre').text();
            $("#province").append("<option value='" + id + "'>" + name + "</option>");
        });
    })
    .fail(function() {
        alert( "error load_provinces" );
    });
}

function load_provinces_v1() { //provinciasypoblaciones.xml - xpath
    $.get( "../load_provinces/",
        function( response ) {
            $("#province").empty();
	        $("#province").append('<option value="" selected="selected">Select province</option>');
            var json = JSON.parse(response);
		    var provinces=json.provinces;
		    //alert(provinces);
		    //console.log(provinces);
		    //alert(provinces[0].id);
		    //alert(provinces[0].nombre);
            if(provinces === 'error'){
                load_provinces_v2();
            }else{
                for (var i = 0; i < provinces.length; i++) {
                    console.log(provinces[i]);
        		    $("#province").append("<option value='" + provinces[i].id + "'>" + provinces[i].nombre + "</option>");
    		    }
            }
    })
    .fail(function(response) {
        load_provinces_v2();
    });
}

function load_cities_v2(prov) {
    $.get("../../resources/provinciasypoblaciones.xml", function (xml) {
		$("#city").empty();
	    $("#city").append('<option value="" selected="selected">Select city</option>');
		$(xml).find('provincia[id=' + prov + ']').each(function(){
    		$(this).find('localidad').each(function(){
    			$("#city").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
    		});
        });
	})
	.fail(function() {
        alert( "error load_cities" );
    });
}

function load_cities_v1(prov) { //provinciasypoblaciones.xml - xpath
    var datos = { idPoblac : prov  };
	$.post("../load_citys/", datos, function(response) {
        var json = JSON.parse(response);
		var cities=json.cities;
		//alert(poblaciones);
		//console.log(poblaciones);
		//alert(poblaciones[0].poblacion);
		$("#city").empty();
	    $("#city").append('<option value="" selected="selected">Select city</option>');
        if(cities === 'error'){
            load_cities_v2(prov);
        }else{
            for (var i = 0; i < cities.length; i++) {
        		$("#city").append("<option value='" + cities[i].poblacion + "'>" + cities[i].poblacion + "</option>");
    		}
        }
	})
	.fail(function() {
        load_cities_v2(prov);
    });
}