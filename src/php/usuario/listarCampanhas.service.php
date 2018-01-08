<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class ListarCampanhasDoUsuario extends Rest
{
	function getDescription()
	{
		return "Lista as campanhas, indicando aquelas que estão relacionadas ao usuário.";
	}
	
	function getUrlParametersDescription()
	{
		return array("id do usuario");
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
			"campanhas"=> array(
				array("id"=>"1","nome"=>"campanha 1","relacionado"=>"true")
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
			return ListarCampanhasDoUsuario::errorResponse("Erro de acesso ao banco de dados.");

		$query = 
		"
			select
				campanha.id,
				campanha.nome, 
				campanha_usuario.id_usuario
			from 
				campanha
			left join  
				campanha_usuario
			on 
				campanha.id = campanha_usuario.id_campanha
				and campanha_usuario.id_usuario = '".$urlParameters[0]."'
			order by
				campanha.nome
		";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return ListarCampanhasDoUsuario::errorResponse("Erro ao executar consulta no banco.");
		
		$campanhas = array();
		while($campanha = mysqli_fetch_assoc($result))
		{
			if($campanha["id_usuario"]!=null)
				$campanha["relacionado"]="true";
			else
				$campanha["relacionado"]="false";
			unset($campanha["id_usuario"]);
			array_push($campanhas, $campanha);
		}
		
		$responseJson = 
		array
		(
			"type"=>"success",
			"msg"=>"",
			"campanhas"=>$campanhas
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
			"campanhas"=>array()
		);
		return $responseJson;
	}
}
?>