<?php
    include "getData.php";
    
    //session_start();

    $dbCon = getDataBaseConnection("practice7");
    $sql = "SELECT productId, productName FROM mp_product";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($records);
    /*
    $httpMethod = strtoupper($_SERVER['REQUEST_METHOD']);
    
    $randomList = array(
        array("product"=>"Microfiber Beach Towel", "price"=>"40", "qty"=>"2"),
        array("product"=>"Flip-flop Sandals", "price"=>"30", "qty"=>"5"),
        array("product"=>"Sunscreen 80SPF", "price"=>"25", "qty"=>"3"),
        array("product"=>"Plastic Flying Disc", "price"=>"15", "qty"=>"4"),
        array("product"=>"Beach Umbrella", "price"=>"75", "qty"=>"1"),
        );

    switch($httpMethod) {
      case "OPTIONS":
        // Allows anyone to hit your API, not just this c9 domain
        header("Access-Control-Allow-Headers: X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, X-Requested-With, Content-Type, Content-Range, Content-Disposition, Content-Description");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Max-Age: 3600");
        exit();
      case "GET":
        // Allow any client to access
        header("Access-Control-Allow-Origin: *");
        // Let the client know the format of the data being returned
        header("Content-Type: application/json");

        // TODO: do stuff to get the $results which is an associative array
        $results = $randomList[rand(0,count($randomList))];
        
        // Sending back down as JSON
        echo json_encode($results);

        break;
    }*/
?>