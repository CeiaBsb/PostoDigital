<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class RegistrarPresenca extends Rest
{
	function getDescription()
	{
		return "Registra a presenca de uma pessoa em uma determinada folha no dia especificado.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array("id_pessoa"=>"1","id_folha"=>"4","data"=>"2016-09-03","presente"=>"true");
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
			return RegistrarPresenca::errorResponse("Erro de acesso ao banco de dados.");

		if($request["presente"]=="true")
		{
			$query = 
			"
				select 
					*
				from 
					presenca
				where 
					presenca.id_lista = '".$request["id_folha"]."' 
					and presenca.id_pessoa = '".$request["id_pessoa"]."'
					and presenca.dt_frequencia = '".$request["data"]."'		
			";
			$result = mysqli_query($connection, $query);
			if(!$result)
				return RegistrarPresenca::errorResponse("Não foi possível realizar a operação.");		
			if(!mysqli_fetch_assoc($result))
			{
				$query = 
				"
					insert into 
						presenca
						(id_lista, id_pessoa, dt_frequencia )
					values
						('".$request["id_folha"]."','".$request["id_pessoa"]."','".$request["data"]."')
				";
				$result = mysqli_query($connection, $query);
				if(!$result)
					return RegistrarPresenca::errorResponse("Não foi possível realizar a operação.");												
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
					presenca
				where  
					presenca.id_lista = '".$request["id_folha"]."' 
					and presenca.id_pessoa = '".$request["id_pessoa"]."'
					and presenca.dt_frequencia = '".$request["data"]."'		
			";
			$result = mysqli_query($connection, $query);
			if(!$result)
				return RegistrarPresenca::errorResponse("Não foi possível realizar a operação.");		
			
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