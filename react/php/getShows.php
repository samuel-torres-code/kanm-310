<?php
  /* 
    Author: Samuel Torres, Liam Ramsay and Elijah Sanders
    Description: Creates an API endpoint that handles select statements for the shows and user_shows table
    
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function getShows() {
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

    $sql = "SELECT * FROM shows";
    $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    $conn->close();
}

function getShowData($id) {
  include_once './dbconfig.php';
  
  $sql = "SELECT * FROM shows where show_id = {$id}";
  $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows[0]);

    $conn->close();
    
}

function getExtendedShowData($id) {
  include_once './dbconfig.php';
  
  $sql = "SELECT * FROM user_show where show_id = {$id}";
  //echo json_encode($sql);
  $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    $conn->close();
    
}

function getShowDataFromUser($u_id) {
  include_once './dbconfig.php';
  
  $sql = "SELECT * FROM user_show where user_id = {$u_id}";
  $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows[0]);

    $conn->close();
    
}

function getHostUsersByShowId($show_id) {
  include_once './dbconfig.php';

  $sql = "SELECT * FROM show_hosts INNER JOIN users ON show_hosts.user_id = users.user_id WHERE show_hosts.show_id = {$show_id}";
  $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    $conn->close();
    
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Check if the request is for the getCurrentDateTime function
  if ($_GET['function'] === 'getShows') {
    // Call the function and return the result as a JSON object
    getShows();
  }

  if ($_GET['function'] === 'getShowData') {
    // Call the function and return the result as a JSON object
    if($_GET['id']) {
      getShowData($_GET['id']);
    }
    else {
      getShowData(-1);
    }
    
  }
  if ($_GET['function'] === 'getExtendedShowData') {
    // Call the function and return the result as a JSON object
    if($_GET['id']) {
      getExtendedShowData($_GET['id']);
    }
    else {
      getExtendedShowData(-1);
    }
    
  }
  if ($_GET['function'] === 'getShowDataFromUser') {
    // Call the function and return the result as a JSON object
    if($_GET['id']) {
      getShowDataFromUser($_GET['id']);
    }
    else {
      getShowDataFromUser(-1);
    }
    
  }
  if ($_GET['function'] === 'getHostUsersByShowId') {
    // Call the function and return the result as a JSON object
    if($_GET['id']) {
      getHostUsersByShowId($_GET['id']);
    }
    else {
      getHostUsersByShowId(-1);
    }
    
  }
}
?>
