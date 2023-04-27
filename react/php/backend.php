<?php
// This is a simple example of a PHP backend function that returns the current date and time
function getCurrentDateTime() {
  return date("Y-m-d H:i:s");
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Check if the request is for the getCurrentDateTime function
  if ($_GET['function'] === 'getCurrentDateTime') {
    // Call the function and return the result as a JSON object
    $response = array('dateTime' => getCurrentDateTime());
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow cross-origin requests from any domain
    echo json_encode($response);
  }
}
?>
