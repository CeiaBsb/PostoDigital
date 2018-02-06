<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class RegistrarQuantidade extends Rest
{
	function getDescription()
	{
		return "Registra a quantidade de itens no dia especificado.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array("id_item"=>"1","data"=>"2016-09-03","quantidade"=>"2.4");
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
		return "Usuário logado com qualquer perfil";
	}
	
	function call($request,$urlParameters) 
	{
		Auth::checkLogin("any");
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return RegistrarQuantidade::errorResponse("Erro de acesso ao banco de dados.");

		if($request["quantidade"]!="0")
		{
			$query = 
			"
				select
					*
				from 
					contagem_itens
				where 
					id_item = '".$request["id_item"]."'
					and dt_atividade = '".$request["data"]."'	
			";
			$result = mysqli_query($connection, $query);
			if(!$result)
				return RegistrarQuantidade::errorResponse("Não foi possível realizar a operação.");		
			if(!mysqli_fetch_assoc($result))
			{
				$query = 
				"
					insert into 
						contagem_itens
						(id_item, dt_atividade, quantidade)
					values
						('".$request["id_item"]."','".$request["data"]."','".$request["quantidade"]."')
				";
				$result = mysqli_query($connection, $query);
				if(!$result)
					return RegistrarQuantidade::errorResponse("Não foi possível realizar a operação.");												
			}	
			else
			{
				$query = 
				"
					update
						contagem_itens
					set 
						quantidade = '".$request["quantidade"]."'
					where 
						id_item = '".$request["id_item"]."'
						and dt_atividade = '".$request["data"]."'
				";
				$result = mysqli_query($connection, $query);
				if(!$result)
					return RegistrarQuantidade::errorResponse("Não foi possível realizar a operação.");		
			}
			
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
			$query = 
			"
				delete from
					contagem_itens
				where 
					id_item = '".$request["id_item"]."'
					and dt_atividade = '".$request["data"]."'		
			";
			$result = mysqli_query($connection, $query);
			if(!$result)
				return RegistrarQuantidade::errorResponse("Não foi possível realizar a operação.");		
			
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