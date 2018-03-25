<?php
    require_once "../../conf.php";

    $request = json_decode(file_get_contents('php://input'));

    $response = array(
        "success" => false,
        "key" => "",
        "detail" => ""
    );
    
    function saveContactData($contactData){
        
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
            
            if($c->query("insert into $db.contact values (
                '',
                '".$c->real_escape_string($contactData->name)."',
                '".$c->real_escape_string($contactData->email)."',
                '".$c->real_escape_string($contactData->message)."',
                '".date("yyyy-mm-dd H:i:s")."'
            )")){
                
                $result["success"] = true;
            } else {
                
                $result["key"] = "InsertionFail";
                $result["detail"] = $c->error;
            }
            
            $c->close();
        }
        
        return $result;
    }
    
    function getContactDataValidationErrors($data){
        
        $result = array ();
        
        if(!(@$data->name && strlen($data->name) >= 2 && strlen($data->name) <= 255)){
            $result []= "invalidName";
        }
        
        if(!(@$data->email && filter_var($data->email, FILTER_VALIDATE_EMAIL))){
            $result []= "invalidEmail";
        }
        
        if(!(@$data->message && strlen($data->message) >= 5 && strlen($data->message) <= 255)){
            $result []= "invalidMessage";
        }
        
        return $result;
    }
    
    if(@$request->data){
        
        $contactDataValidationErrors = getContactDataValidationErrors($request->data);
        
        if(
            count($contactDataValidationErrors) === 0
        ){
            $dbResult = saveContactData($request->data);
            
            if($dbResult["success"] == true){
                $response["success"] = true;
            } else {
                $response["key"] = $dbResult["key"];
                $response["detail"] = $dbResult["detail"];
            }
            
        } else {
            
            $response["key"] = "";
            $response["detail"] = $contactDataValidationErrors;
        }
    } else {
        
        $response["key"] = "noPostData";
    }
    
    echo json_encode($response);
?>
