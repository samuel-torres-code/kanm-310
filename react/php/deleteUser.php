<?php
  /* 
    Author: Charlotte Harrington
    Description: Creates an API endpoint that handles delete statements for the user table.
    
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function deleteUser($user_id) {
  
  include_once './dbconfig.php';

  $sql = "DELETE FROM users WHERE user_id = $user_id";
  echo $sql;
  if (mysqli_query($conn, $sql)) {
    echo "User deleted successfully";
  } else {
    echo "Error deleting user: " . mysqli_error($conn);
  }
  
  mysqli_close($conn);
  
}

$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id;

deleteUser($user_id);
?>
