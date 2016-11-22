<?php

return array(

	'debug' => false,

	'url' => 'http://demo.sysflow.co.uk',

	'timezone' => 'UTC',

	'locale' => 'en',

	'key' => 'MRCcp5lJJyYPNqQcn1GICRsYZbJ0Dlc5',

	'providers' => array(

		/* Laravel Service Providers */
        'Illuminate\Foundation\Providers\ArtisanServiceProvider',
        'Illuminate\Auth\AuthServiceProvider',

        'Illuminate\Cache\CacheServiceProvider',
        'Netmatters\Base\Core\Cache\MultiRedisCacheServiceProvider',
        'Illuminate\Session\CommandsServiceProvider',
        'Illuminate\Foundation\Providers\ConsoleSupportServiceProvider',
        'Illuminate\Routing\ControllerServiceProvider',
        'Illuminate\Cookie\CookieServiceProvider',
        'Illuminate\Database\DatabaseServiceProvider',
        'Illuminate\Encryption\EncryptionServiceProvider',
        'Illuminate\Filesystem\FilesystemServiceProvider',
        'Illuminate\Hashing\HashServiceProvider',
        'Illuminate\Html\HtmlServiceProvider',
        'Illuminate\Log\LogServiceProvider',
        'Illuminate\Mail\MailServiceProvider',
        'Illuminate\Database\MigrationServiceProvider',
        'Illuminate\Pagination\PaginationServiceProvider',
        'Illuminate\Queue\QueueServiceProvider',
        'Illuminate\Redis\RedisServiceProvider',
        'Illuminate\Remote\RemoteServiceProvider',
        'Illuminate\Auth\Reminders\ReminderServiceProvider',
        'Illuminate\Database\SeedServiceProvider',
        'Illuminate\Session\SessionServiceProvider',
        'Netmatters\Base\Core\Session\MultiRedisSessionServiceProvider',
        'Illuminate\Translation\TranslationServiceProvider',
        'Illuminate\Validation\ValidationServiceProvider',
        'Netmatters\Theme\View\ViewServiceProvider',
        'Illuminate\Workbench\WorkbenchServiceProvider',


		/* 3rd Party Service Providers */
        'Barryvdh\DomPDF\ServiceProvider',
        'Barryvdh\Snappy\ServiceProvider',
        'Baum\BaumServiceProvider',
        'Clockwork\Support\Laravel\ClockworkServiceProvider',
        'Iveoles\Image\ImageServiceProvider',
        'Ignited\LaravelOmnipay\LaravelOmnipayServiceProvider',
        'Thujohn\Twitter\TwitterServiceProvider',
        'Laracasts\Commander\CommanderServiceProvider',
        'Laracasts\Validation\ValidationServiceProvider',
        'Laracasts\Utilities\UtilitiesServiceProvider',
        'Maatwebsite\Excel\ExcelServiceProvider',
        'Roumen\Feed\FeedServiceProvider',
        'Mews\Captcha\CaptchaServiceProvider',


		/* Netmatters Service Providers */
        'Netmatters\Base\Providers\RoutingServiceProvider',
        'Netmatters\Base\BaseServiceProvider', /* Base must be loaded first */
        'Netmatters\Site\SiteServiceProvider',
        'Netmatters\Theme\ThemeServiceProvider',

        'Netmatters\Account\AccountServiceProvider',
        'Netmatters\Address\AddressServiceProvider',
        'Netmatters\Ads\AdsServiceProvider',
        'Netmatters\Article\ArticleServiceProvider',
        'Netmatters\Assets\AssetsServiceProvider',
        'Netmatters\Block\BlockServiceProvider',
        'Netmatters\Booking\BookingServiceProvider',
        'Netmatters\Cart\CartServiceProvider',
        'Netmatters\Contact\ContactServiceProvider',
        'Netmatters\Document\DocumentServiceProvider',
        'Netmatters\Email\EmailServiceProvider',
        'Netmatters\Enquiry\EnquiryServiceProvider',
        'Netmatters\Event\EventServiceProvider',
        'Netmatters\Gallery\GalleryServiceProvider',
        'Netmatters\History\HistoryServiceProvider',
        'Netmatters\Image\ImageServiceProvider',
        'Netmatters\Knowledgebase\KnowledgebaseServiceProvider',
        'Netmatters\Membership\MembershipServiceProvider',
        'Netmatters\Menu\MenuServiceProvider',
        'Netmatters\Newsletter\NewsletterServiceProvider',
        'Netmatters\Note\NoteServiceProvider',
        'Netmatters\Order\OrderServiceProvider',
        'Netmatters\Page\PageServiceProvider',
        'Netmatters\Product\ProductServiceProvider',
        'Netmatters\Quote\QuoteServiceProvider',
        'Netmatters\Related\RelatedServiceProvider',
        'Netmatters\Sitemap\SitemapServiceProvider',
        'Netmatters\Social\SocialServiceProvider',
        'Netmatters\Task\TaskServiceProvider',
        'Netmatters\Team\TeamServiceProvider',
        'Netmatters\Testimonial\TestimonialServiceProvider',
        'Netmatters\User\UserServiceProvider',
        'Netmatters\Widget\WidgetServiceProvider',

	),

    /**
    |--------------------------------------------------------------------------
    | Service Provider Manifest
    |--------------------------------------------------------------------------
    |
    | The service provider manifest is used by Laravel to lazy load service
    | providers which are not needed for each request, as well to keep a
    | list of all of the services. Here, you may set its storage spot.
    |
    */
    'manifest' => storage_path().'/meta',


    /**
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */
	'aliases' => [

        /* Laravel Facades */
        'App'             => 'Illuminate\Support\Facades\App',
        'Artisan'         => 'Illuminate\Support\Facades\Artisan',
        'Auth'            => 'Illuminate\Support\Facades\Auth',
        'Blade'           => 'Illuminate\Support\Facades\Blade',
        'Cache'           => 'Illuminate\Support\Facades\Cache',
        'ClassLoader'     => 'Illuminate\Support\ClassLoader',
        'Config'          => 'Illuminate\Support\Facades\Config',
        'Controller'      => 'Illuminate\Routing\Controller',
        'Cookie'          => 'Illuminate\Support\Facades\Cookie',
        'Crypt'           => 'Illuminate\Support\Facades\Crypt',
        'DB'              => 'Illuminate\Support\Facades\DB',
        'Eloquent'        => 'Illuminate\Database\Eloquent\Model',
        'Event'           => 'Illuminate\Support\Facades\Event',
        'File'            => 'Illuminate\Support\Facades\File',
        'Feed'            => 'Roumen\Feed\Facades\Feed',
        'Form'            => 'Illuminate\Support\Facades\Form',
        'Hash'            => 'Illuminate\Support\Facades\Hash',
        'HTML'            => 'Illuminate\Support\Facades\HTML',
        'Input'           => 'Illuminate\Support\Facades\Input',
        'Lang'            => 'Illuminate\Support\Facades\Lang',
        'Log'             => 'Illuminate\Support\Facades\Log',
        'Mail'            => 'Illuminate\Support\Facades\Mail',
        'Paginator'       => 'Illuminate\Support\Facades\Paginator',
        'Password'        => 'Illuminate\Support\Facades\Password',
        'Queue'           => 'Illuminate\Support\Facades\Queue',
        'Redirect'        => 'Illuminate\Support\Facades\Redirect',
        'Redis'           => 'Illuminate\Support\Facades\Redis',
        'Request'         => 'Illuminate\Support\Facades\Request',
        'Response'        => 'Illuminate\Support\Facades\Response',
        'Route'           => 'Illuminate\Support\Facades\Route',
        'Schema'          => 'Illuminate\Support\Facades\Schema',
        'Seeder'          => 'Illuminate\Database\Seeder',
        'Session'         => 'Illuminate\Support\Facades\Session',
        'SSH'             => 'Illuminate\Support\Facades\SSH',
        'Str'             => 'Illuminate\Support\Str',
        'URL'             => 'Illuminate\Support\Facades\URL',
        'Validator'       => 'Illuminate\Support\Facades\Validator',
        'View'            => 'Illuminate\Support\Facades\View',

        /* 3rd Party Facades */
        'PDF'             => 'Barryvdh\Snappy\Facades\SnappyPdf',
        'ImageHandler'    => 'Iveoles\Image\Facades\Image',
        'Carbon'          => 'Carbon\Carbon',
        'Omnipay'         => 'Ignited\LaravelOmnipay\Facades\OmnipayFacade',
        'Excel'           => 'Maatwebsite\Excel\Facades\Excel',
        'Captcha'         => 'Mews\Captcha\Facades\Captcha',
        'Twitter'         => 'Thujohn\Twitter\TwitterFacade',
    ],

);
