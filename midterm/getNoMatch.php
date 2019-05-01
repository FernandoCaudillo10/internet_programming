<?php
    
    include './getDB.php';
    
    
    session_start();

    $httpMethod = strtoupper($_SERVER['REQUEST_METHOD']);
    
    switch($httpMethod) {
      case "OPTIONS":
        onOptions();
        exit();
      case "GET":
        onGet();
        break;
      default:
        // TODO: Access-Control-Allow-Origin
        http_response_code(401);
        break;
    }
    
    function onOptions() {
      // Allows anyone to hit your API, not just this c9 domain
      header("Access-Control-Allow-Headers: X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, X-Requested-With, Content-Type, Content-Range, Content-Disposition, Content-Description");
      header("Access-Control-Allow-Methods: GET");
      header("Access-Control-Max-Age: 3600");
    }
    
    function onGet() {
      // Allow any client to access
      header("Access-Control-Allow-Origin: *");
      // Let the client know the format of the data being returned
      header("Content-Type: application/json");
    
      // TODO: do stuff to get the $results which is an associative array
      $results = array();
      
      $db = getDBconnection();
      $sql = "SELECT * FROM `user` u WHERE NOT EXISTS (SELECT * FROM `match` m WHERE m.match_user_id = u.id AND m.user_id = '1')";
      $stmt = $db->prepare($sql);
      $stmt->execute();
      $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
      // Sending back down as JSON
      echo json_encode($results);
    }


?>