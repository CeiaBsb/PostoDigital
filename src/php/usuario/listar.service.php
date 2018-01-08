<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarUsuarios extends Rest
{
	function getDescription()
	{
		return "Lista os usuários cadastrados segundo os filtros informados. A senha retornada sempre virá em branco.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id"=>"1",
			"nome"=>"",
			"login"=> "",
			"status"=> "",
			"perfil"=> ""
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"usuarios"=> array(
				array("id"=>"1","nome"=>"usuario 1","login"=>"user","status"=>"ativo","perfil"=>"editor")
			)
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
			return Usuario::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				usuario.* 
			from 
				usuario
			where 
				usuario.id>0 ".
				$this->filtro($request, "id", "usuario.id = '".$request["id"]."'"). 
				$this->filtro($request, "nome", "usuario.nome like '%".$request["nome"]."%'"). 
				$this->filtro($request, "login", "usuario.nome = '".$request["login"]."'").
				$this->filtro($request, "status", "usuario.status = '".$request["status"]."'"). 
				$this->filtro($request, "perfil", "usuario.status = '".$request["perfil"]."'").
			" order by 
				usuario.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return Usuario::errorResponse("Erro ao executar consulta no banco.");
		
		$usuarios = array();
		while($usuario = mysqli_fetch_assoc($result))
		{
			unset($usuario["hash"]);
			$usuario["senha"]="";
			array_push($usuarios, $usuario);
		}
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"usuarios"=>$usuarios
		);
		return $responseJson;
	}
	
	function filtro($parametros, $parametro, $filtro)
	{
		if($parametros[$parametro]!="")
			return " and ".$filtro." ";
		else
			return "";
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"usuarios"=>array()
		);
		return $responseJson;
	}
}
?>