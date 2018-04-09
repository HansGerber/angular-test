<?php
    require_once "../../conf.php";
	
    $requestBody = json_decode(file_get_contents('php://input'));
	
    //var_dump($requestBody);die("".__LINE__);
	
    $action = @$_GET["action"];

    $response = array(
        "success" => false,
        "key" => "",
        "detail" => ""
    );
    
    $sql = $_global_conf["sql"];
    $db = $sql["db"];
    $c = new mysqli(
                    $sql["server"],
                    $sql["user"],
                    $sql["password"]
    );

    function checkUserLoginAndGetID($loginData){

        global $c, $db;
        $result = array("success" => false, "key" => "", "detail" => "");


                if($sqlRes = $c->query("select id from $db.users
                        where cid='" . $loginData->cid . "' and
                        password='" . md5($loginData->password) . "'")){

                        if($sqlRes->num_rows == 1){

                                $fetchedRes = $sqlRes->fetch_assoc();

                                $result["key"] = "OK";
                                $result["success"] = true;
                                $result["detail"] = $fetchedRes["id"];
                        } else {

                                $result["key"] = "UserNotFound";
                        }

                        $sqlRes->free_result();

                } else {

                        $result["key"] = "FetchFail";
                        $result["detail"] = $c->error;
                }

        return $result;
    }



    if(@$c->connection_error){

        $result["key"] = "ConnectionFail";
    } else {

            if($action){
                    switch($action){
                            case 'userInfo':

                            break;
                            default:
                                    $response["key"] = "invalidAction";
                                    $response["detail"] = $action;
                            break;
                    }
            } else {
                    $loginData = $requestBody;
                    $userCheckResult = checkUserLoginAndGetID($loginData);
                    
                    $response = $userCheckResult;
            }
    }
	
    echo json_encode($response);
?>
