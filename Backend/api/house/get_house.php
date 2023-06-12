<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/House.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$house = new House($db);
$result = $house->get_houses();

$num  = $result->num_rows;

if($num > 0){

   $house_arr = array();
   $house_arr['data'] = array();
   $house_arr['success'] = false;

   while($row = $result->fetch_assoc()){
       extract($row);
       $house_item = array(
           'id' => $id,
           'price' => $price,
           'house_description' => $house_description,
           'rooms' => $rooms,
           'bed_rooms' => $bed_rooms,
           'bath_rooms' => $bath_rooms,
           'house_tag'  => $house_tags,
           'location'   => $location,
           'status' => $status,
           'pics' => array(),
           'owner' => array()
       );

       $user = new User($db);
       $user->id = $owner_id;
       $user->get_single_user_by_id();

       $house_item['owner'] = "$user->firstname $user->lastname";

       $house->id = $id;
       $pic_urls = $house->get_house_pic();

       array_push($house_item['pics'], $pic_urls ? $pic_urls : "");
       
       array_push($house_arr['data'], $house_item);
   }

   $house_arr['success'] = true;

   echo json_encode($house_arr);

}else{
   echo json_encode(
       array(
        'sucess' => false,
        'message' => 'No house'
        )
   );
}