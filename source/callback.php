<?php
	$user_name = $_POST["callback-name"];
	$user_phone = $_POST["callback-phone"];
	$user_email = $_POST["callback-mail"];
	$user_company = $_POST["callback-company"];
	$user_services = "";
	$user_comment = $_POST["callback--comment"];

	if (isset($_POST["call--guides"])) $user_services = $_POST["call--guides"] . "; ";
	if (isset($_POST["call--housing"])) $user_services = $user_services . $_POST["call--housing"] . "; ";
	if (isset($_POST["call--transport"])) $user_services = $user_services . $_POST["call--transport"] . "; ";
	if (isset($_POST["call--events"])) $user_services = $user_services . $_POST["call--events"] . "; ";
	if (isset($_POST["call--visa"])) $user_services = $user_services . $_POST["call--visa"] . "; ";

	$to  = "<keynikel@gmail.com>" ;
	$subject = "Заказ обратного звонка"; 
	$message = "Имя обратившегося: " . $user_name . "\r\n 
				Телефон: " . $user_phone . "\r\n
				E-mail: " . $user_email . "\r\n
				Компания или частное лицо: " . $user_company . "\r\n
				Интересуется услугами: " . $user_services . "\r\n
				Доп. комментарий: " . $user_comment . "\r\n";
	$headers  = "Content-type: text/html; charset=utf8 \r\n"; 
	$headers .= "From: <" . $user_email . ">\r\n"; 

	if (mail($to, $subject, $message, $headers)) echo "Письмо отправлено";
	else echo "Что-то пошло не так";


?>
