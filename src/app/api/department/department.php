<?php
class Department{
 
    // database connection and table name
    private $conn;
    private $table_name = "department";
 
    // object properties
    public $id;
    public $name_department;
    public $role;
    public $employee_name;
    
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
                
              //  ORDER BY
               //     p.created DESC";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }



}