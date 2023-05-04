<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

function deletePlay($set_id, $track_id) {
  
  include_once './dbconfig.php';
  
  //SQL query
  $sql = "DELETE FROM plays WHERE set_id = $set_id AND track_id = $track_id";
  
  // Execute the query
  if (mysqli_query($conn, $sql)) {
    echo "Play deleted successfully";
  } else {
    echo "Error deleting play: " . mysqli_error($conn);
  }
  
  // Close the connection
  mysqli_close($conn);
  
}

$data = json_decode(file_get_contents("php://input"));
$set_id = $data->set_id;
$track_id = $data->track_id;

deletePlay($set_id, $track_id);
?>
