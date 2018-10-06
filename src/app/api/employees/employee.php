<?php
class Employee{
 
    // database connection and table name
    private $conn;
    private $table_name = "employee";
 
    // object properties
    public $id;
    public $department_id;
    public $name_employee;
    public $date_of_hire;
    public $telephone;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read employees
    function read(){
    
        // select all query
        $query = "SELECT id, department_id, name_employee, date_of_hire, telephone
                  FROM " . $this->table_name . " ";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // create employee
    function create(){
        // query to insert record into employee
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                id=:id, department_id=:department_id, name_employee=:name_employee, date_of_hire=:date_of_hire, telephone=:telephone";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->department_id=htmlspecialchars(strip_tags($this->department_id));
        $this->name_employee=htmlspecialchars(strip_tags($this->name_employee));
        $this->date_of_hire=htmlspecialchars(strip_tags($this->date_of_hire));
        $this->telephone=htmlspecialchars(strip_tags($this->telephone));
    
        // bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":department_id", $this->department_id);
        $stmt->bindParam(":name_employee", $this->name_employee);
        $stmt->bindParam(":date_of_hire", $this->date_of_hire);
        $stmt->bindParam(":telephone", $this->telephone);
    
        // execute query
        if(!$stmt->execute()){
            return TRUE;
        }
    }

    // used when filling up the update product form
    function readOne(){
        // query to read single record
        $query = "SELECT
                  id, department_id, name_employee, date_of_hire, telephone
                  FROM
                  " . $this->table_name . "
                  WHERE id = ?";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);
    
        // execute query
        $stmt->execute();
        
        // get retrieved row
        $num = $stmt->rowCount();
        
        if($num > 0) {
            $employees_arr=array();
            $employees_arr["records"]=array();

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $employee_item=array(
                    "id" => (int)$id,
                    "department_id" => (int)$department_id,
                    "name_employee" => $name_employee,
                    "doh" => $date_of_hire,
                    "telephone" => $telephone
                );
                
                array_push($employees_arr["records"], $employee_item);
            }

            // set values to object properties
            $this->id = $employees_arr["records"][0]['id'];
            $this->department_id = $employees_arr["records"][0]['department_id'];
            $this->name_employee = $employees_arr["records"][0]['name_employee'];
            $this->date_of_hire = $employees_arr["records"][0]['doh'];
            $this->telephone = $employees_arr["records"][0]['telephone'];
            
        } else {
                echo json_encode(array("message" => "No employees found."));
        }
    }

    // update the product
    function update(){
        // update query
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    department_id = :department_id,
                    name_employee = :name_employee,
                    date_of_hire = :date_of_hire,
                    telephone = :telephone
                WHERE
                    id = :id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize update in employee
        $this->department_id=htmlspecialchars(strip_tags($this->department_id));
        $this->name_employee=htmlspecialchars(strip_tags($this->name_employee));
        $this->date_of_hire=htmlspecialchars(strip_tags($this->date_of_hire));
        $this->telephone=htmlspecialchars(strip_tags($this->telephone));
    
        // bind new values
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':department_id', $this->department_id);
        $stmt->bindParam(':name_employee', $this->name_employee);
        $stmt->bindParam(':date_of_hire', $this->date_of_hire);
        $stmt->bindParam(':telephone', $this->telephone);
    
        // execute the query
        if($stmt->execute()){
            return TRUE;
        }
    }

    // delete the product
    function delete(){
    
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    // search products
    function search($keyword){
 
        // select all query
        $query = "SELECT id, department_id, name_employee, date_of_hire, telephone
                  FROM " . $this->table_name . "
                  WHERE name_employee LIKE ?
                  ORDER BY id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $keyword=htmlspecialchars(strip_tags($keyword));
        $keyword = "%{$keyword}%";
    
        // bind
        $stmt->bindParam(1, $keyword);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function read_employee_department($keyword){
        
        // select all query
        $query = "SELECT id, department_id, name_employee, date_of_hire, telephone
                  FROM " . $this->table_name . " 
                  WHERE department_id = ?
                  ORDER BY id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $keyword=htmlspecialchars(strip_tags($keyword));
  
        // bind
        $stmt->bindParam(1, $keyword);

        // execute query
        $stmt->execute();
        
        return $stmt;
    }
}