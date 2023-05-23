<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/House.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$house = new House($db);

function image_upload($image){
    
    $name     = $image["name"];
    $size     = $image["size"];
    $tmp_name = $image["tmp_name"];
    $error    = $image["error"];
    
    if($error !== 0){
        $em = "Unknown error occured";
        unset($_FILES['my_image']);
        header("Location: index.php?error=$em");
    } else{
        if($size > 1250000){
            $em = "Sorry your image is too large";
            unset($_FILES['my_image']);
            return json_encode(array("error" => $em, "url" => null));
        }else{
            $img_ex = pathinfo($name, PATHINFO_EXTENSION);
            $img_ex_lc = strtolower($img_ex);

            $allowed_image_ex = array("png", "jpg", "jped");

            if(!in_array($img_ex_lc, $allowed_image_ex)){
                $em = "This format isn't supported";
                unset($_FILES['my_image']);
                return json_encode(array("error" => $em, "url" => null));
            }else{
                $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
                $img_upload_path = "uploads/".$new_img_name;
                move_uploaded_file($tmp_name, $img_upload_path);

                return json_encode(array("error" => null, "url" => $img_upload_path));;
            }
        }
    }
}


if(isset($_POST['submit'])){
    header("Content-Type: application/json");
    $house->price = $_POST['price'];
    $house->house_desc = $_POST['house_desc'];
    $house->no_rooms = $_POST['no_rooms'];
    $main_pic = $_POST['main_pic'];
    $house->house_pics = 
    $house->price = $_POST['price'];

   

   echo json_encode($house_arr);
} else{
   echo json_encode(
       array(
        'sucess' => false,
        'message' => 'No house'
        )
   );
}