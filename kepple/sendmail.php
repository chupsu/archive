<?php
	use PHPMailer\PHPMailer\PHPMailer; 

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('en', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('kepple.website@gmail.com', 'Email from the Kepple website');
	//Кому отправить
	$mail->addAddress('hello@kepple.io');
	//Тема письма
	$mail->Subject = 'Email from the Kepple website';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Comment:</strong> '.$_POST['message'].'</p>';
	}

	$mail->Body = $body; 

	//Отправляем
	if (!$mail->send()) {
		$message = 'Error';
	} else {
		$message = 'Thank you! <br> Your message was sent successfully';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>