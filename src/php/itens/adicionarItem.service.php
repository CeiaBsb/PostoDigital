<?php
require_once('./configuration.php');
require_once('./Auth.php');
require_once('./Rest.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class AdicionarItem extends Rest
{
    public function getDescription()
    {
        return "Adiciona um novo item na relação de itens especificada e o retorna.";
    }

    public function getUrlParametersDescription()
    {
        return array("id da relação de itens");
    }

    public function getRequestExample()
    {
        return array();
    }

    public function getResponseExample()
    {
        return array
        (
            "type"=>"success",
            "msg"=>"",
            "item"=>array("id"=>"1","nome"=>"Novo Item","id_lista"=>"1")
        );
    }

    public function getRestrictions()
    {
        return "Usuário logado com qualquer perfil";
    }

    public function call($request, $urlParameters)
    {
        Auth::checkLogin("any");

        $connection = mysqli_connect(DBSERVER, DBUSER, DBPASSWORD, DATABASE);
        if (!$connection) {
            return AdicionarItem::errorResponse("Erro de acesso ao banco de dados.");
        }


        $query =
        "
            insert into
                item
                (nome, id_lista)
            values
                ('Novo Item', '".$urlParameters[0]."')
        ";
        $result = mysqli_query($connection, $query);
        if (!$result) {
            return AdicionarItem::errorResponse("Erro ao adicionar o Item no banco.");
        } else {
            $id = mysqli_insert_id($connection);
            $query =
            "
                select 
                    item.*
                from 
                    item
                where
                    item.id = '".$id."'
            ";
            $result = mysqli_query($connection, $query);
            if (!$result) {
                return AdicionarItem::errorResponse("Erro ao executar consulta no banco.");
            }

            if ($item = mysqli_fetch_assoc($result)) {
                $responseJson =
                array
                (
                    "type"=>"success",
                    "msg"=>"",
                    "item"=>$item
                );
                return $responseJson;
            } else {
                return AdicionarItem::errorResponse("Não foi possível recuperar o item criado.");
            }
        }
    }

    public static function errorResponse($message)
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
