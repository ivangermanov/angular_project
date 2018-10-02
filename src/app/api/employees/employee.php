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
                  t.id, t.department_id, t.name_employee, t.reason, et.employee_id,t.due_date
                  FROM
                  " . $this->table_name . " t
                  JOIN employeeemployee et
                  ON t.id = et.employee_id
                  WHERE t.id = ?";

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
                    "employee_id" => (int)$employee_id,
                    "name_employee" => $name_employee,
                    "reason" => $reason,
                    "due_date" => $due_date
                );
                
                array_push($employees_arr["records"], $employee_item);
            }

            $json_employees_arr = array();
            $json_employees_arr["records"] = array();
            $next_index = 0;
            $finished = FALSE;

            for ($i=0; TRUE; $i++) { 
                array_push($json_employees_arr["records"], $employees_arr["records"][$next_index]);
                settype($json_employees_arr["records"][$i]['employee_id'], 'array');
                $next_index = $next_index + 1;
                if ($next_index >= sizeof($employees_arr["records"])) {
                    break;
                }
                while ($json_employees_arr["records"][$i]['id'] == $employees_arr["records"][$next_index]['id']) {
                    array_push($json_employees_arr["records"][$i]['employee_id'], $employees_arr["records"][$next_index]['employee_id']);
                    $next_index = $next_index + 1;
                    if ($next_index >= sizeof($employees_arr["records"])) {
                        $finished = TRUE;
                        break;
                    }
                }
                if ($finished) {
                    break;
                }
            }

            // set values to object properties
            $this->id = $json_employees_arr["records"][0]['id'];
            $this->department_id = $json_employees_arr["records"][0]['department_id'];
            $this->name_employee = $json_employees_arr["records"][0]['name_employee'];
            $this->reason = $json_employees_arr["records"][0]['reason'];
            $this->employee_id = $json_employees_arr["records"][0]['employee_id'];
            $this->due_date = $json_employees_arr["records"][0]['due_date'];
            
        } else {
                echo json_encode(array("message" => "No employees found."));
        }
    }

    // update the product
    function update(){
        $this->conn->beginTransaction();
        // update query
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    department_id = :department_id,
                    name_employee = :name_employee,
                    reason = :reason,
                    due_date = :due_date
                WHERE
                    id = :id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize update in employee
        $this->department_id=htmlspecialchars(strip_tags($this->department_id));
        $this->name_employee=htmlspecialchars(strip_tags($this->name_employee));
        $this->reason=htmlspecialchars(strip_tags($this->reason));
        $this->due_date=htmlspecialchars(strip_tags($this->due_date));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind new values
        $stmt->bindParam(':department_id', $this->department_id);
        $stmt->bindParam(':name_employee', $this->name_employee);
        $stmt->bindParam(':reason', $this->reason);
        $stmt->bindParam(':due_date', $this->due_date);
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if(!$stmt->execute()){
            $this->conn->rollBack();
            return FALSE;
        }

        // sanitize deletion in employeeemployee
        $this->id=htmlspecialchars(strip_tags($this->id));

        $query = "DELETE FROM employeeemployee WHERE employee_id=:id";

        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':id', $this->id);

        if(!$stmt->execute()){
            $this->conn->rollBack();
            return FALSE;
        }

        // sanitize insertion into employeeemployee
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->employee_id=$this->employee_id;
        
        // query to insert record into employee_employee
        $query = "INSERT INTO employeeemployee (employee_id, employee_id) VALUES";
        for ($i=0; $i < sizeof($this->employee_id); $i++) { 
            if ($i >= sizeof($this->employee_id) - 1) {
                $query .= "(?,{$this->id});";
            } else {
                $query .= "(?,{$this->id}),";
            }
        }

        // prepare query
        $stmt = $this->conn->prepare($query);
        
        
        // execute query
        if($stmt->execute($this->employee_id)){
            $this->conn->commit();
            return TRUE;
        } else {
            $this->conn->rollBack();
            return FALSE;
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
        $query = "SELECT t.id, t.department_id, et.employee_id, t.name_employee, t.reason, t.due_date
                  FROM " . $this->table_name . " t
                  JOIN employeeemployee et
                  ON t.id = et.employee_id
                  JOIN employee e
                  ON et.employee_id = e.id
                  WHERE name_employee LIKE ?
                  ORDER BY t.id";
    
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
}