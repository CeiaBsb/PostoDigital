<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarCampanhas extends Rest
{
	function getDescription()
	{
		return "Lista as campanhas cadastradas segundo os filtros informados.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"id"=>"1",
			"nome"=>"",
			"status"=> ""
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"campanhas"=> array(
				array("id"=>"1","nome"=>"campanha 1","status"=>"ativo")
			)
		);
	}
	
	function getRestrictions()
	{
		return "Usuário logado com perfil de administrador";
	}
	
	function call($request,$urlParameters) 
	{
		Auth::checkLogin("administrador");
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return Campanha::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select 
				campanha.* 
			from 
				campanha
			where 
				campanha.id>0 ".
				$this->filtro($request, "id", "campanha.id = '".$request["id"]."'"). 
				$this->filtro($request, "nome", "campanha.nome like '%".$request["nome"]."%'"). 
				$this->filtro($request, "status", "campanha.status = '".$request["status"]."'"). 
			" order by 
				campanha.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return Campanha::errorResponse("Erro ao executar consulta no banco.");
		
		$campanhas = array();
		while($campanha = mysqli_fetch_assoc($result))
			array_push($campanhas, $campanha);
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"campanhas"=>$campanhas
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
			"campanhas"=>array()
		);
		return $responseJson;
	}
}
?>