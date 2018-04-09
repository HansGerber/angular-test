<?php
    require_once "../../conf.php";

    $action = @$_GET["action"];
    
    $dbResult = null;

    $response = array(
        "success" => false,
        "key" => "OK",
        "detail" => ""
    );
    
    $sql = $_global_conf["sql"];
    $db = $sql["db"];
    $c = new mysqli(
                    $sql["server"],
                    $sql["user"],
                    $sql["password"]
    );
    
    function getTicketCount($filter = ""){
        global $c, $db;
        $result = array("success" => false, "key" => "", "detail" => "");
            
        if($res = $c->query("select count(*) as ticketCount from $db.tickets".($filter ? " where ".$filter : ""))){

            $result["success"] = true;
            $result["detail"] = $res->fetch_assoc();

            $res->free_result();

        } else {

            $result["key"] = "InsertionFail";
            $result["detail"] = $c->error;
        }
        
        return $result;
    }
    
    if(@$c->connection_error){
            
            $result["key"] = "ConnectionFail";
    } else {
    
        if($action){

            switch($action){
                case 'ticketCount':
                    $dbResult = getTicketCount();

                    $response = $dbResult;
                break;

                default:

                    $response["key"] = $dbResult["unknownAction"];
                break;
            }


        } else {

            $response["key"] = "noPostData";
        }
        
        $c->close();
    }
    
    echo json_encode($response);
?>
