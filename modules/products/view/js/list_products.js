var contenido;
var limit_0 = true;

$(document).ready(function () {
    load_products_ajax();
    scroll();
});

function scroll(){
    $(window).scroll( function() {
        if(($(document).scrollTop() > (($(document).height()-$(window).height())-$("footer").height()))&&limit_0) {
            console.log("scroll");
            load_products_ajax();
        }
    });
}

function load_products_ajax() {
    $.ajax({
        type: 'GET',
        url: "modules/products/controller/controller_products.class.php?list_products=true",
        //dataType: 'json',
        async: false
    }).done(function (data) {
        var json = JSON.parse(data);
        contenido = document.getElementById("list_prod");
        if(json.length == 0){//si no hay mas items off scroll
            limit_0 = false;
            console.log("ksdkfjl");
            $.ajax({
                type: 'GET',
                url: "modules/products/controller/controller_products.class.php?clear_limit=true",
                async:false
            }).fail(function (xhr){
                alert(xhr.responseText);
            });
        }else{
            json.forEach(function(element) {
                create_html_product(element)
            }, this);
        }
    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}

function create_html_product(item){
    console.log(item);
    var aTag = document.createElement("a");
    aTag.addEventListener("click", function(){
        console.log(item.cod_prod);
        $.ajax({
            type: 'POST',
            url: "modules/products/controller/controller_products.class.php?details_redirect=true",
            data: "item_cod_prod="+item.cod_prod,
            //dataType: 'json',
            async: false
        }).done(function (data) {
            alert(data);
            window.location.href="index.php?module=products&view=details_product";    
        }).fail(function (xhr) {
            alert(xhr.responseText);
        });
    });
    /* aTag.setAttribute("href", "index.php?module=products&details_redirect="+item.cod_prod); */
    var imgTag = document.createElement("img");
    imgTag.setAttribute("class", "prodImg");
    imgTag.setAttribute("src", item.avatar);
    imgTag.setAttribute("width", "200px");
    imgTag.setAttribute("height", "200px");
    imgTag.setAttribute("alt", "Foto Producto");
    var pTag = document.createElement("p");
    pTag.innerHTML = item.name;
    var pTag2 = document.createElement("p");
    pTag2.innerHTML = item.price;
    aTag.appendChild(imgTag);
    aTag.appendChild(pTag);
    aTag.appendChild(pTag2);
    contenido.appendChild(aTag);
}