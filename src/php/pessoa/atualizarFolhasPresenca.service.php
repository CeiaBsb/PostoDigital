<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AtualizarFolhasPresencaDaPessoa extends Rest
{
	function getDescription()
	{
		return "Atualiza quais as folhas de presença que estão relacionadas à pessoa. As folhas que não forem informadas perderão o relacionamento com a pessoa.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id_pessoa"=>"1",
			"folhas_relacionadas"=> array("1","2")
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
		return "Usuário logado";
	}
	
	function call($request,$urlParameters) 
	{
		Auth::checkLogin("administrador");
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return AtualizarFolhasPresencaDaPessoa::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			delete from 
				lista_pessoa 
			where   
				lista_pessoa.id_pessoa = '".$request["id_pessoa"]."'
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return AtualizarFolhasPresencaDaPessoa::errorResponse("Erro ao executar consulta no banco.");
		
		if(count($request["folhas_relacionadas"])>0)
		{
			$query = 
			"
				insert into 
					lista_pessoa (id_lista, id_pessoa)
				values
			";
			$primeiro = true;
			foreach($request["folhas_relacionadas"] as $folha) {
				if(!$primeiro)
					$query = $query.",";
				$query = $query."(".$folha.",".$request['id_pessoa'].")";
				$primeiro = false;
			}
			$result = mysqli_query($connection, $query);
			if(!$result)
				return AtualizarFolhasPresencaDaPessoa::errorResponse("Erro ao executar o relacionamento das folhas.");			
			
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