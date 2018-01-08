<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AdicionarCampanha extends Rest
{
	function getDescription()
	{
		return "Adiciona uma nova campanha e a retorna.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
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
			"msg"=>"",
			"campanha"=>array("id"=>"1","nome"=>"Nova Campanha","status"=>"ativo")
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
			insert into 
				campanha (nome, status)
				values ('Nova Campanha', 'ativo')			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharCampanha::errorResponse("Erro ao adicionar a Campanha no banco.");
		else
		{
			$id = mysqli_insert_id($connection);
			$query = 
			"
				select 
					campanha.* 
				from 
					campanha
				where 
					campanha.id = '".$id."'			
			";
			$result = mysqli_query($connection, $query);
			if(!$result)
				return DetalharCampanha::errorResponse("Erro ao executar consulta no banco.");
			
			if($campanha = mysqli_fetch_assoc($result))
			{
				$responseJson = 
				array
				(
					"type"=>"success",
					"msg"=>"",
					"campanha"=>$campanha
				);
				return $responseJson;
			}
			else
				return DetalharCampanha::errorResponse("Não foi possível recuperar a campanha criada.");
		}
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"campanha"=>array("id"=>"","nome"=>"","status"=>"")
		);
		return $responseJson;
	}
}
?>