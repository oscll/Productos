<?php
class products_bll {
    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = products_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function create_product_BLL($arrArgument) {
        return $this->dao->create_product_DAO($this->db, $arrArgument);
    }
    public function details_product_BLL($cod_prod) {
        return $this->dao->details_product_DAO($this->db,$cod_prod);
    }
    public function list_products_BLL($limit) {
        return $this->dao->list_products_DAO($this->db,$limit);
    }
    
    public function obtain_countries_BLL($url){
        return $this->dao->obtain_countries_DAO($url);
    }
    public function obtain_provinces_BLL(){
        return $this->dao->obtain_provinces_DAO();
    }
    public function obtain_cities_BLL($arrArgument){
        return $this->dao->obtain_cities_DAO($arrArgument);
    }
}
