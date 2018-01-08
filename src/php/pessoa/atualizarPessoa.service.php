<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AtualizarCampanha extends Rest
{
	function getDescription()
	{
		return "Atualizar as informações de uma campanha específica.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array("id"=>"1","nome"=>"campanha 1","status"=>"ativo");
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
			return DetalharCampanha::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			update 
				campanha
			set 
				nome = '".$request["nome"]."',
				status = '".$request["status"]."'
			where 
				id = '".$request["id"]."'		
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharCampanha::errorResponse("Não foi possível realizar a operação.");		
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