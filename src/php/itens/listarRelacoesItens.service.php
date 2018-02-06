<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarRelacoesItens extends Rest
{
	function getDescription()
	{
		return "Lista as relações de itens da campanha.";
	}
	
	function getUrlParametersDescription()
	{
		return array("id da campanha");
	}
	
	function getRequestExample()
	{
		return array
		(
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"listasItens"=> array(
				array("id"=>"1","nome"=>"doações")
			)
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
			return ListarRelacoesItens::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				lista_itens.id, 
				lista_itens.nome
			from 
				campanha, 
				lista_itens
			where 
				campanha.id = lista_itens.id_campanha and 
				lista_itens.status = 'ativo' and
				campanha.id = '".$urlParameters[0]."'
			order by 
				lista_itens.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ListarRelacoesItens::errorResponse("Erro ao executar consulta no banco.");
		
		$listasItens = array();
		while($lista = mysqli_fetch_assoc($result))
			array_push($listasItens, $lista);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"listasItens"=>$listasItens
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
			"listasItens"=>""
		);
		return $responseJson;
	}
}
?>