<?php
    session_start();

    $httpMethod = strtoupper($_SERVER['REQUEST_METHOD']);
//    Codes: "getFifty", "halfPrice”  get 50% off           "sand30", "spring30”  get 30% off
  //         "beach", "sunny”         get 20% off
    $promoCodeList = array(
        "getFifty"=>50,"halfPrice"=>50,
        "sand30"=>30,"spring30"=>30,
        "beach"=>20,"sunny"=>20
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
        $results = $promoCodeList;
        
        // Sending back down as JSON
        echo json_encode($results);

        break;
    }
?>