<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../database.php';
include_once 'department.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$department = new Department($db);
 
// set ID property of product to be edited
$department->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$department->readOne();
 
// create array
$department_arr = array(
    "id" =>  $department->id,
    "name_department" => $department->name_department,
    "role" => $department->role
   
);
 
// make it json format
print_r(json_encode($department_arr));
?>