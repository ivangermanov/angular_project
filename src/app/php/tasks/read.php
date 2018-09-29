<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../database.php';
include_once 'task.php';
 
// instantiate database and task object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$task = new Task($db);
 
// query tasks
$stmt = $task->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // tasks array
    $tasks_arr=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        
        $task_item=array(
            "id" => $id,
            "department_id" => $department_id,
            "employee_id" => $employee_id,
            "name_task" => $name_task,
            "reason" => $reason,
            "due_date" => $due_date
        );
        
        array_push($tasks_arr, $task_item);
    }

    $json_tasks_arr = array();
    $next_index = 0;
    $finished = FALSE;

    for ($i=0; TRUE; $i++) { 
        array_push($json_tasks_arr, $tasks_arr[$next_index]);
        settype($json_tasks_arr[$i]['employee_id'], 'array');
        $next_index = $next_index + 1;
        while ($json_tasks_arr[$i]['id'] == $tasks_arr[$next_index]['id']) {
            array_push($json_tasks_arr[$i]['employee_id'], $tasks_arr[$next_index]['employee_id']);
            $next_index = $next_index + 1;
            if ($next_index >= sizeof($tasks_arr)) {
                $finished = TRUE;
                break;
            }
        }
        if ($finished) {
            break;
        }
    }

    print_r(json_encode($json_tasks_arr));
}
 
else{
    echo json_encode(
        array("message" => "No tasks found.")
    );
}
?>