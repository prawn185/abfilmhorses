<?php

return [
    'frontend' => array(
        'enquiry' => [
            'name' => 'required',
            'telephone' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required|min:5',
            'robot'   => 'max:0',
        ],
    )
];
