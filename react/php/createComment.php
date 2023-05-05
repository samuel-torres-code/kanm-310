<?php
    // Author: Liam Ramsey
    // Description: Processes API Requests into insert statements for the comments table
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function getCurrentDateTime() {
    return date("Y-m-d H:i:s");
  }

function createComment($user_id, $show_id, $comment_text) {
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

    $date = getCurrentDateTime();

    $query = "INSERT INTO comments SET user_id='{$user_id}', show_id='{$show_id}', time_stamp='{$date}', comment_text='{$comment_text}'";

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
$comment_text = $data->comment_text;

// Call the updateUser function with the provided parameters
if(!empty($user_id) && !empty($show_id) && !empty($comment_text)) {
    createComment($user_id, $show_id, $comment_text);
}
?>
