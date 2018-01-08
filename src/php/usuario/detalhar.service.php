<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class DetalharUsuario extends Rest
{
	function getDescription()
	{
		return "Obtém os detalhes de um usuário específico com base no seu id. A senha sempre será retornada em branco.";
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
			"msg"=>"",
			"usuario"=>array("id"=>"1","nome"=>"usuario 1","login"=>"theUser","perfil"=>"editor","status"=>"ativo","senha"=>"")
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
			return DetalharUsuario::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				usuario.* 
			from 
				usuario
			where 
				usuario.id = '".$urlParameters[0]."'			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharUsuario::errorResponse("Erro ao executar consulta no banco.");
		
		if($usuario = mysqli_fetch_assoc($result))
		{
			unset($usuario["hash"]);
			$usuario["senha"]="";
			$responseJson = 
			array
			(
				"type"=>"success",
				"msg"=>"",
				"usuario"=>$usuario
			);
			return $responseJson;
		}
		else
			return DetalharUsuario::errorResponse("Não existe usuário com o id informado.");
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"usuario"=>array("id"=>"","nome"=>"","login"=>"","perfil"=>"","status"=>"")
		);
		return $responseJson;
	}
}
?>