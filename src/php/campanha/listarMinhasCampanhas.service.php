<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarMinhasCampanhas extends Rest
{
	function getDescription()
	{
		return "Lista as campanhas do usuário.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"campanhas"=> array(
				array("id"=>"1","nome"=>"campanha 1","status"=>"ativo")
			)
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
			return Campanha::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				campanha.* 
			from 
				campanha, 
				campanha_usuario, 
				usuario 
			where 
				campanha.id = campanha_usuario.id_campanha and 
				usuario.id = campanha_usuario.id_usuario and 
				usuario.login = '".Auth::getUserLogin()."' and
				campanha.status = 'ativo'
			order by 
				campanha.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return Campanha::errorResponse("Erro ao executar consulta no banco.");
		
		$campanhas = array();
		while($campanha = mysqli_fetch_assoc($result))
			array_push($campanhas, $campanha);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"campanhas"=>$campanhas
		);
		return $responseJson;
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"campanhas"=>""
		);
		return $responseJson;
	}
}
?>