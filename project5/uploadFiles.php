<?php 
// http://php.net/manual/en/features.file-upload.multiple.php
    
    include "./dbConnection.php";
    $db = getDataBaseConnection("picture_dump");

    $file_ary = reArrayFiles($_FILES['fileName']);

    foreach ($file_ary as $file) {
        if ($file["error"] > 0) {
          echo "Error: " . $file["error"] . "<br>";
        }
        else {
        $binaryData = file_get_contents($file["tmp_name"]);
        $sql = "INSERT INTO `file` (`fileName`, `fileType`, `fileData`) " .
                "  VALUES (:fileName, :fileType, :fileData) ";
                
        $stm=$db->prepare($sql);
        $stm->execute(array (":fileName"=>$file["name"],
                              ":fileType"=>$file["type"],
                              ":fileData"=>$binaryData));
        }  
    }
    
 

function reArrayFiles(&$file_post) {
    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }

    return $file_ary;
}
?>

