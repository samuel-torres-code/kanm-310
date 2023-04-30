<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

// This is a simple example of a PHP backend function that returns the current date and time
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
}
?>
