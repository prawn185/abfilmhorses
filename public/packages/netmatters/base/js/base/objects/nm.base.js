
/**
 *---------------------------------------------------------------
 * FLIPCLOCK: GET CURRENT TIME
 *---------------------------------------------------------------
 */
function getCurrentTime()
{
    // Set the time variables
    var d = new Date();

    // Set Hours
    var hours = d.getHours();
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours == 0) ? 12 : hours;

    // Set Mins
    var minutes = d.getMinutes();
    minutes = (minutes < 10 ? "0" : "") + minutes;

    // Set Seconds
    var seconds = d.getSeconds();
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Current time
    var timeNow = hours + ":" + minutes + ":" + seconds;

    // Current time in to seconds
    var hms = timeNow.split(':'); // split it at the colons
    var timeInSeconds = (+hms[0]) * 60 * 60 + (+hms[1]) * 60 + (+hms[2]); // minutes are worth 60 seconds. Hours are worth 60 minutes.

    return timeInSeconds;
}


/**
 *---------------------------------------------------------------
 * FLIPCLOCK: UPDATE STATUS
 *---------------------------------------------------------------
 */
function updateStatus(status)
{
    jQuery.cookie("clockStatus", status, {path : '/'});
}


/**
 *---------------------------------------------------------------
 * FLIPCLOCK: UPDATE TIME
 *---------------------------------------------------------------
 */
function updateTime(time)
{
    jQuery.cookie("clockTime", time, {path : '/'});
}


/**
 * ---------------------------------------------------------------
 * SHOW: LOADING BAR
 * ---------------------------------------------------------------
 */
function showLoadingBar()
{
    $("body").append('<div id="loadingbar"></div>');
    $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
    $("#loadingbar").width((50 + Math.random() * 30) + "%");
}

/**
 * ---------------------------------------------------------------
 * HIDE: LOADING BAR
 * ---------------------------------------------------------------
 */
function hideLoadingBar()
{
    $("#loadingbar").width("101%").delay(200).fadeOut(400, function() {
        $(this).remove();
    });
}


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
jQuery(document).ready(function()
{
    // On document ready show preloader
    showLoadingBar();

    // Create the main application Object
    App = new Application();

    // On Ready check window size
    App.handleWindowWidth();
    App.handleSidebar();
    App.handleFormatting();


    // Handle Resize Event
    var resize;
    jQuery(window).resize(function()
    {
        if (resize) {
            clearTimeout(resize);
        }
        resize = setTimeout(function()
        {
            App.handleWindowWidth();
            App.handleSidebar();
        }, 50); // wait 50ms until window resize finishes.
    });


    // Handle Scroll Event
    jQuery(window).scroll(App.handleWindowScroll);

    var scroll;
    jQuery(window).scroll(function()
    {
        if (scroll) {
            clearTimeout(resize);
        }
        scroll = setTimeout(function()
        {
            App.handleWindowScroll();
        }, 50); // wait 50ms until window resize finishes.
    });


    // Load the required Jquery Components
    JqComponents = new JQueryComponents();
    JqComponents.handleEditable();
    JqComponents.handleDataTables();
    JqComponents.handleValidator();
    JqComponents.handleRedactor();

    // Load the required Bootstrap Components
    BsComponents = new BootstrapComponents();
    BsComponents.handleSpinners();
    BsComponents.handleSelectBox();
    BsComponents.handleCombobox();
    BsComponents.handleCheckBox();
    BsComponents.handleDatePicker();
    BsComponents.handleWizard();
    BsComponents.handleDeleteModal();
    BsComponents.handlePanels();
    BsComponents.handleMaxlength();
    BsComponents.handleTooltip();
    BsComponents.handlePopover();

    // Load the JQuery Ajax helpers
    JqAjax = new JQueryAjax();

    // Create the clock object
    if (jQuery().FlipClock()) {

        var clock = jQuery('.flip-clock-container').FlipClock({
            clockFace : 'MinuteCounter',
            countdown : false,
            autoStart : false,
        });

        // Is this a page refresh
        if (jQuery.cookie("clockStart") > 0) {
            if (jQuery.cookie("clockStatus") === 'start') {
                var start = jQuery.cookie("clockStart");
                var current = getCurrentTime();
                var time = current - start;
                clock.start();

            } else {
                var time = jQuery.cookie("clockTime");
            }
            updateTime(time);
            clock.setTime(time);
        }

        // Start function:
        jQuery(document).on('click', '.start-clock', function()
        {
            // If the clock has not yet been created then set the start time
            if (jQuery.cookie("clockStart") == null || jQuery.cookie("clockStart") == 0) {
                jQuery.cookie("clockStart", getCurrentTime(), {path : '/'});
            }

            // If the clock is not running and the user presses start then reset the start time
            if (jQuery.cookie("clockStatus") === 'reset' || jQuery.cookie("clockStatus") === 'stop') {
                var newStart = getCurrentTime() - jQuery.cookie("clockTime");
                jQuery.cookie("clockStart", newStart, {path : '/'});
            }

            // Start the clock and change the status
            clock.start();
            updateStatus('start');
        });

        // Stop function:
        jQuery(document).on('click', '.stop-clock', function()
        {
            // Stop the clock and change the status
            clock.stop();
            updateStatus('stop');

            // Log the current time to the cookie
            var time = clock.getTime();
            updateTime(time);
        });

        // Reset Function:
        jQuery(document).on('click', '.reset-clock', function()
        {
            // Stop the clock and reset the time
            clock.stop();
            clock.setTime(0);

            // Set the cookie to default
            jQuery.cookie("clockTime", 0, {path : '/'});
            jQuery.cookie("clockStart", 0, {path : '/'});

            // Remove the cookies
            jQuery.removeCookie("clockTime");
            jQuery.removeCookie("clockStart");

            // Change the status
            updateStatus('restart');
        });
    }

});


/**
 *---------------------------------------------------------------
 * WINDOW: LOAD
 *---------------------------------------------------------------
 */
jQuery(window).load(function()
{
    // On window load hide the loadingbar
    hideLoadingBar();
});


/**
 *---------------------------------------------------------------
 * AJAX: START
 *---------------------------------------------------------------
 */
jQuery(document).ajaxStart(function(data)
{
    showLoadingBar();
});


/**
 *---------------------------------------------------------------
 * AJAX: STOP
 *---------------------------------------------------------------
 */
jQuery(document).ajaxStop(function(data)
{
    hideLoadingBar();

    if (!jQuery('.selectpicker').hasClass("not-pretty")) {
        jQuery('.selectpicker').selectpicker();
    }
});
