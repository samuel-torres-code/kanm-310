<?php
  /* 
    Author: 
    Description: Creates an API endpoint that handles <> statements for the <> table
    
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 
/*
    Author: Liam Ramsey
    Description: This is a php backend function that deletes a comment in the database by comment ID.
*/
function deleteComment($comment_id) {
  
  include_once './dbconfig.php';
  
  //SQL query
  $sql = "DELETE FROM comments WHERE comment_id = $comment_id";
  
  // Execute the query
  if (mysqli_query($conn, $sql)) {
    echo "Comment deleted successfully";
  } else {
    echo "Error deleting Comment: " . mysqli_error($conn);
  }
  
  // Close the connection
  mysqli_close($conn);
  
}

$data = json_decode(file_get_contents("php://input"));
$comment_id = $data->comment_id;

deleteComment($comment_id);
?>
