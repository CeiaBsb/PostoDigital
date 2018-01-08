<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AdicionarUsuario extends Rest
{
	function getDescription()
	{
		return "Adiciona um novo usuário e o retorna. A senha retornada sempre virá em branco.";
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
			"usuario"=>array("id"=>"1","nome"=>"usuario 1","login"=>"theUser","perfil"=>"editor","status"=>"ativo")
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
			insert into 
				usuario (nome, login, hash, status, perfil)
				values ('Novo Usuario', 'usuario', '', 'inativo', 'editor')			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharUsuario::errorResponse("Erro ao adicionar o Usuário no banco.");
		else
		{
			$id = mysqli_insert_id($connection);
			$query = 
			"
				select 
					usuario.* 
				from 
					usuario
				where 
					usuario.id = '".$id."'			
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
				return DetalharUsuario::errorResponse("Não foi possível recuperar o usuário criado.");
		}
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