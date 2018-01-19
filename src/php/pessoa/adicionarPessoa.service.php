<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AdicionarPessoa extends Rest
{
	function getDescription()
	{
		return "Adiciona uma nova pessoa e a retorna.";
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
			"pessoa"=>array("id"=>"1","nome"=>"Nova Pessoa","dt_nascimento"=>"2018-02-03","nome_mae"=>"","atualizado"=>"false","tem_foto"=>"false")
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
			insert into 
				pessoa (nome, atualizado, tem_foto, dt_nascimento)
				values ('Nova Pessoa', 'false', 'false', CURDATE() )			
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharPessoa::errorResponse("Erro ao adicionar a Pessoa no banco.");
		else
		{
			$id = mysqli_insert_id($connection);
			$query = 
			"
				select 
					pessoa.* 
				from 
					pessoa
				where 
					pessoa.id = '".$id."'			
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
				return DetalharPessoa::errorResponse("Não foi possível recuperar a pessoa criada.");
		}
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