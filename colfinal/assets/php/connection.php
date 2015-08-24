                                <?php
$hostname = '127.0.0.1';
$username = 'colossus';
$pwd = 'i8-S[Lav2xge';
$dbname = 'colossus_15';

$dbhandle = mysql_connect($hostname,$username,$pwd) or die("Error in connecting.");
$db = mysql_select_db($dbname,$dbhandle) or die("Error in selecting Database.");
?>

                            