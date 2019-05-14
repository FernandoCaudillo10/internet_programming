<?php
    require_once "./dbConnection.php";
    
    $conn = getDataBaseConnection("appointments");
    $sql = "DELETE FROM availableTimes WHERE startTime = :startTime AND endTime = :endTime;";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
            "startTime" => $_POST["start"],
            "endTime" => $_POST["end"],
        ));
?>