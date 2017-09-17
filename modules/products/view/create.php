
<script type="text/javascript" src="modules/products/view/js/products.js" ></script>
  <h2>Productos formulario</h2>
  <form action="index.php?module=products" id="form_user" method="POST">
  <ul class="ul_form">
    <li type="disk"><br/>
      <label for="name">Nombre Producto:</label>
      <input type="text"  id="name" placeholder="Enter Name" name="name" value="<?php echo $_POST?$_POST['name']:""; ?>">
      <span id="name" class="styerror"></span>
      <?php
        if (isset($error['name']))
            print ("<BR><SPAN CLASS='styerror' color: #ff0000;>" . "* ".$error['name'] . "</SPAN>");
      ?>
    </li><br/>
    <li>
      <label for="price">Precio Producto:</label>
      <input type="text"  id="price" placeholder="Enter Price" name="price" value="<?php echo $_POST?$_POST['price']:""; ?>">
      <span id="price" class="styerror"></span>
      <?php
        if (isset($error['price']))
            print ("<BR><SPAN CLASS='styerror' color: #ff0000;>" . "* ".$error['price'] . "</SPAN>");
      ?>
    </li><br/>
    <li>
      <label for="estado">Estado Producto:</label>
      <select name="estado" id="estado">
        <option value="new" <?php if($_POST['estado']==="new"){echo "selected";} ?>>Nuevo</option>
        <option value="used_good" <?php if($_POST['estado']==="used_good"){echo "selected";} ?>>Como nuevo</option>
        <option value="used_bad" <?php if($_POST['estado']==="used_bad"){echo "selected";} ?>>Con Algunos desperfectos</option>
        <option value="broken" <?php if($_POST['estado']==="broken"){echo "selected";} ?>>No funciona</option>
      </select>
      <span id="estado" class="styerror"></span>
      <?php
        if (isset($error['estado']))
            print ("<BR><SPAN CLASS='styerror' color: #ff0000;>" . "* ".$error['estado'] . "</SPAN>");
      ?>
    </li><br/>
    <li>
      <label for="cod_prod">Codigo Producto:</label>
      <input type="text"  id="cod_prod" placeholder="Enter Codigo" name="cod_prod" value="<?php echo $_POST?$_POST['cod_prod']:""; ?>">
      <span id="cod_prod" class="styerror"></span>
      <?php
        if (isset($error['cod_prod']))
            print ("<BR><SPAN CLASS='styerror' color: #ff0000;>" . "* ".$error['cod_prod'] . "</SPAN>");
      ?>
    </li><br/>
    <li>
      <label for="cant_prod">Cantidad Productos:</label>
      <input type="number"  id="cant_prod" placeholder="Enter Cantidad" name="cant_prod" value="<?php echo $_POST?$_POST['cant_prod']:""; ?>">
      <span id="cant_prod" class="styerror"></span>
      <?php
        if (isset($error['cant_prod']))
            print ("<BR><SPAN CLASS='styerror' color: #ff0000;>" . "* ".$error['cant_prod'] . "</SPAN>");
      ?>
    </li><br/>
    <li>
      <label for="action">Accion Productos:</label>
      <ul>
        <li><label for=""><input type="radio"  id="action" name="action" value="buy" <?php if($_POST['action']==="buy"){echo "checked";}?>> Comprar</label></li>
        <li><label for=""><input type="radio"  id="action" name="action" value="sell" <?php if($_POST['action']==="sell"){echo "checked";}?>> Vender</label></li>
      </ul>
      <span id="action2" class="styerror"></span>
      <?php
        if (isset($error['action']))
            print ("<BR><SPAN CLASS='styerror' color: #ff0000;>" . "* ".$error['action'] . "</SPAN>");
      ?>
    </li><br/>
    <li>
      <label for="pago">Metodo de Pago :</label>
      <input type="checkbox"  name="pago[]" value="visa" <?php $key=array_search("visa",$_POST['pago'],true);
	    if($key===0||$key===1||$key===2||$key===3){echo checked;}?>> Visa
      <input type="checkbox" name="pago[]" value="sepa" <?php $key=array_search("sepa",$_POST['pago'],true);
	    if($key===0||$key===1||$key===2||$key===3){echo checked;}?>> Sepa
      <input type="checkbox"  name="pago[]" value="bitcoin" <?php $key=array_search("bitcoin",$_POST['pago'],true);
	    if($key===0||$key===1||$key===2||$key===3){echo checked;}?>> Bitcoin
      <input type="checkbox"  name="pago[]" value="monero" <?php $key=array_search("monero",$_POST['pago'],true);
	    if($key===0||$key===1||$key===2||$key===3){echo checked;}?>> Monero
      <span id="pago-error" class="styerror"></span>
      <?php
        if (isset($error['pago']))
            print ("<BR><SPAN CLASS='styerror' color: #ff0000;>" . "* ".$error['pago'] . "</SPAN>");
      ?>
    </li><br/>
  </ul>
      

     
      <input type="submit" name="SubmitProductos" id="SubmitProductos" value="Enviar">
  </form>
