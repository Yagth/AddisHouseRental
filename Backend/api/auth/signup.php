<?php 

include_once "../../config/Database.php";
include_once "../../models/User.php";

if(isset($_POST['submit'])){
    $database = new Database();
    $db = $database->connect();
    $user = new User($db);
    
    $user->name = $_POST['name'];
    $user->email =$_POST['email'];
    $user->password = md5($_POST['password']);
    $cpass = md5($_POST['cpassword']);

    if($cpass !== $password){
        echo json_encode(array(
            "success" => false,
            "error" => "password not matched")
        );
    }else {
        if($user->create_user()){
            echo json_encode(array(
                "success" => true,
                "data"    => array(
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email
                ),
                "error" => $user->error? $user->error : ""
            ));
        } else{
            echo json_encode(array(
                "success" => false,
                "error" => $user->error? $user->error : "Something went wrong"
            ));
        }
    }
}