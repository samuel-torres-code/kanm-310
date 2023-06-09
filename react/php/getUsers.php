<?php
/* 
  Author: Charlotte Harrington and Elijah Sanders
  Description: Creates an API endpoint that handles various select statements for the users table
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 
/* 
    Author: Charlotte Harrington
    Description: This is a backend function that returns every row in the 'members' view, which is comprised of data for all users, along with show information for users that have shows (DJs)
*/
function getUsers() {
    include_once './dbconfig.php';

    $sql = "SELECT * FROM members";
    $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    $conn->close();
}

function getUserData($user_username, $user_password) {
  include_once './dbconfig.php';
  
  $sql = "SELECT * FROM members where username = '{$user_username}' and password = '{$user_password}';";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $rows = array();

    while ($r = mysqli_fetch_assoc($result)) {
      $rows[] = $r;
    }

    echo json_encode($rows[0]);
  } else {
    header("HTTP/1.0 404 Not Found");
    http_response_code(404);
    echo json_encode(array('error' => 'Invalid username or password.'));
  }

  $conn->close();
    
}


/* 
    Author: Charlotte Harrington
    Description: This is a backend function that returns a particular user based on the user_id provided.
*/
function getUserDataID($user_id) {
  include_once './dbconfig.php';
  
  $sql = "SELECT * FROM users where user_id = '{$user_id}';";
  // echo $sql;
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $rows = array();

    while ($r = mysqli_fetch_assoc($result)) {
      $rows[] = $r;
    }

    echo json_encode($rows[0]);
  } else {
    header("HTTP/1.0 404 Not Found");
    http_response_code(404);
    echo json_encode(array('error' => 'User not found.'));
  }

  $conn->close();
    
}

function getUsersNotHostingShow($show_id) {
  include_once './dbconfig.php';

  $sql = "SELECT * FROM users WHERE NOT EXISTS (SELECT users.user_id FROM show_hosts WHERE users.user_id = show_hosts.user_id AND show_hosts.show_id = $show_id)";
  $result = $conn->query($sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    $conn->close();
    
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if ($_GET['function'] === 'getUsers') {
    getUsers();
  }
  if ($_GET['function'] === 'getUserDataID') {
    getUserDataID($_GET['id']);
  }
  if ($_GET['function'] === 'getUsersNotHostingShow') {
    getUsersNotHostingShow($_GET['id']);
  }
  if ($_GET['function'] === 'getUserData') {
    if($_GET['username'] and $_GET['password']) {
      getUserData($_GET['username'],$_GET['password']);
    }
    else {
      http_response_code(404);
      header("HTTP/1.0 404 Not Found");
      echo json_encode(array("error" => "No Username or Password Provided"));
    }
  }
}
?>
