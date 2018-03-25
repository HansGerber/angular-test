<?php
    require_once "../../conf.php";

    $action = @$_GET["action"];
    
    $dbResult = null;

    $response = array(
        "success" => false,
        "key" => "OK",
        "detail" => ""
    );
    
    function getTicketCount($filter = ""){
        
        global $_global_conf;
        $result = array("success" => false, "key" => "", "detail" => "");
        
        $sql = $_global_conf["sql"];
	$db = $sql["db"];
	
	$c = new mysqli(
		$sql["server"],
		$sql["user"],
		$sql["password"]
	);
	
	if(@$c->connection_error){
            
            $result["key"] = "ConnectionFail";
	} else {
            
            if($res = $c->query("select count(*) as ticketCount from $db.tickets".($filter ? " where ".$filter : ""))){
                
                $result["success"] = true;
                $result["detail"] = $res->fetch_assoc();
                
                $res->free_result();
                
            } else {
                
                $result["key"] = "InsertionFail";
                $result["detail"] = $c->error;
            }
            
            $c->close();
        }
        
        return $result;
    }
    
    if($action){
        
        switch($action){
            case 'ticketCount':
                $dbResult = getTicketCount();
                
                $response["success"] = $dbResult["success"];
                $response["key"] = $dbResult["key"];
                $response["detail"] = $dbResult["detail"];
            break;
            
            default:
                
                $response["key"] = $dbResult["unknownAction"];
            break;
        }

        
    } else {
        
        $response["key"] = "noPostData";
    }
    
    echo json_encode($response);
?>
