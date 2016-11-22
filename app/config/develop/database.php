<?php

return array(

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
