<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function deleteUser($user_id) {
  
  include_once './dbconfig.php';
  
  //SQL query
  $sql = "DELETE FROM users WHERE user_id = $user_id";
  
  // Execute the query
  if (mysqli_query($conn, $sql)) {
    echo "User deleted successfully";
  } else {
    echo "Error deleting user: " . mysqli_error($conn);
  }
  
  // Close the connection
  mysqli_close($conn);
  
}

$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id;

deleteUser($user_id);
?>
