<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
// include database and object files
include_once '../database.php';
include_once 'task.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare task object
$task = new Task($db);
 
// set ID property of task to be edited
//TODO: get actual id
//$task->id = isset($_GET['id']) ? $_GET['id'] : die();
$task->id = 1;
// read the details of task to be edited
$task->readOne();

    // create array
    $task_arr = array(
        "id" =>  $task->id,
        "department_id" => $task->department_id,
        "name_task" => $task->name_task,
        "reason" => $task->reason,
        "employee_id" => $task->employee_id,
        "due_date" => $task->due_date
    
    );
    
    // make it json format
    print_r(json_encode($task_arr));
?>