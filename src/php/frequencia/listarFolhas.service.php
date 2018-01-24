<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarFolhas extends Rest
{
	function getDescription()
	{
		return "Lista as folhas de frequência, doações e atividades da campanha.";
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
			"listasFrequencia"=> array(
				array("id"=>"1","nome"=>"trabalhadores")
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
			return ListarFolhas::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				lista_frequencia.id, 
				lista_frequencia.nome
			from 
				campanha, 
				lista_frequencia
			where 
				campanha.id = lista_frequencia.id_campanha and 
				lista_frequencia.status = 'ativo' and
				campanha.id = '".$urlParameters[0]."'
			order by 
				lista_frequencia.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ListarFolhas::errorResponse("Erro ao executar consulta no banco.");
		
		$listasFrequencia = array();
		while($lista = mysqli_fetch_assoc($result))
			array_push($listasFrequencia, $lista);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"listasFrequencia"=>$listasFrequencia
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