<?php 
$to = "esportsbridge@gmail.col-sm-4";
$subject = "Contact Rsponse";
$message ="This is a test email";
$header = 'From:<contact@esportsbridge.com>'."\r\n";
if(mail($to,$subject,$message,$handler)){
    Echo "Mail Sent succesfully"
}else{
    Echo "failed to deliver"
}
?>