function load_product_ajax() {
    $.ajax({
        type: 'GET',
        url: "modules/products/controller/controller_products.class.php?load=true",
        //dataType: 'json',
        async: false
    }).done(function (data) {
        var json = JSON.parse(data);
        //alert(json.user.usuario);
        pintar_product(json);

    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}

$(document).ready(function () {
    load_product_ajax();
});

function pintar_product(data) {
    //alert(data.product.avatar);
    var content = document.getElementById("content");
    var div_product = document.createElement("div");
    var parrafo = document.createElement("p");

    var msje = document.createElement("div");
    msje.innerHTML = "msje = ";
    msje.innerHTML += data.msje;
    
    var name = document.createElement("div");
    name.innerHTML = "name = ";
    name.innerHTML += data.product.name;

    var text_prod = document.createElement("div");
    text_prod.innerHTML = "text_prod = ";
    text_prod.innerHTML += data.product.text_prod;

    var price = document.createElement("div");
    price.innerHTML = "price = ";
    price.innerHTML += data.product.price;
    
    var estado = document.createElement("div");
    estado.innerHTML = "estado = ";
    estado.innerHTML += data.product.estado;

    var cod_prod = document.createElement("div");
    cod_prod.innerHTML = "cod_prod = ";
    cod_prod.innerHTML += data.product.cod_prod;

    var cant_prod = document.createElement("div");
    cant_prod.innerHTML = "cant_prod = ";
    cant_prod.innerHTML += data.product.cant_prod;

    var action = document.createElement("div");
    action.innerHTML = "action = ";
    action.innerHTML += data.product.action;
    
    var pago = document.createElement("div");
    pago.innerHTML = "pago = ";
    for(var i =0;i < data.product.pago.length;i++){
    pago.innerHTML += " - "+data.product.pago[i];
    }
    var country = document.createElement("div");
    country.innerHTML = "country = ";
    country.innerHTML += data.product.country;

    var province = document.createElement("div");
    province.innerHTML = "province = ";
    province.innerHTML += data.product.province;

    var city = document.createElement("div");
    city.innerHTML = "city = ";
    city.innerHTML += data.product.city;
    
    //arreglar ruta IMATGE!!!!!
    console.log(data.product.avatar);
    var cad = data.product.avatar;
    //console.log(cad);
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="75" width="75"> ';
    img.innerHTML = html;
    //alert(html);

    div_product.appendChild(parrafo);
    parrafo.appendChild(msje);
    parrafo.appendChild(name);
    parrafo.appendChild(text_prod);
    parrafo.appendChild(price);
    parrafo.appendChild(estado);
    parrafo.appendChild(cod_prod);
    parrafo.appendChild(cant_prod);
    parrafo.appendChild(action);
    parrafo.appendChild(pago);
    parrafo.appendChild(country);
    parrafo.appendChild(province);
    parrafo.appendChild(city);
    content.appendChild(div_product);
    content.appendChild(img);
}
