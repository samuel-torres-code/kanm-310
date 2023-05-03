<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function createUser($username, $password, $email, $first_name, $last_name) {
    include_once './dbconfig.php';

    // sanitize
    $username=htmlspecialchars(strip_tags($username));
    $password=htmlspecialchars(strip_tags($password));
    $email=htmlspecialchars(strip_tags($email));
    $first_name=htmlspecialchars(strip_tags($first_name));
    $last_name=htmlspecialchars(strip_tags($last_name));

    $query = "INSERT INTO users SET username='{$username}', password='{$password}', email='{$email}', first_name='{$first_name}', last_name='{$last_name}'";

    echo json_encode($query);
        
    // prepare query
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
$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$password = $data->password;
$username = $data->username;
// $user_id = $data->user_id;

// echo $username;
// Call the updateUser function with the provided parameters
if(!empty($first_name) && !empty($last_name) && !empty($username) && !empty($email) && !empty($password)){
    createUser($username, $password, $email, $first_name, $last_name);
}
?>
