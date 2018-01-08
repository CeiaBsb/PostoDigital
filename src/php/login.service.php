<?php
require_once('./JWT/JWT.php');
require_once('./configuration.php');
require_once('./Rest.php');
require_once('./Auth.php');

use \Firebase\JWT\JWT;

class loginService extends Rest
{
	
	function getDescription()
	{
		return "Realiza o login no sistema, retornando um token jwt.";
	}
	
	function getUrlParametersDescription()
	{
		return array();
	}
	
	function getRequestExample()
	{
		return array
		(
			"user"=>"rodrigo",
			"password"=>"123456"
		);
	}
	
	function getResponseExample()
	{
		return array
		(
			"type"=>"success",
			"msg"=>"",
			"token"=>"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InJvZHJpZ28iLCJwZXJmaWwiOiJhZG1pbmlzdHJhZG9yIiwiZXhwaXJhY2FvIjoxNTEzODY3NjY0fQ.OeikTjVY6qj3DElFsyQFlGYbvdmoJ4TAhs_TPc8_jH8"
		);
	}
	
	function getRestrictions()
	{
		return "Sem restrições";
	}
	
	function call($request,$urlParameters) 
	{
		$auth = new Auth();
		return $auth->login($request);
	}
}
?>