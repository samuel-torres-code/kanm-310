<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

/* 
    Author: Charlotte Harrington
    Description: This is a backend API endpoint that takes a set of input user data, along with a fixed user_id, and updates the user identified by ID accordingly.
*/
function updateUser($user_id, $uname, $pword, $email, $first_name, $last_name) {
  include_once './dbconfig.php';

  $sql = "UPDATE users SET username='{$uname}', password='{$pword}', email='{$email}', first_name='{$first_name}', last_name='{$last_name}' WHERE user_id={$user_id}";

  echo json_encode($sql);
  $stmt = $conn->prepare($sql);
  $stmt->execute();
}

// get posted data
$data = json_decode(file_get_contents("php://input"));
// set product property values
$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$password = $data->password;
$username = $data->username;
$user_id = $data->user_id;

updateUser($user_id, $username, $password, $email, $first_name, $last_name);

?>
