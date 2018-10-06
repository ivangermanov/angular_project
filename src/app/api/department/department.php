<?php
class Department{
 
    // database connection and table name
    private $conn;
    private $table_name = "department";
 
    // object properties
    public $id;
    public $name_department;
    public $role;
    
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    //read departments 
    function read(){
 
        // select all query
        $query = "SELECT
                    d.id, d.name_department, d.role
                
                FROM " . $this->table_name . " d";
                
              
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    // SEARCH
    function search($keywords){
 
    // select all query
    $query = "SELECT
                d.id, d.name_department, d.role
              FROM " . $this->table_name . " d
              WHERE d.name_department LIKE ?";
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $keywords=htmlspecialchars(strip_tags($keywords));
    $keywords = "%{$keywords}%";
 
    // bind
    $stmt->bindParam(1, $keywords);
  
 
    // execute query
    $stmt->execute();
 
    return $stmt;
    }



    // create department
function create(){
 
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
            SET
                id=:id, name_department=:name_department, role=:role";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
    $this->name_department=htmlspecialchars(strip_tags($this->name_department));
    $this->role=htmlspecialchars(strip_tags($this->role));
   
    // bind values

    $stmt->bindParam(":id", $this->id);
    $stmt->bindParam(":name_department", $this->name_department);
    $stmt->bindParam(":role", $this->role);
   
 
    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}


//READ ONE
function readOne(){
 
    // query to read single record
    $query = "SELECT
                d.id, d.name_department, d.role
            FROM
                " . $this->table_name . " d
            WHERE
                d.id = ?";
            
 
    // prepare query statement
    $stmt = $this->conn->prepare( $query );
 
    // bind id of product to be updated
    $stmt->bindParam(1, $this->id);
 
    // execute query
    $stmt->execute();
    
    $num = $stmt->rowCount();
        
    if($num > 0) {
        $departments_arr=array();
        $departments_arr["records"]=array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $department_item=array(
                "id" => (int)$id,
                "name_department" => $name_department,
                "role" => $role
            );
            
            array_push($departments_arr["records"], $department_item);
        }

        // set values to object properties
        $this->id = $departments_arr["records"][0]['id'];
        $this->name_department= $departments_arr["records"][0]['name_department'];
        $this->role = $departments_arr["records"][0]['role'];
        
    } else {
            echo json_encode(array("message" => "No departments found."));
    }
}

//UPDATE

function update(){
    $this->conn->beginTransaction();
    // update query
    $query = "UPDATE
                " . $this->table_name . "
            SET
                name_department = :name_department,
                role = :role
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->name_department=htmlspecialchars(strip_tags($this->name_department));
    $this->role=htmlspecialchars(strip_tags($this->role));
    $this->id=htmlspecialchars(strip_tags($this->id));
    

 
    // bind new values
    $stmt->bindParam(':name_department', $this->name_department);
    $stmt->bindParam(':role', $this->role);
    $stmt->bindParam(':id', $this->id);
 
    // execute the query
    if($stmt->execute()){
        return true;
    }
 
    return false;
}


//DELETE 
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
}