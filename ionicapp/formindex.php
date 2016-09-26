<?php
$to = "maxgroupinc.i3@gmail.com";
$subject = "Sent from federalpost.ca";

$message = '<html><body>';
// '</body></html>';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
header('Content-Type: application/json');
$op = $_GET['op'];
if('ship' == $op){
	$message .= 'Company name: '.$_POST['fullname'].'<br/>';
	$message .= 'Email: '.$_POST['email'].'<br/>';
	$message .= 'Phone: '.$_POST['phone'].'<br/>';
	$message .= '</body></html>';
	mail($to,$subject,$message,$headers);
	echo '{"m":"Sent!"}';
	die;
}
if('touch' == $op){
	$message .= 'Name: '.$_POST['name'].'<br/>';
	$message .= 'Email: '.$_POST['email'].'<br/>';
	$message .= 'Telephone: '.$_POST['telephone'].'<br/>';
	$message .= 'Message: '.$_POST['comments'].'<br/>';
	$message .= '</body></html>';
	mail($to,$subject,$message,$headers);
	echo '{"m":"Sent!"}';
	die;
}
die('denied');
