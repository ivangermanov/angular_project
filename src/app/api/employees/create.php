<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../database.php';
 
// instantiate employee object
include_once 'employee.php';
 
$database = new Database();
$db = $database->getConnection();
 
$employee = new Employee($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set employee property values
$employee->id = $data->id; //10;
$employee->department_id = $data->department_id;
$employee->name_employee = $data->name_employee;
$employee->date_of_hire = $data->date_of_hire;
$employee->telephone = $data->telephone;
 
// create the employee
if($employee->create()){
    echo '{';
        echo '"message": "employee was created."';
    echo '}';
}
 
// if unable to create the employee, tell the user
else{
    echo '{';
        echo '"message": "Unable to create employee."';
    echo '}';
}
?>