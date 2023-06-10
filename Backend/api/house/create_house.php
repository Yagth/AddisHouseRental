<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/House.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$house = new House($db);

$error_json = json_encode(
    array(
     'sucess' => false,
     'message' => 'No house'
     )
);
if(isset($_POST['submit']) && isset($_FILES['main_pic'])){
    header("Content-Type: application/json");
    $house->price = $_POST['price'];
    $house->house_desc = $_POST['house_desc'];
    $house->no_rooms = $_POST['no_rooms'];
    $house->owner_id = $_POST['owner_id'];
    $house->status   = $_POST['status'] ? $_POST['status'] : $house->status; // If submitted data has status use that else use the default. (Default = "NR" which stands for not rented)

    $house_pics = array();
    $main_pic = $_FILES['main_pic'];
    $house_pics["main"] = $house->image_upload($main_pic);

    if(isset($_FILES['other_pics'])){
        $image = $_FILES['other_pics'];
        $house_pics['other'] = $house->image_upload($image);

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
                             "rooms" => (int)$house->no_rooms, 
                             "status" => $house->status,
                             "pictures" => $house->house_pics
                            );
        echo json_encode(array("data" => $house_array, "sucess" => true));
    }else{
        echo $error_json;
    }
    
} else {
   echo $error_json;
}