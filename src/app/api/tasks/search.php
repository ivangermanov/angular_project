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
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query tasks
$stmt = $task->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
// tasks array
$tasks_arr=array();
$tasks_arr["records"]=array();
// retrieve our table contents
// fetch() is faster than fetchAll()
// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        
        $task_item=array(
            "id" => (int)$id,
            "department_id" => (int)$department_id,
            "employee_id" => (int)$employee_id,
            "name_task" => $name_task,
            "reason" => $reason,
            "due_date" => $due_date
        );
        
        array_push($tasks_arr["records"], $task_item);
    }

    $json_tasks_arr = array();
    $json_tasks_arr["records"] = array();
    $next_index = 0;
    $finished = FALSE;

    for ($i=0; TRUE; $i++) { 
        array_push($json_tasks_arr["records"], $tasks_arr["records"][$next_index]);
        settype($json_tasks_arr["records"][$i]['employee_id'], 'array');
        $next_index = $next_index + 1;
        if ($next_index >= sizeof($tasks_arr["records"])) {
            break;
        }
        while ($json_tasks_arr["records"][$i]['id'] == $tasks_arr["records"][$next_index]['id']) {
            array_push($json_tasks_arr["records"][$i]['employee_id'], $tasks_arr["records"][$next_index]['employee_id']);
            $next_index = $next_index + 1;
            if ($next_index >= sizeof($tasks_arr["records"])) {
                $finished = TRUE;
                break;
            }
        }
        if ($finished) {
            break;
        }
    }

    echo json_encode($json_tasks_arr);
}
 
else{
    echo json_encode(
        array("message" => "No tasks found.")
    );
}
?>