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
                            . " cod_prod, cant_prod, action, pago, country, province, city, avatar"
                            . " ) VALUES ('".$arrArgument['name']."', '".$arrArgument['text_prod']."', '".$arrArgument['price']."','".$arrArgument['estado']."',"
                            . " '".$arrArgument['cod_prod']."', '".$arrArgument['cant_prod']."', '".$arrArgument['action']."', '".$pago."', '".$arrArgument['country']."', '".$arrArgument['province']."', '".$arrArgument['city']."', '".$arrArgument['avatar']."')";
        return $db->ejecutar($sql);
    }

    public function details_product_DAO($db,$cod_prod) {
      $sql = "SELECT * FROM products WHERE cod_prod=".$cod_prod;
      $stmt = $db->ejecutar($sql);
      return $db->listar($stmt);
      
    }

    public function list_products_DAO($db,$arrg) {
      $limits= explode(",",$arrg);
      $sql = "SELECT * FROM products LIMIT " . $limits[0] . " , " . $limits[1] ;
      $stmt = $db->ejecutar($sql);
      return $db->listar($stmt);
    }

    public function obtain_countries_DAO($url){
      $ch = curl_init();
      curl_setopt ($ch, CURLOPT_URL, $url);
      curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
      $file_contents = curl_exec($ch);
      $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
      curl_close($ch);
      $accepted_response = array(200, 301, 302);
      if(!in_array($httpcode, $accepted_response)){
        return FALSE;
      }else{
        return ($file_contents) ? $file_contents : FALSE;
      }
    }

  public function obtain_provinces_DAO(){
    $json = array();
    $tmp = array();
    $provincias = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/1_Backend/6_dependent_dropdowns/resources/provinciasypoblaciones.xml');
    $result = $provincias->xpath("/lista/provincia/nombre | /lista/provincia/@cod_prod");
    for ($i=0; $i<count($result); $i+=2) {
      $e=$i+1;
      $provincia=$result[$e];
      $tmp = array(
        'cod_prod' => (string) $result[$i], 'nombre' => (string) $provincia
      );
      array_push($json, $tmp);
    }
    return $json;
  }

  public function obtain_cities_DAO($arrArgument){
    $json = array();
    $tmp = array();
    $filter = (string)$arrArgument;
    $xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/1_Backend/6_dependent_dropdowns/resources/provinciasypoblaciones.xml');
    $result = $xml->xpath("/lista/provincia[@cod_prod='$filter']/localcod_prodades");
    for ($i=0; $i<count($result[0]); $i++) {
      $tmp = array(
          'poblacion' => (string) $result[0]->localcod_prodad[$i]
      );
      array_push($json, $tmp);
    }
    return $json;
  }
}
