<?php 
require_once('./configuration.php');

abstract class Rest
{
	var $requestMethod;
	var $serviceName;
	static $baseUri;
	static $headerSent = false;
	static $helpRequest = false;
	
	function init()
	{
		$stringJson = file_get_contents('php://input'); 
		$request = (array)json_decode($stringJson); 
		if (json_last_error() === JSON_ERROR_NONE) 
		{ 		
			$urlParameters = $this->extractUrlParameters();
			if(VALIDATE_REST_PARAMETERS)
			{
				if (!$this->array_diff_key_recursive($this->getRequestExample(),$request))
				{
					$descricao = "Parâmetros JSON de entrada não seguem o padrão esperado";
					$modelo = json_encode($this->getRequestExample());
					$entrada = json_encode($request);
					$this->print_help($descricao, $modelo, $entrada);
					return true;
				}
				if (!$this->validadeUrlParameters($urlParameters))
				{
					$descricao = "Parâmetros de entrada na URL não seguem o padrão esperado";
					$modelo = "Total de ".sizeof($this->getUrlParametersDescription())." parâmetros";
					$entrada = "Total de ".sizeof($urlParameters)." parâmetros";
					$this->print_help($descricao, $modelo, $entrada);
					return true;
				}
			}
			header('Content-Type: application/json;charset=utf-8');
			$response = $this->call($request,$urlParameters);
			if(VALIDATE_REST_PARAMETERS)
				if(!$this->array_diff_key_recursive($this->getResponseExample(),$response))
				{
					$descricao = "Parâmetros de saída não seguem o padrão esperado";
					$modelo = json_encode($this->getResponseExample());
					$entrada = json_encode($response);
					$this->print_help($descricao, $modelo, $entrada);
					return true;
				}
			echo json_encode($response);
			exit;			
		} else { 
			$this->print_help(null, null, null);
		} 
	}
	
	static function setBaseUri($uri)
	{
		Rest::$baseUri = $uri;
	}
	
	abstract function call($request,$urlParameters);
	
	abstract function getDescription();
	
	abstract function getUrlParametersDescription();
	
	abstract function getRequestExample();
	
	abstract function getResponseExample();
	
	abstract function getRestrictions();
	
	function array_diff_key_recursive($modelo, $teste)
	{
		foreach ($modelo as $key => $value)
		{
			if(is_int($key) && !isset($teste[$key]))
				continue;
			//if(!isset($teste[$key]))
			if(!array_key_exists($key, $teste))
				return false;
			if(is_array($modelo[$key]))
			{
				if(!is_array($teste[$key]))
					return false;
				if(!$this->array_diff_key_recursive($modelo[$key], $teste[$key]))
					return false;
			}
		}
		return true;
	}
	
	function extractUrlParameters()
	{
		$parameterString = substr($_SERVER["REQUEST_URI"],strlen(Rest::$baseUri)+strlen($this->serviceName));
		if(substr($parameterString,0,1)=="/")
			$parameterString = substr($parameterString,1);
		if(substr($parameterString,strlen($parameterString)-1,1)=="/")
			$parameterString = substr($parameterString,0,strlen($parameterString)-1);
		if(strlen($parameterString)==0)
			return array();
		return explode("/", $parameterString);
	}
	
	function validadeUrlParameters($parametros)
	{		
		if(sizeof($this->getUrlParametersDescription())!=(sizeof($parametros)))
			return false;
		else
			return true;
	}
	
	static function addRoute($requestMethod, $serviceName, $definitionFile, $className)
	{
		if(strpos($_SERVER["REQUEST_URI"],Rest::$baseUri)!==0)
			return;

		$strlenBaseUri = strlen(Rest::$baseUri);
		if(strpos($_SERVER["REQUEST_URI"],"/help",$strlenBaseUri)==$strlenBaseUri)
		{
			Rest::$helpRequest = true;
			$objInstance = Rest::getServiceInstance($requestMethod,$serviceName,$definitionFile, $className);
			call_user_func(array($objInstance,"print_help"), null, null, null);
			return;
		}	
		
		$strlenServiceName = strlen($serviceName);
		if(strpos($_SERVER["REQUEST_URI"],$serviceName,$strlenBaseUri)==$strlenBaseUri)
			if(
				(strlen($_SERVER["REQUEST_URI"])==$strlenBaseUri+$strlenServiceName) ||
				(substr($_SERVER["REQUEST_URI"],$strlenBaseUri+$strlenServiceName,1)=="/")
			)
			{
				$objInstance = Rest::getServiceInstance($requestMethod,$serviceName, $definitionFile, $className);
				
				if(strpos($_SERVER["REQUEST_URI"],"/help",$strlenBaseUri+$strlenServiceName)==$strlenBaseUri+$strlenServiceName)
				{
					Rest::$helpRequest = true;
					$objInstance = Rest::getServiceInstance($requestMethod,$serviceName,$definitionFile, $className);
					call_user_func(array($objInstance,"print_help"), null, null, null);
					return;
				}				
				
				if ($_SERVER['REQUEST_METHOD'] !== $requestMethod)
					return;	
		
				call_user_func(array($objInstance,"init"), null, null, null);
			}
	}
	
	static function getServiceInstance($requestMethod,$serviceName, $definitionFile, $className)
	{
		require_once($definitionFile);
		$r = new ReflectionClass($className);
		$objInstance = $r->newInstanceArgs(array());
		$objInstance->requestMethod = $requestMethod;
		$objInstance->serviceName = $serviceName;
		return $objInstance;
	}
	
	function print_help($descricao, $modelo, $recebido)
	{
		if(!ALLOW_REST_HELP)
			return;
		if(!Rest::$headerSent)
		{
			Rest::$headerSent = true;
			header('Content-Type: text/html;charset=utf-8');
		}
		echo "<strong>".$this->serviceName."</strong><br />\n";
		echo "Descricao:".$this->getDescription()."<br />\n";
		echo "Parametros de URL:<br />\n";
		$i = 0;
		foreach($this->getUrlParametersDescription() as $parametro)
		{
			$i++;
			echo "* ".$i." - ".$parametro."<br />\n";
		}
		echo "Restricoes:".$this->getRestrictions()."<br />\n";
		echo "Metodo de requisicao:".$this->requestMethod."<br />\n";
		echo "Modelo de requisicao:".json_encode($this->getRequestExample())."<br />\n";
		echo "Modelo de resposta:".json_encode($this->getResponseExample())."<br />\n";
		echo "<br />\n<br />\n";
		if($descricao!=null)
		{
			echo "Situação de erro:".$descricao."<br />\n";
			echo "Modelo esperado:".$modelo."<br />\n";
			echo "Parâmetros recebidos:".$recebido."<br />\n";
			exit;
		}
	}
	
	static function not_found()
	{
		if(!ALLOW_REST_HELP)
			return;
		if(Rest::$helpRequest == true)
			return;

		Rest::$headerSent = true;
		header('Content-Type: text/html;charset=utf-8');
		echo "<strong>Serviço não encontrado</strong><br />\n";
		echo "Se você está vendo esta mensagem, é porque chamou um serviço inexistente nessa API.<br />\n";
		echo "Verifique se todos os parâmetros do serviço pretendido estão corretos, como, por exemplo, o método de chamada (POST, GET, etc) e o nome do serviço.<br />\n";
		echo "Verifique ainda se os parâmetros de chamada do serviço (no JSON ou na URL) estão corretos.<br />\n";
		echo "Se ainda estiver em dúvida, consulte o help da API em ".BASE_URL."/help";		
	}
}
?>