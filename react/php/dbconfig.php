<?php
/* 
    Author: Samuel Torres
    Description: Database credentials. Assuming you are running MySQL
    server with default setting (user 'root' with no password)
    
*/
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "kanm";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>