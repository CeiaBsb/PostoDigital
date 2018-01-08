<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AtualizarUsuario extends Rest
{
	function getDescription()
	{
		return "Atualizar as informações de um usuário específico. Se a senha for passada em branco, a senha atual não será alterada.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array("id"=>"1","nome"=>"usuario 1","login"=>"theUser","senha"=>"12345","perfil"=>"editor","status"=>"ativo");
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
			return AtualizarUsuario::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			update 
				usuario
			set 
				nome = '".$request["nome"]."'
				, login = '".$request["login"]."'"
				.$this->campo($request, "senha", "hash = md5('".$request["senha"]."')").
				", status = '".$request["status"]."'
				, perfil = '".$request["perfil"]."'
			where
				id = '".$request["id"]."'	
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return AtualizarUsuario::errorResponse("Não foi possível realizar a operação.");		
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
	
	function campo($parametros, $parametro, $filtro)
	{
		if($parametros[$parametro]!="")
			return " , ".$filtro." ";
		else
			return "";
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