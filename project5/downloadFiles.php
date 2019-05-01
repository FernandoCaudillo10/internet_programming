<?php
    include "./dbConnection.php";
    $db = getDataBaseConnection("picture_dump");
    
    $sql = "SELECT * FROM `file`"; 
    $stmt = $db->prepare($sql);
    $stmt->execute();
    
    $stmt->bindColumn('fileData', $data, PDO::PARAM_LOB);
    $record = $stmt->fetch(PDO::FETCH_BOUND);
    
    if (!empty($record)){
       //specifies the mime type
       header('Content-Type:' . $record['fileType']);   
       header('Content-Disposition: inline;');
       echo $data; 
     } 

?>