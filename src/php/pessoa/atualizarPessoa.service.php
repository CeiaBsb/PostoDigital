<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AtualizarPessoa extends Rest
{
	function getDescription()
	{
		return "Atualizar as informações de uma pessoa específica.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array("id"=>"1","nome"=>"pessoa 1","dt_nascimento"=>"2018-02-03","nome_mae"=>"maria","atualizado"=>"true","tem_foto"=>"false");
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
			return AtualizarPessoa::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			update 
				pessoa
			set 
				nome = '".$request["nome"]."',
				dt_nascimento = '".$request["dt_nascimento"]."',
				nome_mae = '".$request["nome_mae"]."',
				atualizado = '".$request["atualizado"]."',
				tem_foto = '".$request["tem_foto"]."'
			where 
				id = '".$request["id"]."'		
		";
		// echo $query;
		$result = mysqli_query($connection, $query);
		if(!$result)
			return AtualizarPessoa::errorResponse("Não foi possível realizar a operação.");	

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