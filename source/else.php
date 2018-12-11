<?php
	$user_name = $_POST["superior-name"];
	$user_contacts= $_POST["superior-contacts"];
	$user_comment = $_POST["superior-question"];


	$to  = "<keynikel@gmail.com>" ;
	$subject = "Заказ особого предложения";
	$message = "Имя обратившегося: " . $user_name . "\r\n
				Контактные данные: " . $user_contacts . "\r\n
				Вопрос: " . $user_comment . "\r\n";
	$headers  = "Content-type: text/html; charset=utf8 \r\n";
	$headers .= "From: <" . $user_contacts . ">\r\n"; 


	echo $message;
	if (mail($to, $subject, $message, $headers)) echo "Письмо отправлено";
	else echo "Что-то пошло не так";


?>
