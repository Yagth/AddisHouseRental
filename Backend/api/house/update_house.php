<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/House.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$house = new House($db);
$updated = False;

if(isset($_POST['house_id'])){
    $house_id = $_POST['house_id'];
    $house->get_single_house($house_id);
    
    $house->price      = isset($_POST['price'])      ? $_POST['price'] : $house->price;
    $house->house_desc = isset($_POST['house_desc']) ? $_POST['house_desc'] : $house->house_desc;
    $house->no_rooms   = isset($_POST['no_rooms'])   ? $_POST['no_rooms'] : $house->no_rooms;
    $house->bed_rooms  = isset($_POST['bed_rooms'])   ? $_POST['bed_rooms'] : $house->bed_rooms;
    $house->bath_rooms = isset($_POST['bath_rooms'])   ? $_POST['bath_rooms'] : $house->bath_rooms;
    $house->owner_id   = isset($_POST['owner_id'])   ? $_POST['owner_id'] : $house->owner_id;
    $house->status     = isset($_POST['status'])     ? $_POST['status'] : $house->status;
    
    $updated = $house->update_house($house_id);
    
    if(isset($_POST['pic_id']) && isset($_FILES['new_image'])){
        $pic_id = $_POST['pic_id'];
        $pic_desc = $_POST['pic_desc'];
        $pic_url = $house->image_upload($_FILES['new_image']);
        $updated= $house->update_house_pics($pic_id, $pic_desc, $pic_url);
    }
}
if($updated){

   echo json_encode(
    array(
     'sucess' => True,
     'message' => 'Update Success'
    )
);

}else{
   echo json_encode(
       array(
        'sucess' => False,
        'message' => 'Update Failed'
        )
   );
}