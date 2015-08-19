<?php
$hostname = '127.0.0.1';
$username = 'vijayant_col';
$pwd = '12345abc';
$dbname = 'vijayant_colossus15';

$dbhandle = mysql_connect($hostname,$username,$pwd) or die("Error in connecting.");
$db = mysql_select_db($dbname,$dbhandle) or die("Error in selecting Database.");
?>