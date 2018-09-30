<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../database.php';
include_once 'task.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare task object
$task = new Task($db);
 
// get task id
$data = json_decode(file_get_contents("php://input"));
 
// set task id to be deleted
$task->id = $data->id;
 
// delete the task
if($task->delete()){
    echo '{';
        echo '"message": "Task was deleted."';
    echo '}';
}
 
// if unable to delete the task
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>