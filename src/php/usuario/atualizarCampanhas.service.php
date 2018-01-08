<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AtualizarCampanhasDoUsuario extends Rest
{
	function getDescription()
	{
		return "Atualiza quais as campanhas que estão relacionadas ao usuário. As campanhas que não forem informadas perderão o relacionamento com o usuário.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id_usuario"=>"1",
			"campanhas_relacionadas"=> array("1","2")
		);
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
		return "Usuario logado com perfil de administrador";
	}
	
	function call($request,$urlParameters) 
	{
		Auth::checkLogin("administrador");
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return AtualizarCampanhasDoUsuario::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			delete from 
				campanha_usuario 
			where   
				campanha_usuario.id_usuario = '".$request["id_usuario"]."'
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return AtualizarCampanhasDoUsuario::errorResponse("Erro ao executar consulta no banco.");
		
		if(count($request["campanhas_relacionadas"])>0)
		{
			$query = 
			"
				insert into 
					campanha_usuario (id_campanha, id_usuario)
				values
			";
			$primeiro = true;
			foreach($request["campanhas_relacionadas"] as $campanha) {
				if(!$primeiro)
					$query = $query.",";
				$query = $query."(".$campanha.",".$request['id_usuario'].")";
				$primeiro = false;
			}
			$result = mysqli_query($connection, $query);
			if(!$result)
				return AtualizarCampanhasDoUsuario::errorResponse("Erro ao executar o relacionamento das campanhas.");			
			
			$responseJson = 
			array
			(
				"type"=>"success",
				"msg"=>""
			);
			return $responseJson;
		}
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