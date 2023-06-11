<?php

include_once "../../config/Database.php";
include_once "../../models/User.php";

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $database = new Database();
    $db = $database->connect();
    $user = new User($db);

    $user->firstname = $_POST['firstname'];
    $user->lastname = $_POST['lastname'];
    $user->email = $_POST['email'];
    $user->password = $_POST['password'];
    $user->phonenumber = $_POST['phonenumber'];
    $user->telegram_username = $_POST['telegram_username'];
    $user->status = $_POST['status'];

    $cpass = $_POST['cpassword'];

    if ($cpass !== $user->password) {
        echo json_encode(array(
            "success" => false,
            "error" => "password not matched"
        ));
    } else {
        if ($user->create_user()) {
            echo json_encode(array(
                "success" => true,
                "data" => array(
                    "firstname" => $user->firstname,
                    "lastname" => $user->lastname,
                    "email" => $user->email
                ),
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "error" => $user->error ? $user->error : "Something went wrong"
            ));
        }
    }
}
?>