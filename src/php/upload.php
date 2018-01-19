<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class Upload extends Rest
{
	function getDescription()
	{
		return "Faz o upload de uma foto para uma pessoa específica. O arquivo deve seguir em um campo do tipo 'file' de nome 'userfile'";
	}
	
	function getUrlParametersDescription()
	{
		return array("id da pessoa");
	}
	
	function getRequestExample()
	{
		return array();
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>""
		);
	}
	
	function getRestrictions()
	{
		return "Usuário logado";
	}
	
	function call($request,$urlParameters) 
	{
		Auth::checkLogin("any");
		
		$uploadfile = UPLOAD_DIR . basename($urlParameters[0].'_orig.jpg');

		if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) 
		{
			$this->copyResized($urlParameters[0], 64);
			$this->copyResized($urlParameters[0], 300);
			
			$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
			if(!$connection)
				return Upload::errorResponse("Erro de acesso ao banco de dados.");

			$query = 
			"
				update 
					pessoa
				set 
					tem_foto = 'true'
				where 
					id = '".$urlParameters[0]."'		
			";
			$result = mysqli_query($connection, $query);
			if(!$result)
				return Upload::errorResponse("Não foi possível atualizar a base.");			

			$responseJson = 
			array
			(
				"type"=>"success",
				"msg"=>"Upload realizado com sucesso."
			);
			return $responseJson;
		} 
		else 
		{
			Upload::errorResponse("Não foi possível fazer o upload do arquivo.");
		}
	}
	
	function copyResized($id, $size)
	{
		$original = UPLOAD_DIR.$id.'_orig.jpg';
		$img = UPLOAD_DIR.$id.'_'.$size.'.jpg'; 

		list($width, $height) = getimagesize($original) ;

		$modwidth = $size;
		$diff = $width / $modwidth;
		$modheight = $height / $diff;
		
		$tn = imagecreatetruecolor($modwidth, $modheight) ;
		$image = imagecreatefromjpeg($original) ;
		
		imagecopyresampled($tn, $image, 0, 0, 0, 0, $modwidth, $modheight, $width, $height) ;
		imagejpeg($tn, $img, $size) ;
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message
		);
		return $responseJson;
	}
}
?>