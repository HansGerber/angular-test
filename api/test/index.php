<?php
    $request = json_decode(file_get_contents('php://input'));

    $response = array(
        "success" => false,
        "key" => "",
    );
    
    if($request){
        
        if(@$request->data && @$request->data->foo && $request->data->foo === "bar"){
            $response["success"] = true;
            $response["detail"] = "OK";
        }
    } else {
        
         $response["success"] = true;
    }
    
    echo json_encode($response);
?>
