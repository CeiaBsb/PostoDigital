<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ExcluirPessoa extends Rest
{
	function getDescription()
	{
		return "Exclui uma pessoa específica.";
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
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return ExcluirPessoa::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			delete from
				pessoa
			where
				id='".$urlParameters[0]."'			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ExcluirPessoa::errorResponse("Erro ao excluir a pessoa.");
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