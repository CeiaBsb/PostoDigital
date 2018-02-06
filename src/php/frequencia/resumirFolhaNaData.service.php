<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ResumirFolhaNaData extends Rest
{
	function getDescription()
	{
		return "Retorna o número total de pessoas na folha e o número de presenças no dia especificado. O número total de pessoas na lista
		é o número atual de pessoas ativas relacionadas, não o número que estava relacionado na data especificada. Já o número de presenças
		é o número informado, independente da pessoa estar ativa hoje ou não";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id_folha"=>"1",
			"data"=>"2018-01-23"
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"pessoas"=> "30",
			"presentes"=> "25"
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
			return ResumirFolhaNaData::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				count(lista_pessoa.id_pessoa) as pessoas
			from 
				lista_pessoa
			where 
				id_lista = '".$request["id_folha"]."'		
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ResumirFolhaNaData::errorResponse("Erro ao executar consulta no banco.");
		$queryResult1 = mysqli_fetch_assoc($result);

		$query = 
		"
			select 
				count(id_lista) as presentes
			from 
				presenca
			where 
				id_lista = '".$request["id_folha"]."' and
				dt_frequencia = '".$request["data"]."'		
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ResumirFolhaNaData::errorResponse("Erro ao executar consulta no banco.");
		$queryResult2 = mysqli_fetch_assoc($result);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"pessoas"=>$queryResult1["pessoas"],
			"presentes"=>$queryResult2["presentes"]
		);
		return $responseJson;
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"listasFrequencia"=>""
		);
		return $responseJson;
	}
}
?>