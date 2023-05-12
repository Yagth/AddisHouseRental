<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new user($db);

$data = json_decode(file_get_contents("php://input"));

$user->name = $data->name;
$user->password = $data->password;
$user->email = $data->email;
$success = $user->create_user();

echo json_encode(array(
    "sucess" => $success,
    "message" => $success ? "user created" : "Failed to create user",
    "error"   => $user->error ? $user->error : ""
));