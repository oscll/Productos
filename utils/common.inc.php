<?php
function filter_num_int($num) {
    $num = filter_var($num, FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH);
    if (!is_numeric($num)) {
        return $return = array('resultado' => false, 'error' => "Invalid page number!", 'datos' => 1);
    }
    return $return = array('resultado' => true, 'error' => "", 'datos' => $num);
}

function filter_string($cad) {
    $result = filter_var($cad, FILTER_VALIDATE_REGEXP, array('options' => array('regexp' => '/^[a-zA-Z0-9 .]*$/')));
    if (!$result) {
        return $return = array('resultado' => false, 'error' => "Invalid value input", 'datos' => "");
    }
    return $return = array('resultado' => true, 'error' => "", 'datos' => $cad);
}

    function loadModel($model_path, $model_name, $function, $arrArgument = '') {
        $model = $model_path . $model_name . '.class.singleton.php';
        if (file_exists($model)) {
            include_once($model);

            $modelClass = $model_name;
            if (!method_exists($modelClass, $function)){
                throw new Exception();                
            }
            
            $obj = $modelClass::getInstance();
            if (isset($arrArgument)) { 
                return call_user_func(array($obj, $function),$arrArgument);//cambiar a array como en router
            }else{
                try{
                    return call_user_func(array($obj, $function));//cambiar a array como en router
                }catch(Exception $e){
                    header('HTTP/1.0 403 Bad error');
                    echo json_encode("no existe arrArgument");  
                } 
            }
        } else {
            die($model_name . ' Model Not Found under Model Folder');
        }
    }

    function loadView($rutaVista = '', $templateName = '', $arrPassValue = '') {
        $view_path = $rutaVista . $templateName;
        $arrData = '';
        
        if (file_exists($view_path)) {
            if (isset($arrPassValue))
                $arrData = $arrPassValue;
            include_once($view_path);
        } else {
            //millora per a no utilitzar  ob_start() per evitar dublicació de headers
            $error = filter_num_int($rutaVista);
            if($error['resultado']){
                $rutaVista = $error['datos'];
            }else{
                $rutaVista = http_response_code();
            }
            
            //$log = log::getInstance();
            //$log->add_log_general("error loadView general", $_GET['module'], "response " . $rutaVista); //$text, $controller, $function
            //$log->add_log_user("error loadView general", "", $_GET['module'], "response " . $rutaVista); //$msg, $username = "", $controller, $function
    
            $result = response_code($rutaVista);
            $arrData = $result;
            require_once VIEW_PATH_INC_ERROR . "error.php";
            //die();
        }
    }