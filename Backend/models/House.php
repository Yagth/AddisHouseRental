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
    public $status="NR";
    public $rentee_user_id;
    public $rent_start_day;
    public $rent_end_day;
    public $pictures;
    public $house_pics;
    
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
        
        $stmt->bind_param("i", $house_id);
        
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
            $this->house_desc = $this->conn->real_escape_string($this->house_desc);
                
            $stmt->bind_param("sssss", 
                $this->owner_id, 
                $this->price, 
                $this->house_desc, 
                $this->no_rooms, 
                $this->status
            );
            
            try{
                $stmt->execute();
                $this->id = $stmt->insert_id;
                $this->save_house_pics();
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

    public function update_house($id, $pic_id, $pic_desc, $pic_url){
        
        $query_house = "UPDATE $this->house SET price=?, house_description=?, rooms=? WHERE id=?;";
        $stmt = $this->conn->stmt_init();

    if(!$stmt->prepare($query_house)){
        $this->error = $this->conn->error;
        return false;
    }else {
        $this->house_desc = $this->conn->real_escape_string($this->house_desc);
            
        $stmt->bind_param("idsi", 
            $this->price, 
            $this->house_desc, 
            $this->no_rooms,
            $id,
        );
        
        try{
            $stmt->execute();
            $this->update_house_pics($pic_id, $pic_desc, $pic_url);
            return true;
        } catch(mysqli_sql_exception $e){
            printf ("Error: %s.\n", $e);
            return false;
        }
    }
    }

    public function save_house_pics(){
        $query = "INSERT INTO $this->house_pic(house_id, pic_desc, photo_url)
            VALUES (?, ?, ?); ";

        foreach ($this->house_pics as $pic_desc => $pic_url) {
            $stmt = $this->conn->stmt_init();
            
            $pic_desc = $this->conn->real_escape_string($pic_desc);
            $pic_url  = $this->conn->real_escape_string($pic_url);

            if(!$stmt->prepare($query)){
                $this->error = $this->conn->error;
                return false;
            }
            
            $stmt->bind_param("sss", 
                $this->id,
                $pic_desc, 
                $pic_url, 
            );
            
            try{
                $stmt->execute();
            }catch(mysqli_sql_exception $e){
                $this->error = "Got the following error while trying to insert to the table \n error: $e";
                return false;
            }      
        }

        return true;
    }
    public function update_house_pics($pic_id, $pic_desc, $pic_url){
        $query = "UPDATE $this->house_pic SET pic_desc=?, photo_url=? WHERE pic_id=?";

            $stmt = $this->conn->stmt_init();
            
            $pic_desc = $this->conn->real_escape_string($pic_desc);
            $pic_url  = $this->conn->real_escape_string($pic_url);
            
            if(!$stmt->prepare($query)){
                $this->error = $this->conn->error;
                return false;
            }
            
            $stmt->bind_param("iss", 
                $pic_desc, 
                $pic_url, 
                $pic_id
            ); 
            
            try{
                $stmt->execute();
            }catch(mysqli_sql_exception $e){
                $this->error = "Got the following error while trying to update to the table \n error: $e";
                return false;
            }      

        return true;
    }

    public function get_house_pic(){
        $query = "SELECT pic_id, pic_desc, photo_url FROM $this->house_pic WHERE house_id = $this->id";

        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query)){
            $this->error = $this->conn->error;
            return null;
        }

        try{
            $stmt->execute();
            $result = $stmt->get_result();
        } catch(mysqli_sql_exception $e){
            $this->error = "Error: $e";
            return null;
        }

        if($result->num_rows === 0){
            return null;
        }
        return $result->fetch_assoc();
    }

    public function image_upload($image){
    
        $name     = $image["name"];
        $size     = $image["size"];
        $tmp_name = $image["tmp_name"];
        $error    = $image["error"];
        
        if($error !== 0){
            unset($_FILES['my_image']);
            return null;
        } else{
            if($size > 1250000){
                unset($_FILES['my_image']);
                return null;
            }else{
                $img_ex = pathinfo($name, PATHINFO_EXTENSION);
                $img_ex_lc = strtolower($img_ex);
    
                $allowed_image_ex = array("png", "jpg", "jped");
    
                if(!in_array($img_ex_lc, $allowed_image_ex)){
                    unset($_FILES['my_image']);
                    return null;
                }else{
                    $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
    
                    $upload_dir = "../../uploads/img/";
    
                        
                    if(!file_exists($upload_dir)){
                        mkdir($upload_dir, 0777, true);
                    }
    
                    $img_upload_path = "../../uploads/img/".$new_img_name;
                    move_uploaded_file($tmp_name, $img_upload_path);
    
                    return $img_upload_path;
                }
            }
        }
    }
}