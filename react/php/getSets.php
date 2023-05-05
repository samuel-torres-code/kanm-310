<?php
  /* 
    Author: Samuel Torres
    Description: Creates an API endpoint that handles select statements for the set_info view
    
*/
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    function getSetsByShowID($id) {
        include_once './dbconfig.php';
  
        $sql = "SELECT * FROM set_info where show_id = {$id}";
        $result = $conn->query($sql);
            $rows = array();

            while($r = mysqli_fetch_assoc($result)) {
                $rows[] = $r;
            }
            echo json_encode($rows);

            $conn->close();
    }
    
    
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Check if the request is for the getCurrentDateTime function
        if ($_GET['function'] === 'getSetsByShowID') {
          // Call the function and return the result as a JSON object
          if($_GET['id']) {
            getSetsByShowID($_GET['id']);
          }
          else {
            getSetsByShowID(-1);
          }
        }
      
        
      }

?>