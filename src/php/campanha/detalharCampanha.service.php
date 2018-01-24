<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class DetalharCampanha extends Rest
{
	function getDescription()
	{
		return "Obtém os detalhes de uma campanha específica.";
	}

	function getUrlParametersDescription()
	{
		return array("id da campanha");
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
			"campanha"=>array("id"=>"1","nome"=>"campanha 1","status"=>"ativo")
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
			return DetalharCampanha::errorResponse("Erro de acesso ao banco de dados.");

		$query =
		"
			select
				campanha.*
			from
				campanha
			where
				campanha.id = '".$urlParameters[0]."'
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return DetalharCampanha::errorResponse("Erro ao executar consulta no banco.");

		if($campanha = mysqli_fetch_assoc($result))
		{
			$responseJson =
			array
			(
				"type"=>"success",
				"msg"=>"",
				"campanha"=>$campanha
			);
			return $responseJson;
		}
		else
			return DetalharCampanha::errorResponse("Não existe campanha com o id informado.");
	}

	static function errorResponse($message)
	{
		$responseJson =
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"campanha"=>array("id"=>"","nome"=>"","status"=>"")
		);
		return $responseJson;
	}
}
?>
