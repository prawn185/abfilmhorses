<?php

return array(
    "driver" => "smtp",
    "host" => "mailtrap.io",
    "port" => 2525,
    "from" => array(
        "address" => "from@exampe.com",
        "name" => "Example"
    ),
    "encryption" => "tls",
    "username" => "22991882760911308",
    "password" => "3ff28759e4665d",
    "sendmail" => "/usr/sbin/sendmail -bs",
    "pretend" => false
);
