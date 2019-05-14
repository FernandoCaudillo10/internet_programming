<?php
    require_once "./dbConnection.php";
    
    $conn = getDataBaseConnection("appointments");
    $sql = "SELECT * FROM availableTimes WHERE startTime > NOW()";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($records);
    
?>