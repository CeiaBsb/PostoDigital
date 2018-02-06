<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class DetalharItem extends Rest
{
	function getDescription()
	{
		return "Obtém os detalhes de um item específico.";
	}

	function getUrlParametersDescription()
	{
		return array("id do item");
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
			"item"=>array("id"=>"1","nome"=>"item 1","id_lista"=>"1")
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
			return DetalharItem::errorResponse("Erro de acesso ao banco de dados.");

		$query =
		"
			select
				item.*
			from
				item
			where
				item.id = '".$urlParameters[0]."'
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharItem::errorResponse("Erro ao executar consulta no banco.");

		if($item = mysqli_fetch_assoc($result))
		{
			$responseJson =
			array
			(
				"type"=>"success",
				"msg"=>"",
				"item"=>$item
			);
			return $responseJson;
		}
		else
			return DetalharItem::errorResponse("Não existe item com o id informado.");
	}

	static function errorResponse($message)
	{
		$responseJson =
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"item"=>array("id"=>"","nome"=>"","id_lista"=>"")
		);
		return $responseJson;
	}
}
?>
