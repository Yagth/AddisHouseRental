<?php

include_once "../../config/Database.php";
include_once "../../models/User.php";

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

if($_SERVER["REQUEST_METHOD"] === "POST"){
  
    $database = new Database();
    $db = $database->connect();
    $user = new User($db); 
    $is_valid = false;

    $user->email = $_POST['email'];
    $password = md5($_POST['password']);
    $user->get_single_user(); 

    if($user->firstname){
      if($password === $user->password){
          session_start();

          session_regenerate_id();
          $_SESSION["user_id"] = $user->id;
          echo json_encode(array(
            "loggedin" => true,
            "data"   => array(
                "id" => $user->id,
                "firstname" => $user->firstname,
                "lastname" => $user->lastname,
                "email" => $user->email
          )
        ));
        $is_valid = true;
      }
    }
    if(!$is_valid){
        http_response_code(401);
        echo json_encode(array(
            "loggedin" => false,
            "message"  => "Invalid credentials"
        ));
    }
}