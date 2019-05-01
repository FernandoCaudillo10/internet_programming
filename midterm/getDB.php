<?php
    
    function getDBconnection(){
        $host = 'localhost';
        $dbname = 'cinder';
        $username = 'leeon10';
        $password = '';
        
        $dbConn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return $dbConn;
    }
?>