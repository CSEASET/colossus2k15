<?php
//echo "dsfsa";
//header("Content-type: image/jpeg");
$fileName = basename($_SERVER['REQUEST_URI']);;

if(!file_exists("./cache/" . $fileName)) {
    file_put_contents("./cache/" . $fileName, file_get_contents("http://sites.makebecool.com/themeclubcube/assets/components/phpthumbof/cache/" . $fileName));
    header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
}
header("Content-type: image/jpeg");
echo file_get_contents('./cache/' . $fileName);
exit();
?>