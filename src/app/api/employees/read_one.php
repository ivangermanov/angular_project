<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
// include database and object files
include_once '../database.php';
include_once 'employee.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare employee object
$employee = new Employee($db);
 
// set ID property of employee to be edited
$employee->id = isset($_GET['id']) ? $_GET['id'] : die();
// read the details of employee to be edited
$employee->readOne();

// create array
$employee_arr = array(
    "id" =>  $employee->id,
    "department_id" => $employee->department_id,
    "name_employee" => $employee->name_employee,
    "doh" => $employee->date_of_hire,
    "telephone" => $employee->telephone
);

// make it json format
print_r(json_encode($employee_arr));
?>