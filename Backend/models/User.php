<?php
class User{
    //DB Stuff
    private $conn;
    private $table = 'user';

    //Posts properties

    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $phonenumber;
    public $telegram_username;
    public $profile_pic;
    public $gender;
    public $status;
    
    public $error;

    //Constructor 

    public function __construct($db){
        $this->conn = $db;
    }

    //Get posts

    public function get_user (){
        //Create query
        $query = "SELECT * FROM $this->table";

        $stmt = $this->conn->stmt_init();
        if(!$stmt->prepare($query)){
            die("SQL Error: " . $this->conn->error);
        }
                
        try{
            $stmt->execute();
        } catch(mysqli_sql_exception $e){
            die(($this->conn->error . " " . $this->conn->errno));
        }
        //Prepared statements
        return $stmt->get_result();
    }

    public function get_single_user (){
        //Create query
        $query = "SELECT * FROM $this->table WHERE email = ?";

        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query)){
            die("SQL Error: " . $this->conn->error);
        }
        
        $stmt->bind_param("s", $this->email);
        
        try{
            $stmt->execute();
        } catch(mysqli_sql_exception $e){
            die(("Error: $e"));
        }
        $result = $stmt->get_result();
        if($result->num_rows > 0){
            $row = $result->fetch_assoc();

            //Set properties
            $this->id = $row['id'];
            $this->email = $row['email'];
            $this->firstname = $row['firstname'];
            $this->lastname = $row['lastname'];
            $this->password = $row['password'];
            $this->phonenumber = $row['phonenumber'];
            $this->telegram_username = $row['telegram_username'];
            $this->profile_pic = $row['profile_pic'];
            $this->gender = $row['gender'];
            $this->status = $row['status'];

        }

    }

    public function create_user(){
        $query = "INSERT INTO $this->table 
                SET name = ?, password = ?, email = ?";

        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query)){
            die("SQL Error: " . $this->conn->error);
        }else if($this->email_unique($this->email)){
            $this->name = $this->conn->real_escape_string($this->name);
            $this->password = md5($this->conn->real_escape_string($this->password));
            $this->email = $this->conn->real_escape_string($this->email);
    
            $stmt->bind_param("sss", $this->name, $this->password, $this->email);
            
            try{
                $stmt->execute();
                return true;
            } catch(mysqli_sql_exception $e){
                printf ("Error: %s.\n", $e);
                return false;
            }
        }else{
            $this->error = "Email not unique";
            $this->name = null;
            $this->password = null;
            return false;
        }
    }

    public function email_unique($email){
        $query = "SELECT * FROM $this->table WHERE email = ?";

        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query)){
            die("SQL Error: " . $this->conn->error);
        }
        
        $stmt->bind_param("s", $email);
        
        try{
            $stmt->execute();
        } catch(mysqli_sql_exception $e){
            die(("Error: $e"));
        }
        $result = $stmt->get_result();
        return !($result->num_rows > 0);
    }

}