<?php
require_once('./JWT/JWT.php');
require_once('./configuration.php');
require_once('./Rest.php');

use \Firebase\JWT\JWT;

class Auth
{
	
	private static $key = "chave_do_servidor";
		
	function login($request) 
	{
		if
		(
			!is_array($request) ||
			!isset($request["user"]) ||
			!isset($request["password"]) 
		)
			return Auth::errorResponse("Erro de login. As credenciais não foram informadas.");
		
		$connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
		if(!$connection)
			return Auth::errorResponse("Erro de acesso ao banco de dados.");

		$query = "select * from usuario where login='".$request["user"]."' and hash=md5('".$request["password"]."')";
		$result = mysqli_query($connection, $query);
		if(!$result)
			return Auth::errorResponse("Erro ao executar consulta no banco.");
		
		if($usuario = mysqli_fetch_assoc($result))
		{
			$token = array(
				"login" => $usuario["login"],
				"perfil" => $usuario["perfil"],
				"expiracao" => time()+(EXPIRATION_TIME*60)
			);
			$jwt = JWT::encode($token, Auth::$key);
	
			$responseJson = 
			array
			(
				"type"=>"success",
				"msg"=>"",
				"token"=>$jwt
			);
			return $responseJson;
		}
		else 
			return Auth::errorResponse("Erro de login. As credenciais são inválidas.");
		
	}
	
	static function checkLogin($perfil)
	{
		if(!CHECK_LOGIN)
			return;
		if(!isset($_SERVER['HTTP_JWT']))
			Auth::acessoNegado();
		try
		{
			$decoded = JWT::decode($_SERVER['HTTP_JWT'], Auth::$key, array('HS256'));
			$decoded_array = (array) $decoded;
			if(!isset($decoded_array['login']))
				Auth::acessoNegado();
			if(time()>$decoded_array['expiracao'])
				Auth::acessoNegado();
			if($perfil=="any")
				return;
			if($decoded_array['perfil']=="administrador")
				return;
			if($decoded_array['perfil']==$perfil)
				return;
			
			Auth::acessoNegado();
		}
		catch (Exception $e)
		{
			acessoNegado();
		}
	}
	
	static function getUserLogin()
	{
		if(!isset($_SERVER['HTTP_JWT']))
			return null;
		try
		{
			$decoded = JWT::decode($_SERVER['HTTP_JWT'], Auth::$key, array('HS256'));
			$decoded_array = (array) $decoded;
			if(!isset($decoded_array['login']))
				return null;
			else
				return $decoded_array['login'];
		}
		catch (Exception $e)
		{
			return null;
		}
	}
	
	static function acessoNegado()
	{
		header("HTTP/1.1 401 Unauthorized");
		exit;
	}
	
	static function errorResponse($message)
	{
		$responseJson = 
		array
		(
			"type"=>"error",
			"msg"=>$message,
			"token"=>""
		);
		return $responseJson;
	}
}
?>