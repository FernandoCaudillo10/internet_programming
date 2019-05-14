<?php
    require_once "./dbConnection.php";
    
    $conn = getDataBaseConnection("appointments");
    $sql = "INSERT INTO availableTimes (startTime, endTime) VALUES (:startTime, :endTime)";
    
    $stmt = $conn->prepare($sql);
    echo $_POST["start"], $_POST['end'];
    $stmt->execute(array(
            "startTime" => $_POST["start"],
            "endTime" => $_POST["end"],
        ));
?>