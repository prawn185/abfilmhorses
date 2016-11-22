<?php

return array(

	'fetch' => PDO::FETCH_CLASS,

	'default' => 'mysql',

	'connections' => array(

		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => 'localhost',
			'database'  => 'abfilm',
			'username'  => 'root',
			'password'  => '',
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
		),

		'netmatters' => array(
			'driver'    => 'mysql',
			'host'      => 'localhost',
			'database'  => 'abfilm',
			'username'  => 'root',
			'password'  => '',
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
		),

	),

	'migrations' => 'migrations',

	'redis' => array(

		'cluster' => false,

		'default' => array(
			'host'     => 'redis',
			'port'     => 6379,
			'database' => 4,
		),

		'mirror' => array(
			'host'     => 'mirror',
			'port'     => 6379,
			'database' => 4,
		),

	),

);
