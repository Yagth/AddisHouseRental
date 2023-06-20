<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/House.php';
include_once '../../models/User.php';


$database = new Database();
$db = $database->connect();

$house = new House($db);

function error_disp($message='House creation Failed'){
    return json_encode(
        array(
         'success' => false,
         'message' => $message
         )
    );
}

function image_upload($image){
    
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

if($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES['main_pic'])){
    $house->price = $_POST['price'];
    $house->house_desc = $_POST['house_desc'];
    $house->no_rooms = isset($_POST['no_rooms']) ? $_POST['no_rooms'] : null;
    $house->bed_rooms = isset($_POST['bed_rooms']) ? $_POST['bed_rooms'] : null;
    $house->bath_rooms = isset($_POST['bath_rooms']) ? $_POST['bath_rooms'] : null;
    $house->owner_id = $_POST['owner_id'];
    $house->location = isset($_POST['location']) ? $_POST['location'] : null;
    $house->house_tag = isset($_POST['house_tag']) ? $_POST['house_tag']: null;
    
    $house_pics = array();
    $main_pic = $_FILES['main_pic'];
    $house_pics["main"] = image_upload($main_pic);

    if(isset($_FILES['other_pics'])){
        $image = $_FILES['other_pics'];
        $house_pics['other'] = image_upload($image);

        // We can add here a loop to add multiple images at the same time.
        
        $house_pics = array_filter($house_pics, function($v){
            return $v != null;
        });
    }

    $house->house_pics = $house_pics;
    if($house->create_house()){
        $house_array = array("id" => $house->id,
                             "owner_id" => (int)$house->owner_id, 
                             "price" => (double)$house->price, 
                             "desc" =>$house->house_desc, 
                             "rooms" => isset($house->no_rooms)?(int)$house->no_rooms: 0,
                             "bed_rooms" => isset($house->bed_rooms)?(int)$house->bed_rooms:0,
                             "bath_rooms" => isset($house->bath_rooms)?(int)$house->bath_rooms:0,
                             "house_tag" => $house->house_tag,
                             "location"  => $house->location,
                             "status" => $house->status,
                             "pictures" => $house->house_pics
                            );
        echo json_encode(array("data" => $house_array, "success" => true));
    }else{
        echo error_disp("Database error on creating house");
    }
    
} else {
    if(!isset($_FILES['main_pic'])){
        echo error_disp("Image upload failed");
    } else{
        echo error_disp();
    }
}