<?php
  /* 
    Author: 
    Description: Creates an API endpoint that handles <> statements for the <> table
    
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function getComments($input) {
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

    $sql = "SELECT * FROM user_comments WHERE show_id = $input";
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
    // Check if the function parameter is set and is a string
    if (isset($_GET['function']) && is_string($_GET['function'])) {
      // Retrieve the value of the function parameter
      $function = filter_input(INPUT_GET, 'function', FILTER_SANITIZE_STRING);
      
      // Call the appropriate function based on the value of the function parameter
      if ($function === 'getComments') {
        // Call the getComments() function and return the result as a JSON object
        if (isset($_GET['input'])) {
          $input = filter_input(INPUT_GET, 'input', FILTER_SANITIZE_NUMBER_INT);
          getComments($input);
        } else {
          echo json_encode(array('error' => 'Missing input parameter'));
        }
      } else {
        echo json_encode(array('error' => 'Unknown function'));
      }
    } else {
      echo json_encode(array('error' => 'Missing function parameter'));
    }
  }
?>
