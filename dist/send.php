<?php

	$email = $_POST['emailV'] ;
	$name = $_POST['nameV'] ;
	$surname = $_POST['surnameV'] ;
	$telephone = $_POST['telephoneV'] ;
	$message = " Proszę o kontakt w celu umówienia spotkania.\n Imię i nazwisko: " .$name. " " .$surname."\n E-Mail: " .$email. "\n Telefon: " .$telephone. "  ";

	mail("aleksandra.poltorak.x@gmail.com", "E-Mail od: " .$name. " " .$surname." z formularza kontaktowego", $message, "From:" . $email);

  ?>