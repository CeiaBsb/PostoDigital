<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarItensParaMarcacao extends Rest
{
	function getDescription()
	{
		return "Lista os itens que estão relacionadao à relação de itens especificada.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id_relacao"=>"1",
			"data"=>"2018-01-20"
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"itens"=> array(
				array("id"=>"1","nome"=>"Maria","quantidade"=>"2")
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
			return ListarItensParaMarcacao::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				item.*,
				if(contagem_itens.quantidade is not null, contagem_itens.quantidade, 0) as quantidade
			from 
				item
			left join
				contagem_itens
			on 
				contagem_itens.id_item = item.id
				and contagem_itens.dt_atividade = '".$request["data"]."'
			where 
				item.id_lista = '".$request["id_relacao"]."'
			order by
				item.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ListarItensParaMarcacao::errorResponse("Erro ao executar consulta no banco.");
		
		$itens = array();
		while($item = mysqli_fetch_assoc($result))
			array_push($itens, $item);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"itens"=>$itens
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
			"itens"=>""
		);
		return $responseJson;
	}
}
?>