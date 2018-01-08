<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ExcluirCampanha extends Rest
{
	function getDescription()
	{
		return "Exclui uma campanha específica.";
	}
	
	function getUrlParametersDescription()
	{
		return array("id da campanha");
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
			return ExcluirCampanha::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			delete from
				campanha
			where
				id='".$urlParameters[0]."'			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ExcluirCampanha::errorResponse("Erro ao excluir a campanha. Talvez existam usuários ou listas ligadas a ela.");
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