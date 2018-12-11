<?php
	$user_name = $_POST["ask-name"];
	$user_phone = $_POST["ask-phone"];
	$user_email = $_POST["ask-mail"];
	$user_company = $_POST["ask-company"];
	$user_services = "";
	$user_comment = $_POST["ask--comment"];

	if (isset($_POST["ask--guides"])) $user_services = $_POST["ask--guides"] . "; ";
	if (isset($_POST["ask--housing"])) $user_services = $user_services . $_POST["ask--housing"] . "; ";
	if (isset($_POST["ask--transport"])) $user_services = $user_services . $_POST["ask--transport"] . "; ";
	if (isset($_POST["ask--events"])) $user_services = $user_services . $_POST["ask--events"] . "; ";
	if (isset($_POST["ask--visa"])) $user_services = $user_services . $_POST["ask--visa"] . "; ";

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


	echo $message;
	if (mail($to, $subject, $message, $headers)) echo "Письмо отправлено";
	else echo "Что-то пошло не так";


?>
