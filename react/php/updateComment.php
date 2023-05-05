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
    Description: This is a php backend function that updates a comment in the database by comment ID with new text.
*/
function updateComment($comment_id, $new_comment_text) {
  // Create a connection to the database
  include_once "./dbconfig.php";

    $new_comment_text = mysqli_real_escape_string($conn, $new_comment_text);

  // Update the row in the 'user' table
  $sql = "UPDATE comments SET comment_text='{$new_comment_text}' WHERE comment_id='{$comment_id}'";
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
    

    $comment_id = $data->comment_id;
    $new_comment_text = $data->new_comment_text;

    // Check if the request is for the updateShpw function
    if ($_GET['function'] === 'updateComment') {
      // Call the function to update show

      updateComment($comment_id, $new_comment_text);
    }
  }






?>
