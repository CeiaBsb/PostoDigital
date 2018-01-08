<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class DetalharPessoa extends Rest
{
	function getDescription()
	{
		return "Obtém os detalhes de uma pessoa específica.";
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
			"msg"=>"",
			"pessoa"=>array("id"=>"1","nome"=>"pessoa 1","dt_nascimento"=>"2018-02-03","nome_mae"=>"maria","atualizado"=>"true","tem_foto"=>"true")
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
			return DetalharPessoa::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				pessoa.* 
			from 
				pessoa
			where 
				pessoa.id = '".$urlParameters[0]."'			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharPessoa::errorResponse("Erro ao executar consulta no banco.");
		
		if($pessoa = mysqli_fetch_assoc($result))
		{
			$responseJson = 
			array
			(
				"type"=>"success",
				"msg"=>"",
				"pessoa"=>$pessoa
			);
			return $responseJson;
		}
		else
			return DetalharPessoa::errorResponse("Não existe pessoa com o id informado.");
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"pessoa"=>array("id"=>"","nome"=>"","dt_nascimento"=>"","nome_mae"=>"","atualizado"=>"","tem_foto"=>"")
		);
		return $responseJson;
	}
}
?>