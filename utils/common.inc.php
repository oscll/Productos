<?php
    function loadModel($model_path, $model_name, $function, $arrArgument = '') {
        $model = $model_path . $model_name . '.class.singleton.php';
        if (file_exists($model)) {
            include_once($model);

            $modelClass = $model_name;
            if (!method_exists($modelClass, $function)){
                die($function . ' function not found in Model ' . $model_name);
            }
            
            $obj = $modelClass::getInstance();
            if (isset($arrArgument)) { 
                return $obj->$function($arrArgument);
            }else{
                try{
                    return $obj->$function();
                }catch(Exception $e){
                    header('HTTP/1.0 403 Bad error');
                    echo json_encode("no existe arrArgument");  
                } 
            }
        } else {
            die($model_name . ' Model Not Found under Model Folder');
        }
    }

