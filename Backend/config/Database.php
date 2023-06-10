<?php
    class Database {
        private $host = 'localhost';
        private $db_name = 'WebDatabase';
        private $username = 'root';
        private $password = '';
        private $conn;

        public function connect(){
            $this->conn = null;
             try{
                $this->conn = new mysqli(
                    hostname: $this->host, 
                    username: $this->username, 
                    password: $this->password, 
                    database: $this->db_name);
             } catch (mysqli_sql_exception $e){
                echo "Connection error: $e";
             }
            return $this->conn;
        }
    }
?>