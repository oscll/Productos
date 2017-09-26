<?php
class productDAO {
    static $_instance;

    private function __construct() {
        
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }
    
    public function create_product_DAO($db, $arrArgument) {
        $pago = $arrArgument['pago'].implode(",");
        header('HTTP/1.0 402 Bad error');
        echo json_encode("hola".$pago);
        $sql = "INSERT INTO products (name, text_prod, price, estado,"
                            . " cod_prod, cant_prod, action, pago"
                            . " ) VALUES ('".$arrArgument['name']."', '".$arrArgument['text_prod']."', '".$arrArgument['price']."',"
                            . " '".$arrArgument['cod_prod']."', '".$arrArgument['cant_prod']."', '".$arrArgument['action']."', '".$arrArgument['pago']."')";

        return $db->ejecutar($sql);
    }
}
