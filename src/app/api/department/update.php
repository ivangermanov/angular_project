<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../database.php';
include_once 'department.php';
 
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$department = new Department($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
$department->id = $data->id;
 
// set product property values
//$department->id = $data->id;
$department->name_department = $data->name_department;
$department->role = $data->role;

 
// update the product
if($department->update()){
    echo '{';
        echo '"message": "Department was updated."';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update department."';
    echo '}';
}
?>