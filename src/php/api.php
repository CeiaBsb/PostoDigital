<?php
require_once('./Rest.php');
require_once("./configuration.php");

if(ALLOW_CORS) 
{
	header("Access-Control-Allow-Origin: ".CORS_ORIGIN);
	header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, JWT, enctype");
	
	/*esse trecho é necessário porque para certas requisicoes o frontend as vezes
	manda duas request, sendo a primeira somente para verificar as permissoes.
	quando o header HTTP_ACCESS_CONTROL_REQUEST_HEADERS é passado, significa que o frontend
	está só verificando essas permissoes*/
	if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		exit;
}
Rest::setBaseUri(BASE_URL);

Rest::addRoute("POST","/login",'./login.service.php',"LoginService");
Rest::addRoute("GET","/campanha/listarMinhas",'./campanha/listarMinhasCampanhas.service.php',"ListarMinhasCampanhas");
Rest::addRoute("POST","/campanha/listar",'./campanha/listarCampanhas.service.php',"ListarCampanhas");
Rest::addRoute("GET","/campanha/detalhar",'./campanha/detalharCampanha.service.php',"DetalharCampanha");
Rest::addRoute("GET","/campanha/excluir",'./campanha/excluirCampanha.service.php',"ExcluirCampanha");
Rest::addRoute("POST","/campanha/atualizar",'./campanha/atualizarCampanha.service.php',"AtualizarCampanha");
Rest::addRoute("GET","/campanha/adicionar",'./campanha/adicionarCampanha.service.php',"AdicionarCampanha");
Rest::addRoute("POST","/usuario/listar",'./usuario/listar.service.php',"ListarUsuarios");
Rest::addRoute("GET","/usuario/detalhar",'./usuario/detalhar.service.php',"DetalharUsuario");
Rest::addRoute("GET","/usuario/excluir",'./usuario/excluir.service.php',"ExcluirUsuario");
Rest::addRoute("POST","/usuario/atualizar",'./usuario/atualizar.service.php',"AtualizarUsuario");
Rest::addRoute("GET","/usuario/adicionar",'./usuario/adicionar.service.php',"AdicionarUsuario");
Rest::addRoute("GET","/usuario/listarCampanhas",'./usuario/listarCampanhas.service.php',"ListarCampanhasDoUsuario");
Rest::addRoute("POST","/usuario/atualizarCampanhas",'./usuario/atualizarCampanhas.service.php',"AtualizarCampanhasDoUsuario");
Rest::addRoute("POST","/pessoa/listar",'./pessoa/listarPessoas.service.php',"ListarPessoas");
Rest::addRoute("GET","/pessoa/detalhar",'./pessoa/detalharPessoa.service.php',"DetalharPessoa");
Rest::addRoute("GET","/pessoa/excluir",'./pessoa/excluirPessoa.service.php',"ExcluirPessoa");
Rest::addRoute("POST","/pessoa/atualizar",'./pessoa/atualizarPessoa.service.php',"AtualizarPessoa");
Rest::addRoute("GET","/pessoa/adicionar",'./pessoa/adicionarPessoa.service.php',"AdicionarPessoa");
Rest::addRoute("GET","/pessoa/listarFolhasPresenca",'./pessoa/listarFolhasPresenca.service.php',"ListarFolhasPresencaDaPessoa");
Rest::addRoute("POST","/pessoa/atualizarFolhasPresenca",'./pessoa/atualizarFolhasPresenca.service.php',"AtualizarFolhasPresencaDaPessoa");
Rest::addRoute("POST","/frequencia/registrarPresenca",'./frequencia/registrarPresenca.service.php',"RegistrarPresenca");
Rest::addRoute("GET","/frequencia/listarFolhas",'./frequencia/listarFolhas.service.php',"ListarFolhas");
Rest::addRoute("POST","/frequencia/pessoasFrequencia",'./frequencia/listarPessoasDaListaFrequencia.service.php',"listarPessoasDaListaFrequencia");
Rest::addRoute("POST","/upload",'./upload.php',"Upload");
Rest::not_found();
?>
