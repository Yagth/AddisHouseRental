<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

if(isset($_GET['id'])){
    $user->id = $_GET['id'];
    $result = $user->get_single_user_by_id();
    
    if(isset($user->email)){
    
        $user_arr = array();
        $user_arr['data'] = array();
        $user_arr['success'] = false;
    
        $user_item = array(
               'id' => $user->$id,
               'firstname' => $user->$firstname,
               'lastname' => $user->$lastname,
               'email' => html_entity_decode($user->$email),
               'telegram_username' => $user->telegram_username,
               'status' => $user->$status
           );
           
        array_push($user_arr['data'], $user_item);
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
}
else{
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
               'firstname' => $firstname,
               'lastname' => $lastname,
               'email' => html_entity_decode($email),
               'status' => $status
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
}