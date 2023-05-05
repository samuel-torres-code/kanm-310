<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function createShow($show_name, $show_desc, $show_pic, $start_time, $end_time, $day_of_week) {
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

    $query = "INSERT INTO shows SET show_name={$show_name}, show_desc={$show_desc}, show_pic={$show_pic}, start_time={$start_time}, end_time={$end_time}, day_of_week={$day_of_week}";

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
$show_name = $data->show_name;
$show_desc = $data->show_desc;
$show_pic = $data->show_pic;
$start_time = $data->start_time;
$end_time = $data->end_time;
$day_of_week = $data->day_of_week;

// Call the updateUser function with the provided parameters
if(!empty($show_name) && !empty($show_desc) && !empty($show_pic) && !empty($start_time) && !empty($end_time) && !empty($day_of_week)) {
    createShow($show_name, $show_desc, $show_pic, $start_time, $end_time, $day_of_week);
}
?>