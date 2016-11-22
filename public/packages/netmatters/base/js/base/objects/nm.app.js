/**
 *---------------------------------------------------------------
 * CREATE APPLICATION OBJECT
 *---------------------------------------------------------------
 */
var Application = function()
{
    // Window Size
    this.viewport = '';
    this.e = window;
    this.a = 'inner';

    // Dates
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getYear();

    // Set Hours
    this.hours = this.date.getHours();
    this.hours = (this.hours > 12) ? this.hours - 12 : this.hours;
    this.hours = (this.hours == 0) ? 12 : this.hours;

    // Set Mins
    this.minutes = this.date.getMinutes();
    this.minutes = (this.minutes < 10 ? "0" : "") + this.minutes;

    // Set Seconds
    this.seconds = this.date.getSeconds();
    this.seconds = (this.seconds < 10 ? "0" : "") + this.seconds;

    // Current date and time
    this.today = (this.day < 10 ? '0' : '') + this.day + '/' + (this.month < 10 ? '0' : '') + this.month + '/' + this.date.getFullYear();
    this.timeNow = this.hours + ":" + this.minutes + ":" + this.seconds;

    // Current time in to seconds
    this.hms = this.timeNow.split(':'); // split it at the colons
    this.timeInSeconds = (+this.hms[0]) * 60 * 60 + (+this.hms[1]) * 60 + (+this.hms[2]); // minutes are worth 60 seconds. Hours are worth 60 minutes.


    // Default Text
    this.error_msg = "<strong>Unfortunately an error occurred whilst processing your request, please contact the applicationlication Administrator for more assistance.<br /><br />Error Message:</strong> ";

    // Browser
    this.isIE6 = !!navigator.userAgent.match(/MSIE 6.0/);
    this.isIE7 = !!navigator.userAgent.match(/MSIE 7.0/);
    this.isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
    this.isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
    this.isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);
    this.isIE11 = !!navigator.userAgent.match(/MSIE 11.0/);

    if (this.isIE8) {
        jQuery('body').addClass('ie8');
        if (jQuery('#sidebar').hasClass('sidebar-fixed')) {
            jQuery('#sidebar').removeClass('sidebar-fixed');
            jQuery('#sidebar').addClass('sidebar-left');
        }
    } else {
        if (this.isIE9) {
            jQuery('body').addClass('ie9');
        } else {
            if (this.isIE10) {
                jQuery('body').addClass('ie10');
            }
        }
    }

    if (this.isIE10 || this.isIE9 || this.isIE8) {
        jQuery('body').addClass('ie'); // detect IE10 version
    }

    // User Device
    this.device_agent = navigator.userAgent.toLowerCase();

    if (this.device_agent.match(/(iphone|ipod|ipad)/)) {
        jQuery(document).on('focus', 'input, textarea', function()
        {
            jQuery('header').hide();
            jQuery('footer').hide();
        });
        jQuery(document).on('blur', 'input, textarea', function()
        {
            jQuery('header').show();
            jQuery('footer').show();
        });
    }

    // Sidebar
    this.sidebar_width = 235;
    this.sidebar_collapsed = 35;
};


/**
 *---------------------------------------------------------------
 * GET DATE
 *---------------------------------------------------------------
 */
Application.prototype.currentDate = function()
{
    return this.today;
};


/**
 *---------------------------------------------------------------
 * GET TIME
 *---------------------------------------------------------------
 */
Application.prototype.currentTime = function()
{
    return this.timeNow;
};


/**
 *---------------------------------------------------------------
 * GET TIME IN SECONDS
 *---------------------------------------------------------------
 */
Application.prototype.currentTimeInSeconds = function()
{
    return this.timeInSeconds;
};


/**
 *---------------------------------------------------------------
 * BROWSER: IS THIS IE8
 *---------------------------------------------------------------
 */
Application.prototype.isIE8 = function()
{
    return this.isIE8;
};


/**
 *---------------------------------------------------------------
 * BROWSER: IS THIS IE9
 *---------------------------------------------------------------
 */
Application.prototype.isIE9 = function()
{
    return this.isIE9;
};


/**
 *---------------------------------------------------------------
 * APP: IS THE TEXT LAYOUT RIGHT TO LEFT
 *---------------------------------------------------------------
 */
Application.prototype.isRTL = function()
{
    return this.isRTL;
};


/**
 *---------------------------------------------------------------
 * APP: IS THIS A TOUCH DEVICE
 *---------------------------------------------------------------
 */
Application.prototype.isTouchDevice = function()
{
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

/**
 *---------------------------------------------------------------
 * APP: GET SITE URL PARAMATERS
 *---------------------------------------------------------------
 */
Application.prototype.getURLParameter = function(paramName)
{
    //public function to get a paremeter by name from URL
    var searchString = window.location.search.substring(1), i, val, params = searchString.split("&");
    for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
            return unescape(val[1]);
        }
    }
    return null;
};


/**
 *---------------------------------------------------------------
 * WINDOW: HANDLE WIDTH
 *---------------------------------------------------------------
 */
Application.prototype.handleWindowWidth = function()
{
    if (!('innerWidth' in window)) {
        this.a = 'client';
        this.e = document.documentElement || document.body;
    }
    this.window_width = this.e[this.a + 'Width'];
    this.window_height = this.e[this.a + 'Height'];

    if (this.window_width < 750) {
        this.viewport = 'phone';

        // Resize tiles
        jQuery(".tile").each(function()
        {
            if (jQuery(this).hasClass('double') || jQuery(this).hasClass('double-down')) {
                jQuery(this).removeClass("double");
                jQuery(this).removeClass("double-down");
            }
        });

    } else {
        if (this.window_width > 750 && this.window_width < 974) {
            this.viewport = 'tablet';

        } else {
            if (this.window_width > 974 && this.window_width < 1182) {
                this.viewport = 'small_desktop';

            } else {
                if (this.window_width > 1182) {
                    this.viewport = 'large_desktop';
                }
            }
        }
    }
};


/**
 *---------------------------------------------------------------
 * WINDOW: HANDLE SCROLL
 *---------------------------------------------------------------
 */
Application.prototype.handleWindowScroll = function()
{
    if (jQuery(window).scrollTop() > 100) {

        // Change the top nav to fixed
        if (this.viewport !== 'phone') {
            //jQuery('.header-nav').addClass('navbar-fixed-top');
            jQuery('body').addClass('fixed-navbar');
            jQuery('#quick-load').css({
                top : '40px'
            });
        }

        // Hide top shortcut for phones
        if (this.viewport == 'phone') {
            jQuery('#top-shortcut').hide();
        } else {
            jQuery('#top-shortcut').show();
        }

    } else {
        if (jQuery(window).scrollTop() <= 100) {

            //jQuery('.header-nav').removeClass('navbar-fixed-top');
            //jQuery('body').removeClass('fixed-navbar');

            jQuery('#top-shortcut').hide();
            jQuery('#quick-load').css({
                top : '45px'
            });
        }
    }
};


/**
 *---------------------------------------------------------------
 * WINDOW: SCROLL TO ELEMENT
 *---------------------------------------------------------------
 */
Application.prototype.scrollTo = function(el, offeset)
{
    // Wrapper function to scroll(focus) to an element
    pos = (el && el.size() > 0) ? el.offset().top : 0;
    jQuery('html, body').animate({
        scrollTop : pos + (offeset ? offeset : 0)
    }, 'slow');
};


/**
 *---------------------------------------------------------------
 * WINDOW: HANDLE SIDEBAR
 *---------------------------------------------------------------
 * Set proper height for sidebar and content.
 * The content and sidebar height must be synced always.
 */
Application.prototype.handleSidebar = function()
{
    var body = jQuery('body');
    var content = jQuery('#main');
    var sidebar = jQuery('#sidebar');
    var height;
    var toggle = jQuery('.sidebar-toggle');

    // Set Sidebar & Content Height
    if (body.hasClass('sidebar-open') || body.hasClass('sidebar-closed')) {

        // Sidebar height
        height = this.window_height - jQuery('.header-nav').height() + 1;
        sidebar.attr('style', 'height:' + height + 'px !important');

        // Content Height
        if (height >= content.height()) {
            var contentHeight = height - 75;
            content.attr('style', 'min-height:' + contentHeight + 'px !important');
        }
    }

    // Toggle Method
    jQuery(document).on('click', '.sidebar-toggle', function()
    {
        if (body.hasClass('sidebar-closed')) {
            body.removeClass('sidebar-closed');
            body.addClass('sidebar-open');

        } else {
            body.removeClass('sidebar-open');
            body.addClass('sidebar-closed');
        }
    });

    // Sidebar Menu
    jQuery(document).on('click', '.account-detail', function()
    {
        $(this).toggleClass('active');
        $('#sidebar .account-menu').toggleClass('open');
    });

    // Sub nav
    $('#sidebar .nav-list > li > a').click(function()
    {
        if ($(this).parent('li').find('.sub-nav').length > 0) {
            $(this).parent('li').toggleClass('open');
            return false;
        }
    });
    $('#sidebar .nav-list > li').each(function(i, v)
    {
        if ($(this).find('.active').length > 0) {
            $(this).addClass('open');
        }
    });
};


/**
 *---------------------------------------------------------------
 * WINDOW: FULL SCREEN
 *---------------------------------------------------------------
 */
Application.prototype.handleFullScreen = function()
{
    // toggle full screen
    function toggleFullScreen()
    {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();

            } else {
                if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();

                } else {
                    if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                }
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();

            } else {
                if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();

                } else {
                    if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            }
        }
    }

    jQuery('#trigger_fullscreen').click(function()
    {
        toggleFullScreen();
    });
};


/**
 *---------------------------------------------------------------
 * FIX: INPUT PLACEHOLDERS
 *---------------------------------------------------------------
 * Fix input placeholder issue for IE8 and IE9
 */
Application.prototype.handleInputPlaceholder = function()
{
    // Fix html5 placeholder attribute for ie7 & ie8
    if (isIE8 || isIE9) {

        // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
        jQuery('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function()
        {
            var input = jQuery(this);

            if (input.val() === '' && input.attr("placeholder") !== '') {
                input.addClass("placeholder").val(input.attr('placeholder'));
            }

            input.focus(function()
            {
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });

            input.blur(function()
            {
                if (input.val() === '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            });
        });
    }
};


/**
 *---------------------------------------------------------------
 * AJAX: SHOW PRELOADER
 *---------------------------------------------------------------
 */
Application.prototype.blockUI = function(el)
{
    // Wrapper function to block element(indicate loading)
    var el = jQuery(el);
    jQuery("#long-load").show();
};


/**
 *---------------------------------------------------------------
 * AJAX: HIDE PRELOADER
 *---------------------------------------------------------------
 */
Application.prototype.unblockUI = function(el)
{
    // wrapper function to un-block element(finish loading)
    var el = jQuery(el);
    jQuery("#long-load")
        .delay(200)
        .fadeOut('fast', function()
        {
            jQuery("#long-load").hide();
        });
};


/**
 *---------------------------------------------------------------
 * INPUT: FORMATING
 *---------------------------------------------------------------
 */
Application.prototype.handleFormatting = function()
{
    // Numeric Input
    jQuery(document).on('keypress', '.number-field', function(key)
    {
        if ((key.charCode != 46 && key.charCode < 48) || (key.charCode !== 46 && key.charCode > 57)) {
            jQuery(this).closest('.form-group').addClass('has-error');
            return false;
        } else {
            jQuery(this).closest('.form-group').removeClass('has-error');
        }
    });
    jQuery(document).on('.focusout', '.number-field', function(e)
    {
        var str = jQuery(this).val();
        var newStr = str.replace(/(^\s+|\s+jQuery)/g, '');
        jQuery(this).val(newStr);
    });

    // Text Input
    jQuery(document).on('keypress', '.text-field', function(key)
    {
        if ((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 45)) {
            jQuery(this)
                .closest('.form-group')
                .addClass('has-error');
            return false;
        } else {
            jQuery(this)
                .closest('.form-group')
                .removeClass('has-error');
        }
    });
    jQuery(document).on('focusout', '.text-field', function(e)
    {
        var str = jQuery(this).val();
        var newStr = str.replace(/(^\s+|\s+jQuery)/g, '');
        jQuery(this).val(newStr);
    });
};


/**
 *---------------------------------------------------------------
 * LOCAL STORAGE: SET
 *---------------------------------------------------------------
 */
Application.prototype.setStorage = function(key, val)
{
    if ('localStorage' in window && window['localStorage'] !== null) {
        try {
            localStorage.setItem(key, val);
            console.log(key + ' : ' + val + ' saved to storage');

        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                console.log('Storage Quota exceeded!');
            }
        }
    } else {
        console.log('Unfortunatley your browser do not support local storage');
    }
};


/**
 *---------------------------------------------------------------
 * LOCAL STORAGE: GET
 *---------------------------------------------------------------
 */
Application.prototype.getStorage = function(key)
{
    if ('localStorage' in window && window['localStorage'] !== null) {
        try {
            console.log('Key:' + key + ' retrieved from storage');
            return localStorage.getItem(key);

        } catch (e) {
            console.log('Error: ' + e);
        }
    } else {
        console.log('Unfortunatley your browser do not support local storage');
    }
};


/**
 *---------------------------------------------------------------
 * LOCAL STORAGE: REMOVE
 *---------------------------------------------------------------
 */
Application.prototype.removeStorage = function(key)
{
    console.log(key + ' removed from storage');
    localStorage.removeItem(key);
};


/**
 *---------------------------------------------------------------
 * LOCAL STORAGE: CLEAR
 *---------------------------------------------------------------
 */
Application.prototype.clearStorage = function()
{
    localStorage.clear();
    console.log('storage now cleared');
};


/**
 *---------------------------------------------------------------
 * MAPS: STATIC
 *---------------------------------------------------------------
 */
Application.prototype.staticMap = function(address)
{
    // If the map-canvas exists
    var zoom = 16;
    var scale = 1;
    var width = 525;
    var height = 230;
    var mapType = 'roadmap';
    var sensor = false;
    var format = 'png';
    var refresh = true;
    var markers = 'size:mid%7Ccolor:red%7C' + address;

    return '<img src="http://maps.googleapis.com/maps/api/staticmap?center='
    + address + '&zoom='
    + zoom + '&scale='
    + scale + '&size='
    + width + 'x'
    + height + '&maptype='
    + mapType + '&sensor='
    + sensor + '&format='
    + format + '&visual_refresh='
    + refresh + '&markers='
    + markers + ' ">';
};


/**
 *---------------------------------------------------------------
 * MAPS: DYNAMIC
 *---------------------------------------------------------------
 */
Application.prototype.dynamicMap = function(address)
{
    // Google map variables
    var geocoder;
    var map;

    // Google Map setup
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-0.133, 51.500);
    var mapOptions = {
        zoom   : 15,
        center : latlng,
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Geocoder for the address
    geocoder.geocode({'address' : address}, function(results, status)
    {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                position : results[0].geometry.location,
                map      : map,
            });
        }
    });
};
