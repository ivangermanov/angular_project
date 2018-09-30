<?php
class Database{
 
    // specify your own database credentials
<<<<<<< HEAD
    private $host = "localhost";
    private $db_name = "dbi380810";
    private $username = "root";
    private $password = "";
=======
    private $host = "studmysql01.fhict.local";
    private $db_name = "dbi380810";
    private $username = "dbi380810";
    private $password = "ivangabrielmara";
>>>>>>> restapi
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>