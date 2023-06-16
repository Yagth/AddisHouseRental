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
$rented  = False;

if(isset($_POST['submit']) && isset($_POST['house_id'])){
    $house_id = $_POST['house_id'];
    $house->get_single_house($house_id);
    
    $house->rentee_user_id = $_POST['user_id'];
    $house->rent_end_day = $_POST['end_date'];
    
    $rented = $house->rent_house();
}
if($rented){
   echo json_encode(
    array(
     'sucess' => True,
     'message' => 'Rent Successfull'
    )
);

}else{
   echo json_encode(
       array(
        'sucess' => False,
        'message' => 'Renting Failed. Possibly because house already rented'
        )
   );
}