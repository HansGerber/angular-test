<?php
    require_once "../../conf.php";

    $request = json_decode(file_get_contents('php://input'));
	
    //var_dump($request);die("".__LINE__);
	
    $dbResult = null;

    $response = array(
        "success" => false,
        "key" => "",
        "detail" => ""
    );
    
    function getUserData($loginData){
        
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
            
            if($sqlRes = $c->query("select count(*) as count from $db.users
                where cid='" . $loginData->cid . "' and
                password='" . md5($loginData->password) . "'")){
                
                $fetchedRes = $sqlRes->fetch_assoc();
                
                if($fetchedRes["count"] == 1){
                    $result["key"] = "OK";
                    $result["success"] = true;
                } else {
                    $result["key"] = "UserNotFound";
                }
                
                $sqlRes->free_result();
                
            } else {
                
                $result["key"] = "FetchFail";
                $result["detail"] = $c->error;
            }
            
            $c->close();
        }
        
        return $result;
    }
	
    $validationResult = getUserData($request);
    
    $response = $validationResult;
    
    echo json_encode($response);
?>
