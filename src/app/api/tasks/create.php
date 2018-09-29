<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../database.php';
 
// instantiate task object
include_once 'task.php';
 
$database = new Database();
$db = $database->getConnection();
 
$task = new Task($db);
 
// get posted data
//TODO: Get actual data
$data = json_decode(file_get_contents("php://input"));
print_r($data);
// set task property values
$task->id = $data->id; //10;//
$task->department_id = $data->department_id; //5;//
$task->name_task = $data->name_task; //'test';//
$task->reason = $data->reason; //'apitest';//
$task->due_date = $data->due_date; //'2018-12-12';//
$task->employee_id = $data->employee_id; //[13, 14, 15];//
 
// create the task
if($task->create()){
    echo '{';
        echo '"message": "Task was created."';
    echo '}';
}
 
// if unable to create the task, tell the user
else{
    echo '{';
        echo '"message": "Unable to create task."';
    echo '}';
}
?>