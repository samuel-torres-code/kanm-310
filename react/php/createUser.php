<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

/* 
    Author: Charlotte Harrington
    Description: This is a php backend function that takes user data as parameters to create a new user.
*/
function createUser($uname, $pword, $email, $first_name, $last_name) {
    include_once './dbconfig.php';

    // sanitize
    $uname=htmlspecialchars(strip_tags($uname));
    $pword=htmlspecialchars(strip_tags($pword));
    $email=htmlspecialchars(strip_tags($email));
    $first_name=htmlspecialchars(strip_tags($first_name));
    $last_name=htmlspecialchars(strip_tags($last_name));

    $query = "INSERT INTO users SET username='{$uname}', password='{$pword}', email='{$email}', first_name='{$first_name}', last_name='{$last_name}'";

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
$pword = $data->password;
$uname = $data->username;
// $user_id = $data->user_id;

// echo $username;
// Call the updateUser function with the provided parameters
if(!empty($first_name) && !empty($last_name) && !empty($uname) && !empty($email) && !empty($pword)){
    createUser($uname, $pword, $email, $first_name, $last_name);
}
?>
