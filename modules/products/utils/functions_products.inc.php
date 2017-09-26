<?php
function validate_product($value){
	$filtro = array(
		'name' => array(
			'filter'=>FILTER_VALIDATE_REGEXP,
			'options'=>array('regexp'=>'/^.{2,30}\s*$/')
		),
		'text_prod' => array(
			'filter'=>FILTER_VALIDATE_REGEXP,
			'options'=>array('regexp'=>'/^.{2,200}\s*$/')
		),
		'price' => array(
			'filter'=>FILTER_CALLBACK,
			'options'=>'validateprice'
		),

		'estado' => array(
    	  	'filter'=>FILTER_CALLBACK,
			'options'=>'validateestado'
		),

		'cod_prod' => array(
			'filter'=>FILTER_VALIDATE_REGEXP,
			'options'=>array('regexp'=>'/^([0-9]{8})*$/')
		),
		'cant_prod' => array(
      		'filter'=>FILTER_CALLBACK,
			'options'=>'validateprice'

		),
		'action' => array(
      	'filter'=>FILTER_CALLBACK,
			'options'=>'validateaction'
		),
		'pago' => array(
			'filter'=>FILTER_CALLBACK,
			'options'=>'validatepago'
		)
	);
	$resultado=filter_var_array($value, $filtro);
	if(!$resultado['name']){
		$error['name']='El nombre no es valido';
	}if(!$resultado['text_prod']){
		$error['text_prod']='El text_prod no es valido';
	}if(!$resultado['price']){	
		$error['price']='El Precio no es valido (+0 -999999) ';
	}if(!$resultado['estado']){
		$error['estado']='El Estado no es valido';
	}if(!$resultado['cod_prod']){
		$error['cod_prod']='El Codigo de Producto no es valdio (00000000) ';
	}if(!$resultado['cant_prod']){
		$error['cant_prod']='La Cantidad no es valida (+0 -999999) ';
	}if(!$resultado['action']){
			$error['action']='Debes elegir una';
	}if(!$resultado['pago']){
		$error['pago']='Debes elegir uno';
	}
		if((empty($error))){
			return $return=array('resultado'=>true , 'error'=>$error,'datos'=>$resultado);
		}
		return $return=array('resultado'=>false,'error'=>$error,'datos'=>$resultado);
};


function validateprice($texto){
	$texto = filter_var($texto, FILTER_VALIDATE_FLOAT);
	if (!empty($texto)){
		if(($texto > 0)||($texto < 999999)){
			return $texto;
		}else{
			return false;
		}
	}else
		return false;
			
}
function validateestado($texto){
			if(($texto === "new")||($texto === "used_good")||($texto === "used_bad")||($texto === "broken")){
					return $texto;
			}else{
					return false;
			}
}
function validateaction($texto){
			if(($texto === "buy")||($texto === "sell")){
					return $texto;
			}else{
					return false;
			}
}
function validatepago($texto){
	if(count($texto)>=1){
    return $texto;
  }
  return false;
}
