<?php
class Task{
 
    // database connection and table name
    private $conn;
    private $table_name = "task";
 
    // object properties
    public $id;
    public $department_id;
    public $name_task;
    public $reason;
    public $employee_id;
    public $due_date;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read tasks
    function read(){
    
        // select all query
        $query = "SELECT t.id, t.department_id, et.employee_id, t.name_task, t.reason, t.due_date
                  FROM " . $this->table_name . " t
                  JOIN employeetask et
                  ON t.id = et.task_id
                  JOIN employee e
                  ON et.employee_id = e.id
                  ORDER BY t.id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // create task
    function create(){
        $this->conn->beginTransaction();
        // query to insert record into task
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                id=:id, department_id=:department_id, name_task=:name_task, reason=:reason, due_date=:due_date";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->department_id=htmlspecialchars(strip_tags($this->department_id));
        $this->name_task=htmlspecialchars(strip_tags($this->name_task));
        $this->reason=htmlspecialchars(strip_tags($this->reason));
        $this->due_date=htmlspecialchars(strip_tags($this->due_date));
    
        // bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":department_id", $this->department_id);
        $stmt->bindParam(":name_task", $this->name_task);
        $stmt->bindParam(":reason", $this->reason);
        $stmt->bindParam(":due_date", $this->due_date);
    
        // execute query
        if(!$stmt->execute()){
            $this->conn->rollBack();
            return FALSE;
        }
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->employee_id=$this->employee_id;
        
        // query to insert record into task_employee
        $query = "INSERT INTO employeetask (employee_id, task_id) VALUES";
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

    // used when filling up the update product form
    function readOne(){
        // query to read single record
        $query = "SELECT
                  t.id, t.department_id, t.name_task, t.reason, et.employee_id,t.due_date
                  FROM
                  " . $this->table_name . " t
                  JOIN employeetask et
                  ON t.id = et.task_id
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
            $tasks_arr=array();
            $tasks_arr["records"]=array();

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
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

            // set values to object properties
            $this->id = $json_tasks_arr["records"][0]['id'];
            $this->department_id = $json_tasks_arr["records"][0]['department_id'];
            $this->name_task = $json_tasks_arr["records"][0]['name_task'];
            $this->reason = $json_tasks_arr["records"][0]['reason'];
            $this->employee_id = $json_tasks_arr["records"][0]['employee_id'];
            $this->due_date = $json_tasks_arr["records"][0]['due_date'];
            
        } else {
                echo json_encode(array("message" => "No tasks found."));
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
                    name_task = :name_task,
                    reason = :reason,
                    due_date = :due_date
                WHERE
                    id = :id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize update in task
        $this->department_id=htmlspecialchars(strip_tags($this->department_id));
        $this->name_task=htmlspecialchars(strip_tags($this->name_task));
        $this->reason=htmlspecialchars(strip_tags($this->reason));
        $this->due_date=htmlspecialchars(strip_tags($this->due_date));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind new values
        $stmt->bindParam(':department_id', $this->department_id);
        $stmt->bindParam(':name_task', $this->name_task);
        $stmt->bindParam(':reason', $this->reason);
        $stmt->bindParam(':due_date', $this->due_date);
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if(!$stmt->execute()){
            $this->conn->rollBack();
            return FALSE;
        }

        // sanitize deletion in employeetask
        $this->id=htmlspecialchars(strip_tags($this->id));

        $query = "DELETE FROM employeetask WHERE task_id=:id";

        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':id', $this->id);

        if(!$stmt->execute()){
            $this->conn->rollBack();
            return FALSE;
        }

        // sanitize insertion into employeetask
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->employee_id=$this->employee_id;
        
        // query to insert record into task_employee
        $query = "INSERT INTO employeetask (employee_id, task_id) VALUES";
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
}