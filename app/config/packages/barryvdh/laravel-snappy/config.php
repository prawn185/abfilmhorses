<?php

return array(
    'pdf' => array(
        'enabled' => true,
        'binary' => '/usr/local/bin/wkhtmltopdf',
        'options' => array(
            'page-height'             => '297mm',
            'page-width'              => '210mm',
            'viewport-size'           => '1024x1024',
            ),
    )
);
