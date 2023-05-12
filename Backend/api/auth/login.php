<?php

include_once "../../config/Database.php";
include_once "../../models/User.php";

$database = new Database();
$db = $database->connect();

$user = new User($db); 

$is_valid = false;

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['password']) && isset ($_POST['email'])){
    $user->email = $_POST['email'];
    $password = md5($_POST['password']);
    $user->get_single_user();  

    if($user->name){
      if($password === $user->password){
          session_start();

          session_regenerate_id();
          $_SESSION["user_id"] = $user->id;
          echo json_encode(array(
            "loggedin" => true,
            "data"   => array(
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email
          )
        ));
        $is_valid = true;
      }
    }
    if(!$is_valid){
        echo json_encode(array(
            "loggedin" => false,
            "message"  => "Invalid credentials"
        ));
    }
  }