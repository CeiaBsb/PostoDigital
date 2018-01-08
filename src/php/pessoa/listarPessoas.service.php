<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarPessoas extends Rest
{
	function getDescription()
	{
		return "Lista as pessoas cadastradas segundo os filtros informados. Os campos de nome aceitam busca por parte do nome. Os campos 'atualizado' e 'tem_foto' aceitam os valores 'true' ou 'false'.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id"=>"3",
			"nome"=>"jose",
			"nome_mae"=> "maria",
			"atualizado"=> "true",
			"tem_foto"=> "false"
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"pessoas"=> array(
				array("id"=>"1","nome"=>"pessoa 1","dt_nascimento"=>"2018-02-03","nome_mae"=>"maria","atualizado"=>"true","tem_foto"=>"true")
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
			return Pessoa::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				pessoa.* 
			from 
				pessoa
			where 
				pessoa.id>0 ".
				$this->filtro($request, "id", "pessoa.id = '".$request["id"]."'"). 
				$this->filtro($request, "nome", "pessoa.nome like '%".$request["nome"]."%'").
				$this->filtro($request, "nome_mae", "pessoa.nome_mae like '%".$request["nome_mae"]."%'"). 
				$this->filtro($request, "atualizado", "pessoa.atualizado = '".$request["atualizado"]."'"). 
				$this->filtro($request, "tem_foto", "pessoa.tem_foto = '".$request["tem_foto"]."'"). 
			" order by 
				pessoa.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return Pessoa::errorResponse("Erro ao executar consulta no banco.");
		
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
	
	function filtro($parametros, $parametro, $filtro)
	{
		if($parametros[$parametro]!="")
			return " and ".$filtro." ";
		else
			return "";
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"pessoas"=>array()
		);
		return $responseJson;
	}
}
?>