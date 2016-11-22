<?php

return array(
    'name' => 'Contact Us',
    'url'  => '/contact-us',
    'enquiry_types' => array(
        2 => 'Enquiry Form',
        1 => 'Request a Callback'
    ),
    'email_to' => [
        Config::get('base::company_email'),
        'digital@netmatters.com'
    ]
);
