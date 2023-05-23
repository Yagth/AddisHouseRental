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
        unset($_FILES['my_image']);
        return null;
    } else{
        if($size > 1250000){
            $em = "Sorry your image is too large";
            unset($_FILES['my_image']);
            return null;
        }else{
            $img_ex = pathinfo($name, PATHINFO_EXTENSION);
            $img_ex_lc = strtolower($img_ex);

            $allowed_image_ex = array("png", "jpg", "jped");

            if(!in_array($img_ex_lc, $allowed_image_ex)){
                $em = "This format isn't supported";
                unset($_FILES['my_image']);
                return null;
            }else{
                $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
                $img_upload_path = "../../img/uploads/".$new_img_name;
                move_uploaded_file($tmp_name, $img_upload_path);

                return $img_upload_path;
            }
        }
    }
}


if(isset($_POST['submit']) && isset($_FILES['main_pic'])){
    header("Content-Type: application/json");
    $house->price = $_POST['price'];
    $house->house_desc = $_POST['house_desc'];
    $house->no_rooms = $_POST['no_rooms'];
    $house->price = $_POST['price'];

    $house_pics = array();
    $main_pic = $_FILES['main_pic'];
    array_push($house_pics, $main_pic);

    if(isset($_FILES['other_pics'])){
        $images = $_FILES['other_pics'];
        foreach ($images as $image) {
            array_push($house_pics, image_upload($image));
        }

        $house_pics = array_filter($house_pics, function($v){
            return $v != null;
        });
    }

    $house->house_pics = $house_pics;
    
    echo json_encode($house_arr);
} else{
   echo json_encode(
       array(
        'sucess' => false,
        'message' => 'No house'
        )
   );
}