<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);
$result = $user->get_user();

$num  = $result->num_rows;

if($num > 0){

   $user_arr = array();
   $user_arr['data'] = array();
   $user_arr['success'] = false;

   while($row = $result->fetch_assoc()){
       extract($row);

       $user_item = array(
           'id' => $id,
           'name' => $name,
           'email' => html_entity_decode($email)
       );
       
       array_push($user_arr['data'], $user_item);
   }

   $user_arr['success'] = true;

   echo json_encode($user_arr);

}else{
   echo json_encode(
       array(
        'sucess' => false,
        'message' => 'No users'
        )
   );
}