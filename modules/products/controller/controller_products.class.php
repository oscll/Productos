<?php
class controller_products{
    function __construct(){
        include(UTILS_PRODUCTS . "functions_products.inc.php");
        include(UTILS . "upload.php");
        session_start();
    }
    function upload(){
        $result_avatar = upload_files();
        $_SESSION['result_avatar'] = $result_avatar;
    }
    function alta_products() {
        $jsondata = array();
        $productsJSON = json_decode($_POST["alta_products_json"], true);
        $result = validate_product($productsJSON);
        if (empty($_SESSION['result_avatar'])) {
            $_SESSION['result_avatar'] = array('resultado' => true, 'error' => "", 'datos' => 'media/default-avatar.png');
        }
        $result_avatar = $_SESSION['result_avatar'];
        if (($result['resultado']) && ($result_avatar['resultado'])) {
            $datos=$result['datos'];
            $datos['avatar'] =$result_avatar['datos'];
            /////////////////insert into BD////////////////////////
            
            $arrValue = false;
            try{    
                $arrValue = loadModel(MODEL_PRODUCTS, "product_model", "create_product", $datos);    
            }catch(Exception $e){

            }
            
            if ($arrValue)
                $mensaje = "Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones";
            else
                $mensaje = "No se ha podido realizar su alta. Intentelo mas tarde";
            //redirigir a otra p�gina con los datos de $arrArgument y $mensaje
            $_SESSION['product'] = $datos;
            $_SESSION['msje'] = $mensaje;
            $_SESSION["item_cod_prod"]=$datos['cod_prod'];
            $callback = "../result_product_html/";
            $jsondata["success"] = true;
            $jsondata["redirect"] = $callback;
            echo json_encode($jsondata);
            exit;
        } else {
            //$error = $result['error'];
            //$error_avatar = $result_avatar['error'];
            $jsondata["success"] = false;
            $jsondata["error"] = $result['error'];
            $jsondata["error_avatar"] = $result_avatar['error'];
            $jsondata["success1"] = false;
            if ($result_avatar['resultado']) {
                $jsondata["success1"] = true;
                $jsondata["img_avatar"] = $_SERVER['DOCUMENT_ROOT'];
            }
            header('HTTP/1.0 403 Bad error');
            echo json_encode($jsondata);
            //exit;
        }
    }
    
    function delete_product(){
        $_SESSION['result_avatar'] = array();
        $result = remove_files();
        if ($result === true) {
            echo json_encode(array("res" => true));
        } else {
            echo json_encode(array("res" => false));
        }
    }
    
    function load_product(){
        $jsondata = array();
        if (isset($_SESSION['product'])) {
            //echo debug($_SESSION['product']);
            $jsondata["product"] = $_SESSION['product'];
        }
        if (isset($_SESSION['msje'])) {
            //echo $_SESSION['msje'];
            $jsondata["msje"] = $_SESSION['msje'];
        }
        close_session();
        echo json_encode($jsondata);
        exit;
    }
    function close_session() {
        unset($_SESSION['product']);
        unset($_SESSION['msje']);
        $_SESSION = array(); // Destruye todas las variables de la sesión
        session_destroy(); // Destruye la sesión
    }
    function load_data_product(){
        $jsondata = array();
        if (isset($_SESSION['product'])) {
            $jsondata["product"] = $_SESSION['product'];
            echo json_encode($jsondata);
            exit;
        } else {
            $jsondata["product"] = "";
            echo json_encode($jsondata);
            exit;
        }
    }

    function load_country(){
        $json = array();
        $url = 'http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByName/JSON';
        try{
            $json = loadModel(MODEL_PRODUCTS, "product_model", "obtain_countries", $url);    
        }catch(Exception $e){
            $json = array();
        }
        if($json){
            echo $json;
            exit;
        }else{
            $json = "error";
            echo $json;
            exit;
        }
    }
    function load_provinces(){
        $jsondata = array();
        $json = array();
        $json = loadModel(MODEL_PRODUCTS, "product_model", "obtain_provinces");
        if($json){
            $jsondata["provinces"] = $json;
            echo json_encode($jsondata);
            exit;
        }else{
            $jsondata["provinces"] = "error";
            echo json_encode($jsondata);
            exit;
        }
    }

    function load_citys(){
        $jsondata = array();
        $json = array();    
        $json = loadModel(MODEL_PRODUCTS, "product_model", "obtain_cities", $_POST['idPoblac']);
    
        if($json){
            $jsondata["cities"] = $json;
            echo json_encode($jsondata);
            exit;
        }else{
            $jsondata["cities"] = "error";
            echo json_encode($jsondata);
            exit;
        }
    }
////////FrontEnd
    function list_products(){
        $rows=5;
        $json = loadModel(MODEL_PRODUCTS, "product_model", "list_products",$_SESSION['limit'].", $rows");
        $_SESSION['limit']+=$rows;
        echo json_encode($json);
        exit;
    }
    
    function details_redirect(){
        if(validate_codproduct($_POST["item_cod_prod"])){
            $_SESSION['item_cod_prod'] = $_POST["item_cod_prod"];
            $path_detail = "../result_product_html/";
            echo ($path_detail);//json_encode no se usa por que sale con ""
        }else{
            header('HTTP/1.0 400 Bad error');
            echo json_encode("false");
            exit;
        }
    }

    function details_product(){
        if(isset($_SESSION["item_cod_prod"])){
            $json = loadModel(MODEL_PRODUCTS, "product_model", "details_product", $_SESSION["item_cod_prod"]);
            echo json_encode($json);
        }else{
            header('HTTP/1.0 400 Bad error');
            echo json_encode("No existe details_product".$_SESSION["item_cod_prod"]);
            exit;
        }
    }

    function clear_limit(){
        try{
            $_SESSION['limit']=0;
        }catch(Exception $e){
            header('HTTP/1.0 400 Bad error');
            echo json_encode("No existe details_product".$_SESSION["item_cod_prod"]);
            exit;
        }
    }

    ///html 
    function list_products_html() {
        require_once(VIEW_PATH_INC . "header.php");
        require_once(VIEW_PATH_INC . "menu.php");

        loadView('modules/products/view/', 'list_products.php');

        require_once(VIEW_PATH_INC . "footer.php");
    }

    function create_product_html(){
        require_once(VIEW_PATH_INC . "header.php");
        require_once(VIEW_PATH_INC . "menu.php");

        loadView('modules/products/view/', 'create.php');

        require_once(VIEW_PATH_INC . "footer.php");
    }
    function result_product_html(){
        require_once(VIEW_PATH_INC . "header.php");
        require_once(VIEW_PATH_INC . "menu.php");

        loadView('modules/products/view/', 'details_product.php');

        require_once(VIEW_PATH_INC . "footer.php");
    }
}
