<?php 
// php mail handler uses PHPMailer + Mandrill (transactional email service) via SMTP


//header("HTTP/1.1 404 Not Found");exit(); // to disable mail function uncomment this line.

if(!isset($_REQUEST["cf_name"])) {
exit();
}

require './phpMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->IsSMTP();                                     
$mail->Host = 'smtp.mandrillapp.com';                 
$mail->Port = 587;                                    
$mail->SMTPAuth = true;                              
$mail->Username = 'vijayant.saini123@gmail.com';            
$mail->Password = 'YY5SK0E3hH9b87dvzoocfw';                
$mail->SMTPSecure = 'tls';

$mail->From = 'no-reply@amitech15.com';
$mail->FromName = 'Administrator';
//$mail->AddAddress('vijayant.saini123@gmail.com', 'Vijayant');
$mail->AddAddress('piyushagwl007@gmail.com', 'Piyush');


$mail->IsHTML(true);

$mail->Subject = '[Form Submission] Contact-Us';
$mail->Body    = "Visitor entered the following:<br />Name: $_REQUEST[cf_name]<br />Email: $_REQUEST[cf_email]<br />Message: $_REQUEST[cf_message]<br />";
$mail->AltBody = "Visitor entered the following:\nName: $_REQUEST[cf_name]\nEmail: $_REQUEST[cf_email]\nMessage: $_REQUEST[cf_message]\n";

if(!$mail->Send()) {
   echo '2';
   //echo 'Mailer Error: ' . $mail->ErrorInfo;
   exit;
}
echo "1";

?>