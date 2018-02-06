<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ResumirRelacaoDeItensNaData extends Rest
{
	function getDescription()
	{
		return "Retorna o número total de itens na relação e o número de itens contados no dia especificado. O número total de itens na relação
		é o número atual de itens cadastrados, não o número que estava cadastrado na data especificada. Já o número de itens contados
		é a soma dos números de contagem para todos os itens informados no dia";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id_lista"=>"1",
			"data"=>"2018-01-23"
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"total"=> "30",
			"contados"=> "25"
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
			return ResumirRelacaoDeItensNaData::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select
				count(item.id) as total
			from
				item
			where
				item.id_lista = '".$request["id_lista"]."'
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ResumirRelacaoDeItensNaData::errorResponse("Erro ao executar consulta no banco.");
		$queryResult1 = mysqli_fetch_assoc($result);

		$query = 
		"
			select 
				sum(quantidade) as contados
			from 
				contagem_itens,
				item,
				lista_itens
			where 
				contagem_itens.id_item = item.id and
				item.id_lista = lista_itens.id and
				lista_itens.id = '".$request["id_lista"]."' and
				contagem_itens.dt_atividade = '".$request["data"]."'	
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ResumirRelacaoDeItensNaData::errorResponse("Erro ao executar consulta no banco.");
		$queryResult2 = mysqli_fetch_assoc($result);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"total"=>$queryResult1["total"],
			"contados"=>$queryResult2["contados"]
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
			"total"=>0,
			"contados"=>0
		);
		return $responseJson;
	}
}
?>