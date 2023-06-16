<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/House.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$house = new House($db);


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_REQUEST['id'];
    $deleted = $house->delete_house($id);    
}

if($deleted){
    echo json_encode(
        array(
         'sucess' => True,
         'message' => 'Deleted Successfully'
         )
    );
} else{
    echo json_encode(
        array(
         'sucess' => False,
         'message' => 'Delete Failed'
         )
    );
}