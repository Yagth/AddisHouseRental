<?php

class House {
    //DB connections
    private $conn;

    //Table names
    private $house        = "House";
    private $house_pic    = "House_Pic";
    private $rented_house = "Rented_House";

    //House attributes

    public $id;
    public $owner_id;
    public $price;
    public $house_desc;
    public $no_rooms;
    public $status;
    public $rentee_user_id;
    public $rent_start_day;
    public $rent_end_day;
    public $pictures;
    
    public $error;

    //Constructor 

    public function __construct($db){
        $this->conn = $db;
    }

    //Get posts

    public function get_houses (){
        //Create query
        $query = "SELECT H.id, H.owner_id, H.price, H.house_description, H.rooms, H.status, RH.user_id, RH.start_date, RH.end_date
            FROM $this->house as H 
                LEFT JOIN $this->rented_house as RH ON H.id = RH.house_id; ";

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

    public function get_single_house ($house_id){
        //Create query
        $query = "SELECT H.id, H.owner_id, H.price, H.house_description, H.rooms, H.status, RH.user_id, RH.start_date, RH.end_date 
        FROM $this->house as H 
            LEFT JOIN $this->rented_house as RH ON H.id = RH.house_id
        WHERE id = ? ";

        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query)){
            die("SQL Error: " . $this->conn->error);
        }
        
        $stmt->bind_param("s", $house_id);
        
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
            $this->owner_id = $row['owner_id'];
            $this->price = $row['price'];
            $this->house_desc = $row['house_description'];
            $this->no_rooms = $row['rooms'];
            $this->status = $row['status'];
            $this->rentee_user_id = $row['user_id'];
            $this->rent_start_day = $row['start_date'];
            $this->rent_end_day = $row['end_date'];

        }

    }

    public function create_house(){
        $query_house = "INSERT INTO $this->house (owner_id, price, house_description, rooms, status) 
            VALUES (? , ? , ? , ? , ?);";

        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query_house)){
            $this->error = $this->conn->error;
            return false;
        }else {
            $this->house_desc = md5($this->conn->real_escape_string($this->house_desc));
                
            $stmt->bind_param("sssss", 
                $this->owner_id, 
                $this->price, 
                $this->house_desc, 
                $this->no_rooms, 
                $this->status
            );
            
            try{
                $stmt->execute();
                return true;
            } catch(mysqli_sql_exception $e){
                printf ("Error: %s.\n", $e);
                return false;
            }
        }
    }

    public function rent_house(){
        $query_rented = "INSERT INTO $this->rented_house (house_id, user_id, end_date) VALUES (?, ?, ?); ";


        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query_rented)){
            $this->error = $this->conn->error;
            return false;
        }
        
        $stmt->bind_param("sss", 
            $this->id, 
            $this->rentee_user_id, 
            $this->rent_end_day
    );
        
        try{
            $stmt->execute();
            return true;
        } catch(mysqli_sql_exception $e){
            $this->error = $this->$e;
            return false;
        }        
    }

}