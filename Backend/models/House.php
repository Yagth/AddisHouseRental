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
    public $location;
    public $house_tag;
    public $bed_rooms;
    public $bath_rooms;
    public $no_rooms;
    public $pictures;
    public $house_pics;
    
    public $status="NR";
    public $rentee_user_id;
    public $rent_start_day;
    public $rent_end_day;
    
    public $error;

    //Constructor 

    public function __construct($db){
        $this->conn = $db;
    }

    //Get posts

    public function get_houses (){
        //Create query
        $query = "SELECT H.id, H.owner_id, H.price, H.house_description, H.rooms, H.bed_rooms, H.bath_rooms, H.location, H.house_tag, H.status, RH.user_id, RH.start_date, RH.end_date
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
        $query = "SELECT H.id, H.owner_id, H.price, H.location,  H.house_description, H.house_tag, H.rooms, H.bed_rooms, H.bath_rooms, H.status, RH.user_id, RH.start_date, RH.end_date 
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
            $this->rentee_user_id = $row['user_id'];
            $this->rent_start_day = $row['start_date'];
            $this->rent_end_day = $row['end_date'];
            $this->location = $row['location'];
            $this->house_tag = $row['house_tag'];
            $this->no_rooms = $row['rooms'];
            $this->bed_rooms = $row['bed_rooms'];
            $this->bath_rooms = $row['bath_rooms'];

        }
    }

    public function create_house(){
        if(isset($this->bed_rooms) && isset($this->bath_rooms)){
            $query_house = "INSERT INTO $this->house (owner_id, price, house_description, location, house_tag, rooms, bed_rooms, bath_rooms) 
            VALUES (? , ? , ? , ? , ?, ?, ?, ?);";

            $stmt = $this->conn->stmt_init();

            if(!$stmt->prepare($query_house)){
                $this->error = $this->conn->error;
                return false;
            }else {
                $this->house_desc = $this->conn->real_escape_string($this->house_desc);
                $this->no_rooms = $this->bed_rooms + $this->bath_rooms; 
                $stmt->bind_param("ssssssss", 
                    $this->owner_id, 
                    $this->price,
                    $this->house_desc, 
                    $this->location,
                    $this->house_tag,
                    $this->no_rooms,
                    $this->bed_rooms,
                    $this->bath_rooms
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
        } else{
            $query_house = "INSERT INTO $this->house (owner_id, price, house_description, location, house_tag, rooms) 
            VALUES (? , ? , ? , ? , ?, ?);";
            $stmt = $this->conn->stmt_init();

            if(!$stmt->prepare($query_house)){
                $this->error = $this->conn->error;
                return false;
            }else {
                $this->house_desc = $this->conn->real_escape_string($this->house_desc);
                    
                $stmt->bind_param("ssssss", 
                    $this->owner_id, 
                    $this->price,
                    $this->house_desc, 
                    $this->location,
                    $this->house_tag,
                    $this->no_rooms
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
        

        
    }

    public function rent_house(){

        if($this->status !== "R"){
                $query_rented = "INSERT INTO $this->rented_house (house_id, user_id, end_date) VALUES (?, ?, ?); ";

                $stmt = $this->conn->stmt_init();
        
                if(!$stmt->prepare($query_rented)){
                    $this->error = $this->conn->error;
                    return false;
                }
                
                $stmt->bind_param("iis", 
                    $this->id, 
                    $this->rentee_user_id, 
                    $this->rent_end_day
            );
                
                try{
                    $stmt->execute();
                    $this->status = "R";//The 'R' stands for rented.
                    $this->update_house($this->id);
                    return true;
                } catch(mysqli_sql_exception $e){
                    $this->error = $this->$e;
                    return false;
                }        
        }else{
            return false;
        }
        
    }

    public function update_house($id){
        
        $query_house = "UPDATE $this->house SET price=?, location =?, house_description=?, house_tag=?,  rooms=?, bed_rooms=?, bath_rooms=?, status=? WHERE id=?;";
        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query_house)){
            $this->error = $this->conn->error;
            return false;
        }else {
            $this->house_desc = $this->conn->real_escape_string($this->house_desc);
                
            $stmt->bind_param("dsssiiisi", 
                $this->price,
                $this->location,
                $this->house_desc, 
                $this->house_tag,
                $this->no_rooms,
                $this->bed_rooms,
                $this->bath_rooms,
                $this->status,
                $id,
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

    public function delete_house($id){
        $query_house = "DELETE FROM $this->house WHERE id=?;";
        $stmt = $this->conn->stmt_init();

        if(!$stmt->prepare($query_house)){
            $this->error = $this->conn->error;
            return false;
        }else {
            $stmt->bind_param("i", 
                $id,
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
            
            echo $pic_desc;
            $stmt->bind_param("ssi", 
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
        $urls = array();
        while($row = $result->fetch_assoc()){
            array_push($urls, $row);
        }
        return $urls;
    }

    public function image_upload($image){
        $name     = $image["name"];
        $tmp_name = $image["tmp_name"];
        $error    = $image["error"];
        
        if($error !== 0){
            return null;
        } else{
            $img_ex = pathinfo($name, PATHINFO_EXTENSION);
            $img_ex_lc = strtolower($img_ex);

            $allowed_image_ex = array("png", "jpg", "jped");

            if(!in_array($img_ex_lc, $allowed_image_ex)){
                unset($_FILES['my_image']);
                return null;
            }else{
                $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;

                $upload_dir = "../../uploads/img/houses/";

                    
                if(!file_exists($upload_dir)){
                    mkdir($upload_dir, 0777, true);
                }

                $img_upload_path = "../../uploads/img/houses/".$new_img_name;
                move_uploaded_file($tmp_name, $img_upload_path);
                
                return $new_img_name;
            }
        }
    }
}