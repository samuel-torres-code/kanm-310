<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function createShowHost($user_id, $show_id) {
  // Create a connection to the database
  $servername = "localhost";
  $uname = "root";
  $pword = "";
  $dbname = "kanm";
  // Create connection
  $conn = new mysqli($servername, $uname, $pword, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

    $query = "INSERT INTO show_hosts SET user_id='{$user_id}', show_id='{$show_id}'";

    echo json_encode($query);
        
    // prepare the query
    $stmt = $conn->prepare($query);

    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}

// get posted data
$data = json_decode(file_get_contents("php://input"));
// set product property values
$user_id = $data->user_id;
$show_id = $data->show_id;

// Call the updateUser function with the provided parameters
if(!empty($user_id) && !empty($show_id)) {
    createShowHost($user_id, $show_id);
}
?>
