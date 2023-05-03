<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function updateShow($show_id,
$show_name,
$show_desc,
$show_pic,
$start_time,
$end_time,
$day_of_week) {
  // Create a connection to the database
  include_once "./dbconfig.php";

    $show_id = mysqli_real_escape_string($conn, $show_id);
    $show_name = mysqli_real_escape_string($conn, $show_name );
    $show_desc = mysqli_real_escape_string($conn, $show_desc);
    $show_pic = mysqli_real_escape_string($conn, $show_pic);
    $start_time = mysqli_real_escape_string($conn, $start_time);
    $end_time = mysqli_real_escape_string($conn, $end_time);
    $day_of_week = mysqli_real_escape_string($conn, $day_of_week );

  // Update the row in the 'user' table
  $sql = "UPDATE shows SET show_name='{$show_name}', show_desc='{$show_desc}', show_pic='{$show_pic}', start_time='{$start_time}', end_time='{$end_time}', day_of_week ={$day_of_week} WHERE show_id={$show_id}";
  // echo $sql; 




  if ($conn->query($sql) === TRUE) {
    // Get the number of rows affected by the query
    $num_rows_affected = mysqli_affected_rows($conn);
    echo "Query executed successfully. $num_rows_affected rows affected.";
} else {
    echo "Error executing query: " . $conn->error;
}
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    // set product property values
    

    $show_id = $data->show_id;
    $show_name = $data->show_name;
    $show_desc = $data->show_desc;
    $show_pic = $data->show_pic;
    $start_time = $data->start_time;
    $end_time = $data->end_time;
    $day_of_week = $data->day_of_week;

    // Check if the request is for the updateShpw function
    if ($_GET['function'] === 'updateShow') {
      // Call the function to update show

      updateShow($show_id,
      $show_name,
      $show_desc,
      $show_pic,
      $start_time,
      $end_time,
      $day_of_week);
    }
  }






?>
