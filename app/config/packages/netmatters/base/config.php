<?php

/**
 * Module Config
 *
 * Keep all config items to one dimension
 * to allow updates, i.e no nested arrays
 * use key => val instead
 */
return [

    /**
     *---------------------------------------------------------------
     * Internal Account Id
     *---------------------------------------------------------------
     */
    'account_id'        => [1],

    /**
     *---------------------------------------------------------------
     * Company settings
     *---------------------------------------------------------------
     */
    'company_name'      => 'Sysflow',
    'company_email'     => 'sales@netmatters.com',
    'company_telephone' => '01603 51 50 07',
    'company_address'   => '11 Penfold Drive',
    'company_town'      => 'Wymondham',
    'company_county'    => 'Norfolk',
    'company_postcode'  => 'NR18 0WZ',
    'company_lat'       => ('52.575901'),
    'company_lng'       => ('1.136280'),

    'news_uploads'       => 'https://admin.netmatters.co.uk/uploads/',

    /**
     *---------------------------------------------------------------
     * Social settings
     *---------------------------------------------------------------
     */
    'twitter'           => 'https://twitter.com/netmattersltd',
    'facebook'          => 'https://www.facebook.com/netmatters',
    'linkedin'          => 'https://www.linkedin.com/company/netmatters-ltd',
    'google_plus'       => 'https://plus.google.com/+NetmattersCoUk/posts',

    /**
     *---------------------------------------------------------------
     * Netmatters customer settings
     *---------------------------------------------------------------
     */
    'netmatters_customer_id' => 135,
    'netmatters_domain_id'   => 2393,
    'netmatters_package_id'  => 2,
    'netmatters_api_key'     => 'D9407D44A368C45BCFCBEC41AA5D04F16233EDD0B4D795EE3AA2FE8C4A2FE2B7',

    /**
     *---------------------------------------------------------------
     * Route settings
     *---------------------------------------------------------------
     */
    'frontend_prefix'    => 'account',
    'admin_prefix'       => 'admin',
    'frontend_subdomain' => 'account.' . URL::to('/'),
    'admin_subdomain'    => 'admin.' . URL::to('/'),
    'logout_redirect'    => '/login',

    /**
     *---------------------------------------------------------------
     * File path settings
     *---------------------------------------------------------------
     */
    'upload_path' => 'uploads/gallery',
    'avatar_path' => 'uploads/users',

    /**
     *---------------------------------------------------------------
     * Theme settings
     *---------------------------------------------------------------
     */
    'theme'       => 'sysflow',
    'theme_path'  => app_path('theme'),

    /**
     *---------------------------------------------------------------
     * Auth settings
     *---------------------------------------------------------------
     * Seconds - 7 days = 604800
     */
    'enable_token_authentication' => true,
    'login_token_lifetime'        => 604800,
    'one_time_token_login'        => false,
];
