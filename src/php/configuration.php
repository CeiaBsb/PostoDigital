<?php
require_once('./password.php');

if(!defined("CONFIGURATION"))
{
	//homologacao
	if($_SERVER['SERVER_NAME']=="ceia.eu3.org")
	{
		define("CONFIGURATION",true);

		//error_reporting(error_reporting() & (-1 ^ E_DEPRECATED));
		error_reporting(E_ERROR);

		define("ALLOW_CORS", true);
		define("CORS_ORIGIN", "http://ceia.eu3.org");

		define("DBSERVER","fdb19.freehostingeu.com");
		define("DBUSER","2568702_ceia");
		define("DBPASSWORD",PASSWORD);
		define("DATABASE","2568702_ceia");

		//a duração da seção em minutos
		define("EXPIRATION_TIME",60);
		
		define("CHECK_LOGIN",true);
		
		define("VALIDATE_REST_PARAMETERS",true);
		define("ALLOW_REST_HELP",true);
		
		define("BASE_URL","/api/api.php");
	}	
	//desenvolvimento
	else
	{
		define("CONFIGURATION",true);

		error_reporting(E_ALL);

		define("ALLOW_CORS", true);
		define("CORS_ORIGIN", "http://localhost:4200");

		define("DBSERVER","localhost");
		define("DBUSER","root");
		define("DBPASSWORD",PASSWORD);
		define("DATABASE","ceia");

		//a duração da seção em minutos
		define("EXPIRATION_TIME",60);
		
		define("CHECK_LOGIN",true);
		
		define("VALIDATE_REST_PARAMETERS",true);
		define("ALLOW_REST_HELP",true);
		
		define("BASE_URL","/scripts/ceiaApi/api.php");
	}	
}
?>