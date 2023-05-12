<?php 

include_once "../../config/Database.php";
include_once "../../models/User.php";

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email =$_POST['email'];
    $password = md5($_POST['password']);
    $cpass = md5($_POST['cpassword']);

    if(mysqli_num_rows($result) > 0){
        $error[] = 'User already exists';

    }else{
        if($password != $cpass){
            $error[] = "password not matched";
        }else{
            $insert = "INSERT INTO user_two(name, email, password, user_type) VALUES('$name', '$email', '$password', '$user_type')";
            mysqli_query($conn, $insert);
            header('location: login_form.php');
        }
    }
}