<?php

	$email = $_POST['email'] ;
	$name = $_POST['name'] ;
	$surname = $_POST['surname'] ;
	$telephone = $_POST['telephone'];
	mail("aleksandra.poltorak.x@gmail.com", "E-Mail od: " .$name. " " .$surname." z formularza kontaktowego",
	"Proszę o kontakt w celu umówienia spotkania.\n Imię i nazwisko: " .$name. " " .$surname."\n E-Mail: " .$email. "\n Telefon: " .$telephone., "From:" . $email);

  ?>