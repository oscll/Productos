var contenido;
var limit_0 = true;

$(document).ready(function () {
    clear_limit();//Por si antes existia $_SESSION['limit']
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
        url: "../list_products/",
        //dataType: 'json',
        async: false
    }).done(function (data) {
        var json = JSON.parse(data);
        contenido = document.getElementById("list_prod");
        if(json.length == 0){//si no hay mas items off scroll
            limit_0 = false;
            clear_limit();
        }else{
            json.forEach(function(element) {
                create_html_product(element)    
            }, this);
        }
    }).fail(function (xhr) {
        alert(xhr.responseText);
        window.location.href="index.php?module=404";
    });
}

function create_html_product(item){
    console.log(item);
    var aTag = document.createElement("a");
    aTag.addEventListener("click", function(){
        console.log(item.cod_prod);
        $.ajax({
            type: 'POST',
            url: "../details_redirect/",
            data: "item_cod_prod="+item.cod_prod,
            //dataType: 'json',
            async: false
        }).done(function (data) {
            window.location.href=data;    
        }).fail(function (xhr) {
            alert(xhr.responseText);
            window.location.href="index.php?module=404";
        });
    });
    /* aTag.setAttribute("href", "none"); */
    var imgTag = document.createElement("img");
    imgTag.setAttribute("class", "prodImg");
    imgTag.setAttribute("src", "../../"+item.avatar);
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
function clear_limit(){
    $.ajax({
        type: 'GET',
        url: "../clear_limit/",
        async:false
    }).fail(function (xhr){
        alert(xhr.responseText);
        window.location.href="index.php?module=404";
    });
}