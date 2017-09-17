<?php
include 'modules/products/utils/functions_products.inc.php';
if (isset($_POST['SubmitProductos'])) {
//  debugPHP($_POST);
   $result = validate_product();
   if ($result['resultado']) {
       $_SESSION=$result['datos'];
       $callback="index.php?module=products&view=result";
       redirect($callback);
   }else {
     $error = $result['error'];
   }
}
include 'modules/products/view/create.php';
