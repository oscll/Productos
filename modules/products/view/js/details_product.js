$(document).ready(function () {
    load_product_ajax();
});

function load_product_ajax() {
    $.ajax({
        type: 'GET',
        url: "modules/products/controller/controller_products.class.php?details_product=true",
        //dataType: 'json',
        async: false
    }).done(function (data) {
        var json = JSON.parse(data);
        console.log(json[0]);
        pintar_product(json[0]);
        //console.log(json);
    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}


function pintar_product(data) {
    //alert(data.product.avatar);
    var content = document.getElementById("content");
    var div_product = document.createElement("div");
    var parrafo = document.createElement("p");
    
    var name = document.createElement("div");
    name.innerHTML = "name = ";
    name.innerHTML += data.name;

    var text_prod = document.createElement("div");
    text_prod.innerHTML = "text_prod = ";
    text_prod.innerHTML += data.text_prod;

    var price = document.createElement("div");
    price.innerHTML = "price = ";
    price.innerHTML += data.price;
    
    var estado = document.createElement("div");
    estado.innerHTML = "estado = ";
    estado.innerHTML += data.estado;

    var cod_prod = document.createElement("div");
    cod_prod.innerHTML = "cod_prod = ";
    cod_prod.innerHTML += data.cod_prod;

    var cant_prod = document.createElement("div");
    cant_prod.innerHTML = "cant_prod = ";
    cant_prod.innerHTML += data.cant_prod;

    var action = document.createElement("div");
    action.innerHTML = "action = ";
    action.innerHTML += data.action;
    
    var pago = document.createElement("div");
    pago.innerHTML = "pago = ";
    //pago.innerHTML += " - "+data.product.pago[i];
    var pago_array = data.pago.split(",");
    pago.innerHTML += " - "+pago_array.join(" ");

    var country = document.createElement("div");
    country.innerHTML = "country = ";
    country.innerHTML += data.country;

    var province = document.createElement("div");
    province.innerHTML = "province = ";
    province.innerHTML += data.province;

    var city = document.createElement("div");
    city.innerHTML = "city = ";
    city.innerHTML += data.city;
    
    var img = document.createElement("div");
    var html = '<img src="' + data.avatar + '" height="75" width="75"> ';
    img.innerHTML = html;
    //alert(html);

    div_product.appendChild(parrafo);
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
