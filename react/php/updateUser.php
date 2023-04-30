<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function updateUser($user_id, $username, $password, $email, $first_name, $last_name) {
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

  // Update the row in the 'user' table
  $sql = "UPDATE users SET username='{$username}', password='{$password}', email='{$email}', first_name='{$first_name}', last_name='{$last_name}' WHERE user_id={$user_id}";

  echo json_encode($sql);
  $stmt = $conn->prepare($sql);
  $stmt->execute();

  // Check if the update was successful
//   if ($stmt->rowCount() > 0) {
//     echo "User with ID $user_id has been updated successfully";
//   } else {
//     echo "Failed to update user with ID $user_id";
//   }
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


// Call the updateUser function with the provided parameters
updateUser($user_id, $username, $password, $email, $first_name, $last_name);

?>
