<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../database.php';
include_once 'employee.php';

 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$employee = new Employee($db);
 
// query products
$stmt = $employee->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // products array
    $employees_arr=array();
    $employees_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $employee_item=array(
            "id" => (int)$id,
            "department_id" => (int)$department_id,
            "name" => $name_employee,
            "doh" => $date_of_hire,
            "telephone" => $telephone
        );
 
        array_push($employees_arr["records"], $employee_item);
    }
 
    echo json_encode($employees_arr);
}
 
else{
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>