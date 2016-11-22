<?php

return array(
    'pdf' => array(
        'enabled' => true,
        'binary' => '"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"',
        'options' => array(
            'page-height'             => '297mm',
            'page-width'              => '210mm',
            'viewport-size'           => '1024x1024',
        ),
    )
);
