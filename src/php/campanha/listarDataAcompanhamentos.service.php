<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarDataAcompanhamentos extends Rest
{
	function getDescription()
	{
		return "Lista as datas em que ocorreram acompanhamento da campanha especificada.";
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
			"datas"=> array(
                array("data"=>"2018-01-02"),
                array("data"=>"2019-01-06")
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
			return ListarDataAcompanhamentos::errorResponse("Erro de acesso ao banco de dados.");

		$query =
		"
			select
				distinct(presenca.dt_frequencia) as data
			from
				presenca,
				lista_frequencia
			where
				presenca.id_lista = lista_frequencia.id
				and lista_frequencia.id_campanha = ".$urlParameters[0]."

			union

			select 
				distinct (contagem_itens.dt_atividade) as data
			from 
				contagem_itens, 
				item, 
				lista_itens
			where
				contagem_itens.id_item = item.id and
				item.id = lista_itens.id and
				lista_itens.id_campanha = ".$urlParameters[0]."

			order by 
			data desc
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ListarDataAcompanhamentos::errorResponse("Erro ao executar consulta no banco.");

		$datas = array();
		while($data = mysqli_fetch_assoc($result))
			array_push($datas, $data);

		$responseJson =
		array
		(
			"type"=>"success",
			"msg"=>"",
			"datas"=>$datas
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
			"datas"=>array()
		);
		return $responseJson;
	}
}
?>
