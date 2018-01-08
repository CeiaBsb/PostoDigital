<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ExcluirUsuario extends Rest
{
	function getDescription()
	{
		return "Exclui um usuário específico com base no seu id.";
	}
	
	function getUrlParametersDescription()
	{
		return array("id do usuario");
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
		return "Usuário logado com perfil de administrador";
	}
	
	function call($request,$urlParameters) 
	{
		Auth::checkLogin("administrador");
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return ExcluirUsuario::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			delete from
				usuario
			where
				id='".$urlParameters[0]."'			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ExcluirUsuario::errorResponse("Erro ao excluir o usuário.");
		else
		{
			$responseJson = 
			array
			(
				"type"=>"success",
				"msg"=>""
			);
			return $responseJson;
		}
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