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
        $pago = implode(",", $arrArgument['pago']);
        $sql = "INSERT INTO products (name, text_prod, price, estado,"
                            . " cod_prod, cant_prod, action, pago, avatar"
                            . " ) VALUES ('".$arrArgument['name']."', '".$arrArgument['text_prod']."', '".$arrArgument['price']."','".$arrArgument['estado']."',"
                            . " '".$arrArgument['cod_prod']."', '".$arrArgument['cant_prod']."', '".$arrArgument['action']."', '".$pago."', '".$arrArgument['avatar']."')";
        return $db->ejecutar($sql);
    }
}
