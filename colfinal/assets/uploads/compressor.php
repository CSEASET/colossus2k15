<?php
//echo "dsfsa";
//header("Content-type: image/jpeg");
$fileName = basename($_SERVER['REQUEST_URI']);;

if(!file_exists("./slider/" . $fileName)) {
    file_put_contents("./slider/" . $fileName, file_get_contents("http://sites.makebecool.com/themeclubcube/assets/uploads/slider/" . $fileName));
    header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
}
header("Content-type: image/jpeg");
echo file_get_contents('./slider/' . $fileName);
exit();
?>
