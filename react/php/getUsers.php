<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

// This is a simple example of a PHP backend function that returns the current date and time
function getUsers() {
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

    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    $conn->close();
}
function getUserData($user_username,$user_password) {
  include_once './dbconfig.php';
  
  $sql = "SELECT * FROM users where username = '{$user_username}' and password = '{$user_password}';";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $rows = array();

    while ($r = mysqli_fetch_assoc($result)) {
      $rows[] = $r;
    }

    echo json_encode($rows[0]);
  } else {
    header("HTTP/1.0 404 Not Found");
    http_response_code(404);
    echo json_encode(array('error' => 'Invalid username or password.'));
  }

  $conn->close();
    
}



// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Check if the request is for the getCurrentDateTime function
  if ($_GET['function'] === 'getUsers') {
    // Call the function and return the result as a JSON object
    getUsers();
  }
  if ($_GET['function'] === 'getUserData') {
    // Call the function and return the result as a JSON object
    if($_GET['username'] and $_GET['password']) {
      getUserData($_GET['username'],$_GET['password']);
    }
    else {
      http_response_code(404);
      header("HTTP/1.0 404 Not Found");
      echo json_encode(array("error" => "No Username or Password Provided"));
    }
  }
}
?>
