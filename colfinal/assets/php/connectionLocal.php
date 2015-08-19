<?php
$hostname = '127.0.0.1';
$username = 'root';
$pwd = 'usbw';
$dbname = 'colossus15';

$dbhandle = mysql_connect($hostname,$username,$pwd) or die("Error in connecting.");
$db = mysql_select_db($dbname,$dbhandle) or die("Error in selecting Database.");
?>