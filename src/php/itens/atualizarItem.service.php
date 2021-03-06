<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AtualizarItem extends Rest
{
	function getDescription()
	{
		return "Atualizar as informações de um Item específico.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array("id"=>"1","nome"=>"Item 1");
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
		return "Usuário logado com qualquer perfil";
	}
	
	function call($request,$urlParameters) 
	{
		Auth::checkLogin("any");
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return AtualizarItem::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			update 
				item
			set 
				nome='".$request["nome"]."'
			where 
				id='".$request["id"]."'	
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return AtualizarItem::errorResponse("Não foi possível realizar a operação.");		
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>""
		);
		return $responseJson;
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