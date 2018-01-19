<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarFolhasPresencaDaPessoa extends Rest
{
	function getDescription()
	{
		return "Lista as folhas de presença, indicando aquelas que estão relacionadas à pessoa.";
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
			"folhas"=> array(
				array("id"=>"1","nome"=>"Trabalhadores","campanha"=>"Campanha do Pão","relacionado"=>"true")
			)
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
			return ListarFolhasPresencaDaPessoa::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select
				lista_frequencia.id,
				lista_frequencia.nome,
				campanha.nome as campanha,
				lista_pessoa.id_pessoa
			from 
				lista_frequencia
			join 
				campanha
			on
				lista_frequencia.id_campanha = campanha.id
			left join  
				lista_pessoa
			on 
				lista_frequencia.id = lista_pessoa.id_lista
				and lista_pessoa.id_pessoa = '".$urlParameters[0]."'
			order by
				lista_frequencia.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ListarFolhasPresencaDaPessoa::errorResponse("Erro ao executar consulta no banco.");
		
		$folhas = array();
		while($folha = mysqli_fetch_assoc($result))
		{
			if($folha["id_pessoa"]!=null)
				$folha["relacionado"]="true";
			else
				$folha["relacionado"]="false";
			unset($folha["id_pessoa"]);
			array_push($folhas, $folha);
		}
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"folhas"=>$folhas
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
			"folhas"=>array()
		);
		return $responseJson;
	}
}
?>