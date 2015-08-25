<?php 
// php mail handler uses PHPMailer + Mandrill (transactional email service) via SMTP


//header("HTTP/1.1 404 Not Found");exit(); // to disable mail function uncomment this line.

if(!isset($_REQUEST["name"])) {
exit();
}

if(isset($_POST['g-recaptcha-response']))
    $captcha=$_POST['g-recaptcha-response'];

if(!$captcha){
    echo '<h2>Please go back check the the captcha form.</h2>';
    exit;
}
$response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LcYzAsTAAAAABlirLaDbqxGU6BQ6v8k0pa4nqET&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
if($response['success'] == false)
{
    echo '<h2>You are a spammer! Get the @$%K out!</h2>';
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

$mail->From = 'no-reply@colossus.com';
$mail->FromName = 'WebTeam';
$mail->AddAddress('vijayant.saini123@gmail.com', 'Vijayant');
$mail->AddAddress('chugh.ruchir@gmail.com', 'Ruchir');


$mail->IsHTML(true);

$mail->Subject = '[Form Submission] Contact-Us';
$mail->Body    = "Visitor entered the following:<br />Name: $_REQUEST[name]<br />Email: $_REQUEST[email]<br />Message: $_REQUEST[message]<br />";
$mail->AltBody = "Visitor entered the following:\nName: $_REQUEST[name]\nEmail: $_REQUEST[email]\nMessage: $_REQUEST[message]\n";

if(!$mail->Send()) {
   echo '2';
   ////echo 'Mailer Error: ' . $mail->ErrorInfo;
   exit;
}
//echo "1";

echo json_encode(array("success"=>true));


?>