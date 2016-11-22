<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Mail Driver
	|--------------------------------------------------------------------------
	|
	| Supported: "smtp", "mail", "sendmail", "mailgun", "mandrill", "log"
	|
	*/

	'driver' => 'mandrill',

	'host' => 'smtp.mandrillapp.com',

	'port' => 587,

	'from' => array('address' => 'website@sysflow.co.uk', 'name' => 'Sysflow'),

	'encryption' => 'tls',

	'username' => 'website@sysflow.co.uk',

	'password' => '8hRS5o01NKAbsLzcue_eww',

	'sendmail' => '/usr/sbin/sendmail -bs',

	'pretend' => false,

);
