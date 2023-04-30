<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function updateUser($user_id, $username, $password, $email, $first_name, $last_name) {
  // Create a connection to the database
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

  // Update the row in the 'user' table
  $sql = "UPDATE user SET username=:username, password=:password, email=:email, first_name=:first_name, last_name=:last_name WHERE user_id=:user_id";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':username', $username);
  $stmt->bindParam(':password', $password);
  $stmt->bindParam(':email', $email);
  $stmt->bindParam(':first_name', $first_name);
  $stmt->bindParam(':last_name', $last_name);
  $stmt->bindParam(':user_id', $user_id);
  $stmt->execute();

  // Check if the update was successful
  if ($stmt->rowCount() > 0) {
    echo "User with ID $user_id has been updated successfully";
  } else {
    echo "Failed to update user with ID $user_id";
  }
}

// Retrieve the user_id and other parameters from the request
$user_id = $_POST['user_id'];
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];

// Call the updateUser function with the provided parameters
updateUser($user_id, $username, $password, $email, $first_name, $last_name);

?>
