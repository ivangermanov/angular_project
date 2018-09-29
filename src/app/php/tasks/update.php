<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../database.php';
include_once 'task.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare task object
$task = new Task($db);
 
// get id of task to be edited
//TODO: use actual data
//$data = json_decode(file_get_contents("php://input"));
// set ID property of task to be edited

//$task->id = $data->id;

$task->id = 1;

// set task property values
// $task->name = $data->name;
// $task->price = $data->price;
// $task->description = $data->description;
// $task->category_id = $data->category_id;
$task->department_id = 3;
$task->name_task = 'testUpdate';
$task->reason = 'TestUpdate';
$task->employee_id = [15,16,17];
$task->due_date = '2019-01-01';



// update the task
if($task->update()){
    echo '{';
        echo '"message": "task was updated."';
    echo '}';
}
 
// if unable to update the task, tell the user
else{
    echo '{';
        echo '"message": "Unable to update task."';
    echo '}';
}
?>