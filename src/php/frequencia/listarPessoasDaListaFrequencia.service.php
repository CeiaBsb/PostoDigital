<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class listarPessoasDaListaFrequencia extends Rest
{
	function getDescription()
	{
		return "Lista as pessoas que estão relacionadas à folha de frequência especificada.";
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
			"data"=>"2018-01-20"
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"pessoas"=> array(
				array("id"=>"1","nome"=>"Maria","dt_nascimento"=>"2018-02-03","nome_mae"=>"maria","atualizado"=>"true","tem_foto"=>"true","presente"=>"true")
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
			return listarPessoasDaListaFrequencia::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select
				pessoa.*,
				if(presenca.id_pessoa is not null, 'true', 'false') as presente
			from 
				pessoa
			join
				lista_pessoa
			on 
				lista_pessoa.id_pessoa = pessoa.id
				and lista_pessoa.id_lista = '".$request["id_folha"]."'
			left join      
				presenca
			on
				presenca.id_lista = lista_pessoa.id_lista
				and presenca.id_pessoa = pessoa.id
				and presenca.dt_frequencia = '".$request["data"]."'
			order by
				pessoa.nome	
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return listarPessoasDaListaFrequencia::errorResponse("Erro ao executar consulta no banco.");
		
		$pessoas = array();
		while($pessoa = mysqli_fetch_assoc($result))
			array_push($pessoas, $pessoa);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"pessoas"=>$pessoas
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
			"pessoas"=>""
		);
		return $responseJson;
	}
}
?>