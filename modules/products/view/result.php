<?php
	echo "<br>";
	echo "<br>";
	echo "<br>";
	echo "<br>";
	echo "<br>";
	echo "<br>";
	echo "<br>";
	echo "<br>";
	echo "<br>";

	// echo "<pre>";
	// print_r($_POST[SubmitProductos]);
	// echo "</pre>";
	// debugPHP($_SESSION['Product']);
	//
	//
	// //echo "<pre>";
	// //print_r($_SESSION);
	// //echo "</pre>";
	debugPHP($_SESSION);
	// //die();
		foreach ($_SESSION as $indice => $valor){
			if($indice==="pago"){
				echo "<br>Pago:<br>";
				$gustos = $_SESSION["pago"];
				foreach ($gustos as $indice => $valor)
					echo "$indice: $valor<br>";
			}else{
				echo "$indice: $valor<br>";
			}
		}
