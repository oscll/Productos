<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.js"></script> -->
<script type="text/javascript" src=<?php echo VIEW_JS_PATH."dropzone.min.js"?>></script>
<link rel="stylesheet" type="text/css" href=<?php echo CSS_PATH."dropzone.css"?>>
<script src=<?php echo VIEW_JS_PATH."jquery.form.js"?>></script>
<script type="text/javascript" src=<?php echo PRODUCTS_JS_PATH."/products.js" ?>></script>
  <h2>Productos formulario</h2>
  <form  id="form_user" method="POST"><!-- action="index.php?module=products" -->
  <ul class="ul_form" type="none">
    <li><br/>
      <label for="name">Nombre Producto:</label>
      <input type="text"  id="name" placeholder="Enter Name" name="name">
      <span id="name" class="styerror"></span>
    </li><br/>
    <li>
      <label for="text_prod">Descripcion Producto:</label>
      <textarea cols="35" rows="5" id="text_prod" name="text_prod" placeholder="text_prod" ></textarea>
      <span id="text_prod" class="styerror"></span>
    </li>
    <li>
      <label for="price">Precio Producto:</label>
      <input type="text"  id="price" placeholder="Enter Price" name="price" value="">
      <span id="price" class="styerror"></span>
    </li><br/>
    <li>
      <label for="estado">Estado Producto:</label>
      <select name="estado" id="estado">
        <option value="new" selected >Nuevo</option>
        <option value="used_good">Como nuevo</option>
        <option value="used_bad">Con Algunos desperfectos</option>
        <option value="broken">No funciona</option>
      </select>
      <span id="estado" class="styerror"></span>
    </li><br/>
    <li>
      <label for="cod_prod">Codigo Producto:</label>
      <input type="text"  id="cod_prod" placeholder="Enter Codigo" name="cod_prod" value="">
      <span id="cod_prod" class="styerror"></span>
    </li><br/>
    <li>
      <label for="cant_prod">Cantidad Productos:</label>
      <input type="number"  id="cant_prod" placeholder="Enter Cantidad" name="cant_prod" value="">
      <span id="cant_prod" class="styerror"></span>
    </li><br/>
    <li>
      <label for="action">Accion Productos:</label>
      <ul>
        <li><label for=""><input type="radio"  id="action" class="actionButton" name="action" value="buy" > Comprar</label></li>
        <li><label for=""><input type="radio"  id="action" class="actionButton" name="action" value="sell" > Vender</label></li>
      </ul>
      <span id="action2" class="styerror"></span>
    </li><br/>
    <li>
      <label for="pago">Metodo de Pago :</label>
      <input type="checkbox"  name="pago[]"class="pagoCheckbox" value="visa"> Visa
      <input type="checkbox" name="pago[]"class="pagoCheckbox" value="sepa"> Sepa
      <input type="checkbox"  name="pago[]"class="pagoCheckbox" value="bitcoin"> Bitcoin
      <input type="checkbox"  name="pago[]"class="pagoCheckbox" value="monero"> Monero
      <span id="pago-error" class="styerror"></span>
    </li>
    <br/>
    <br>
    <li>
      <label>Country : </label>
      <select name="country" id="country">
			    <option selected>Select country</option>
      </select>
      <span id="error_country" class="styerror"></span>
    </li>
    <li>
      <label>Province : </label>
      <select name="province" id="province">
			    <option selected>Select province</option>
      </select>
      <span id="error_province" class="styerror"></span>
    </li>
    <li>
      <label>City : </label>
      <select name="city" id="city">
			    <option selected>Select city</option>
      </select>
      <span id="error_city" class="styerror"></span>
    </li>
  </ul>
  <div class="form-group" id="progress">
    <div id="bar"></div>
    <div id="percent">0%</div >
  </div>
    <div class="msg"></div>
    <br/>
    <div id="dropzone" class="dropzone"></div><br/>

<!--     <input type="submit" name="SubmitProductos" id="SubmitProductos" value="Enviar"> -->
    <button type="button" id="SubmitProductos" name="SubmitProductos" class="btn btn-primary btn-lg" value="submit">Submit Message</button>
  </form>
