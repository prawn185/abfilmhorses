/**
 * App Object
 *
 * @type object
 */
var App = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        // Environment objects
        App.debug.init();
        App.browser.init();
        App.device.init();
        App.window.init();

        // Template objects
        App.header.init();
        App.breadcrumb.init();
        App.container.init();
        App.pageHead.init();
        App.sidebar.init();
        App.activityBar.init();

        // Utility objects
        App.ajax.init();
        App.storage.init();
        App.format.init();
        App.router.init();
        App.helper.init();
        App.message.init();
        App.map.init();

        // Elements
        App.select2.init();
    },


    /**
     * Log function for debugging
     */
    log: function(message) {
        if ("console" in window) {
            console.log(message);
        }
    },


    /**
     * Show loading bar function
     */
    showLoadingBar: function() {
        $("body").append('<div id="loadingbar"></div>');
        $("#loadingbar")
            .addClass("waiting")
            .append($("<dt/><dd/>"))
            .width((50 + Math.random() * 30) + "%");
    },


    /**
     * Hide loading bar function
     */
    hideLoadingBar: function() {
        $("#loadingbar")
            .width("101%")
            .delay(200)
            .fadeOut(400, function() {
                $(this).remove();
            });
    },


    /**
     * Block an element
     *
     * @param element
     */
    blockUI: function(element) {
        $(element).append(
            '<div class="loading">' +
                '<div class="preloader-wrapper small active">' +
                    '<div class="spinner-layer spinner-red-only">' +
                        '<div class="circle-clipper left">' +
                            '<div class="circle"></div>' +
                        '</div>' +
                        '<div class="gap-patch">' +
                            '<div class="circle"></div>' +
                        '</div>' +
                        '<div class="circle-clipper right">' +
                            '<div class="circle"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    },


    /**
     * Unblock an element
     *
     * @param element
     */
    unblockUI: function(element) {
        $(element).remove('.loading');
    }
};


/**
 * Document ready function
 *
 * When the document is ready
 * show the loading bar
 */
$(document).ready(function() {
    App.init();
    App.showLoadingBar();
});


/**
 * Window load functions
 *
 * Once the window has loaded
 * hide the loading bar
 */
$(window).load(function() {
    App.hideLoadingBar();
});


/**
 * Ajax start function
 */
$(document).ajaxStart(function(data) {
    App.showLoadingBar();
});


/**
 * Ajax stop function
 */
$(document).ajaxStop(function(data) {
    App.hideLoadingBar();
});

/**
 * App activityBar Object
 *
 * @type object
 */
App.activityBar = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.activityBar.handleHeight();
        App.activityBar.handleMenu();
        App.activityBar.handleToggle();
    },


    /**
     * Is the activity bar open
     *
     * @returns {*|jQuery}
     */
    isOpen: function() {
        return $('body').hasClass('activity-bar-open');
    },


    /**
     * Is the activity bar closed
     *
     * @returns {*|jQuery}
     */
    isClosed: function() {
        return $('body').hasClass('activity-bar-closed');
    },


    /**
     * Toggle the activity bar indicator
     */
    toggleIndicator: function() {
        $('.activity-bar-toggle').toggleClass('active');
    },


    /**
     * Set the activity bar status cookie
     *
     * @param value
     */
    setCookie: function(value) {
        $.cookie("activity_bar_status", value, { path: '/', expires: 7 });
    },


    /**
     * Get the activity bar height
     *
     * @returns {*|jQuery}
     */
    getHeight: function() {
        return $('#activity-bar').outerHeight();
    },


    /**
     * Handle the activity bar height
     */
    handleHeight: function() {
        var windowHeight     = App.window.getHeight();
        var headerHeight     = App.header.getHeight();
        var breadcrumbHeight = App.breadcrumb.getHeight();
        var pageHeadHeight   = App.pageHead.getHeight();
        var stickyActions    = $('#page-head .affix');
        var offset           = (headerHeight + breadcrumbHeight);

        // If this is a mobile device or the user is scrolling adjust the offset
        if (App.window.viewport == 'phone') {
            offset = (headerHeight + breadcrumbHeight + pageHeadHeight);
        }
        if (stickyActions.length) {
            offset = (headerHeight + stickyActions.outerHeight());
        }

        $('#activity-bar').attr('style', 'top:' + offset + 'px !important');
    },


    /**
     * Handle the activity bar open / closed toggle function
     */
    handleToggle: function() {

        // Handle the open indicator
        if (this.isOpen()) {
            this.toggleIndicator();
        }

        // Toggle Method
        $(document).on('click', '.activity-bar-toggle', function()
        {
            var body = $('body');
            if (App.activityBar.isClosed()) {
                App.activityBar.setCookie('1');
                App.activityBar.toggleIndicator();
                body.removeClass('activity-bar-closed').addClass('activity-bar-open');

            } else {
                App.activityBar.setCookie('0');
                App.activityBar.toggleIndicator();
                body.removeClass('activity-bar-open').addClass('activity-bar-closed');
            }
        });
    },


    /**
     * Handle the activity bar drop down menu function
     */
    handleMenu : function() {

        // Handle dropdown
        $(document).on('click', '#activity-bar .nav-list > li > a', function() {
            if ($(this).parent('li').find('.sub-nav').length > 0) {
                $(this).parent('li').toggleClass('open');
                return false;
            }
        });

        $('.activity-bar .nav-list > li').each(function(i, v)
        {
            if ($(this).find('.active').length > 0) {
                $(this).addClass('open');
            }
        });
    }
};
/**
 * App ajax Object
 *
 * @type object
 */
App.ajax = {

    /**
     * Object properties
     */
    method      : 'GET',
    dataType    : 'json',
    cache       : true,
    returnOrder : 'append',


    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

        return this;
    },


    /**
     * Set Method
     */
    setMethod: function(method) {
        this.method = method;
        return this;
    },


    /**
     * Set Data Type
     */
    setDataType: function(dataType) {
        this.dataType = dataType;
        return this;
    },


    /**
     * Set Cache
     */
    setCache: function(cache) {
        this.cache = cache;
        return this;
    },


    /**
     * Set Return Order
     */
    setReturnOrder: function(returnOrder) {
        this.returnOrder = returnOrder;
        return this;
    },


    /**
     * Shorthand full ajax request
     *
     * @param url       string
     * @param data      object any data you want to pass to the server
     *
     * @return object request
     */
    request: function(url, data) {
        return $.ajax({
            url      : url,
            data     : data || null,
            method   : App.ajax.method,
            dataType : App.ajax.dataType,
            cache    : App.ajax.cache
        });
    },


    /**
     * Load function
     *
     * @param url string
     * @param output string
     * @param callback
     */
    load: function(url, output, callback) {
        $(output).load(url + ' ' + output + ' > *', callback);
    },


    /**
     * Select list function
     *
     * @param url       string
     * @param output    string element to display the data
     * @param data      object any data you want to pass to the server
     * @param trigger   name of the trigger you want to listen for
     */
    selectList: function(url, output, data, trigger) {

        var request = App.ajax.request(url, data);

        // Success function
        request.success(function(data)
        {
            $(output).find('option').remove().end();

            $.each(data, function(key, val) {
                $(output).append(
                    $("<option/>", { value : key, text  : val })
                );
            });

            // After adding the new options to the select box refresh the select picker
            $('.selectpicker').selectpicker('refresh');

            $.event.trigger(trigger || "ajaxSelectSuccess", data);
            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' updated', 'success');
        });

        // Fail function
        request.fail(function(data) {
            $.event.trigger(trigger || "ajaxSelectFailed", data);
            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' update failed', 'danger');
        });
    },


    /**
     * Unordered list function
     *
     * @param url       string
     * @param output    string element to display the data
     * @param data      object any data you want to pass to the server
     * @param trigger   name of the trigger you want to listen for
     */
    unorderedList: function(url, output, data, trigger) {

        var request = App.ajax.request(url, data);

        // Success function
        request.success(function(data) {
            $(output).find('li').remove().end();

            $.each(result, function(key, val) {
                $(output).returnOrder(
                    '<li><a href="javascript:void(0)">' + val + '</a>'
                );
            });

            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' updated', 'success');
            $.event.trigger(trigger || "ajaxUnorderedSuccess", data);
        });

        // Fail function
        request.fail(function(data) {
            $.event.trigger(trigger || "ajaxUnorderedFailed", data);
            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' update failed', 'danger');
        });
    }
};

/**
 * BootstrapModal Object
 *
 * Use this object to create an abstracted
 * version of the Bootstrap Modal
 *
 * @param element
 * @constructor
 */
var BootstrapModal = function(element)
{
    // Get the bootstrap modal
    this.bsm            = element || jQuery('#modal');
    this.bsm_container  = this.bsm.find('.modal-dialog');
    this.bsm_header     = this.bsm.find('.modal-header');
    this.bsm_title      = this.bsm.find('.modal-header h4');
    this.bsm_body       = this.bsm.find('.modal-body');
    this.bsm_footer     = this.bsm.find('.modal-footer');

    // Set unique values on primary and secondary buttons
    this.bsm.find('.btn-primary').addClass('primary-action');
    this.bsm.find('.btn-default').addClass('secondary-action');

    this.bsm_primary = this.bsm.find('.primary-action');
    this.bsm_secondary = this.bsm.find('.secondary-action');

    // Reset the modal for use
    this.resetModal();
};


/**
 * Reset Modal function
 *
 * Use this function to reset all the
 * BootstrapModal properties back to their defaults
 */
BootstrapModal.prototype.resetModal = function()
{
    this.bsm_container.removeClass('large-modal');
    this.bsm_title.html('');
    this.bsm_body.html('');
    this.bsm_body.css({"min-height" : "100px"});
    this.bsm_primary
        .removeClass('btn-danger')
        .removeClass('btn-info')
        .removeClass('btn-warning')
        .removeClass('btn-success')
        .addClass('btn-primary')
        .attr("href", '#')
        .removeAttr('target')
        .html('Ok')
        .unbind("click");
    this.bsm_footer.hide();
};

/**
 * Bootstrap Object
 *
 * @type object
 */
App.bootstrap = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init : function()
    {
        App.bootstrap.handleAccordion();
        App.bootstrap.handleAlerts();
        App.bootstrap.handleAlertTimeout();
        App.bootstrap.handleCheckBox();
        App.bootstrap.handleComboBox();
        App.bootstrap.handleDatePicker();
        App.bootstrap.handleMaxLength();
        App.bootstrap.handlePopover();
        App.bootstrap.handleScrollers();
        App.bootstrap.handleSelectBox();
        App.bootstrap.handleSpinners();
        App.bootstrap.handleTab();
        App.bootstrap.handleTooltip();
        App.bootstrap.handleColourPicker();
        App.bootstrap.handleStickyActions();
    },


    /**
     * Notify user
     *
     * @param message
     * @param type
     */
    notifyUser : function(message, type)
    {
        // Notifications
        $.bootstrapGrowl(message, {
            ele             : 'body',   // which element to bootstrap component send to
            type            : type,     // (null, 'info', 'error', 'success')
            offset          : {from : 'bottom', amount : 50}, // 'top', or 'bottom'
            align           : 'right',  // ('left', 'right', or 'center')
            width           : 250,      // (integer, or 'auto')
            delay           : 4000,
            allow_dismiss   : true,
            stackup_spacing : 10        // spacing between consecutively stacked growls.
        });
    },


    /**
     * Handle accordion
     */
    handleAccordion : function()
    {
        var lastClicked;

        // Add scrollable class name if you need scrollable panes
        $(document).on('click', '.accordion.scrollable .accordion-toggle', function()
        {
            lastClicked = $(this);
        });

        $(document).on('show.bs.collapse', '.accordion.scrollable', function()
        {
            $('html,body').animate({
                scrollTop : lastClicked.offset().top - 150
            }, 'slow');
        });
    },


    /**
     * Handle alerts
     */
    handleAlerts : function()
    {
        $(document).on('click', '[data-close="alert"]', function(e)
        {
            $(this).parent('.alert').hide();
            e.preventDefault();
        });
    },


    /**
     * Handle alert timeout
     *
     * Hide notifications after 3.5 seconds
     */
    handleAlertTimeout : function()
    {
        setTimeout(function()
        {
            $('#message-area').find('.alert').fadeOut(700, function()
            {
                $('#message-area').find('.alert').remove();
            });
        }, 3500);
    },


    /**
     * Handle check box
     */
    handleCheckBox : function()
    {
        // Style radio and check boxes
        if (!$('input[type=radio], input[type=checkbox]').hasClass("not-pretty")) {

            $('.checkbox-styled input, .radio-styled input').each(function() {
                if ($(this).next('span').length === 0) {
                    $(this).after('<span></span>');
                }
            });
        }
    },


    /**
     * Handle combo box
     */
    handleComboBox : function()
    {
        $('.text-select').on('click', 'li a', function()
        {
            var value = $(this).text();
            $(this).parentsUntil('.form-group').children(".text-input").val(value);
        });
        if ($('.text-select').hasClass('selected')) {
            $(this).append('<i class="glyphicons ok_2"></i>');
        }
    },


    /**
     * Handle date picker
     */
    handleDatePicker : function()
    {
        // If date picker field is empty set to today's date
        if ($('.datepicker').val() === '' && $('.datepicker').data('autofill') !== false) {
            $('.datepicker').val(moment().format('dd/mm/yyyy'));
        }

        $('.datepicker').datepicker({
            format    : 'dd/mm/yyyy',
            weekStart : 1

        }).on('changeDate', function(ev)
        {
            $(this).change().blur().datepicker('hide');
        });
    },


    /**
     * Handle dropdown
     */
    handleDropdown : function()
    {
        // For touch supported devices disable the hoverable drop downs - data-hover="dropdown"
        if (App.device.hasTouch()) {
            $('[data-hover="dropdown"]').each(function()
            {
                $(this).parent().off("hover");
                $(this).off("hover");
            });
        }

        // Hold drop down on click
        $(document).on('click', '.dropdown-menu.hold-on-click', function(e)
        {
            e.stopPropagation();
        });
    },


    /**
     * Handle max length
     */
    handleMaxLength : function()
    {
        $('.maxlength').maxlength({
            alwaysShow        : true,
            threshold         : 10,
            warningClass      : "label label-default",
            limitReachedClass : "label label-danger"
        });
    },


    /**
     * Handle pop over
     */
    handlePopover : function()
    {
        $('.click-popover').popover({
            placement : 'auto'
        });
        $('.hover-popover').popover({
            placement : 'auto',
            trigger   : 'hover'
        });
        $('.focus-popover').popover({
            placement : 'auto',
            trigger   : 'focus'
        });
    },


    /**
     * Handle scrollers
     */
    handleScrollers : function()
    {
        // Handles scrollable contents using jQuery SlimScroll plugin.
        if (!$('.scroller').hasClass("no-scroller")) {
            $('.scroller').each(function()
            {
                var height;
                if ($(this).attr("data-height")) {
                    height = $(this).attr("data-height");

                } else {
                    height = $(this).height;
                }

                $(this).slimScroll({
                    size           : '7px',
                    color          : ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#555'),
                    railColor      : ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#333'),
                    position       : 'right',
                    height         : height,
                    alwaysVisible  : ($(this).attr("data-always-visible") == "1" ? true : false),
                    railVisible    : ($(this).attr("data-rail-visible") == "1" ? true : false),
                    disableFadeOut : true
                });
            });
        }
    },


    /**
     * Handle spinners
     */
    handleSpinners : function()
    {
        $(".spinner-percent").TouchSpin({
            inputGroupClass : 'input-group-sm',
            spinUpClass     : 'green',
            spinDownClass   : 'red',
            min             : -100,
            max             : 100,
            step            : 10,
            decimals        : 0,
            boostat         : 15,
            maxboostedstep  : 20
        });

        $(".spinner-currency").TouchSpin({
            inputGroupClass : 'input-group-sm',
            spinUpClass     : 'green',
            spinDownClass   : 'red',
            min             : -1000000000,
            max             : 1000000000,
            step            : 0.1,
            decimals        : 2,
            boostat         : 5,
            maxboostedstep  : 10
        });
    },


    /**
     * Handle select box
     */
    handleSelectBox : function()
    {
        if (!$('select').hasClass("not-pretty")) {
            $('select').addClass('selectpicker show-tick');
        }
        if (!$('.selectpicker').hasClass("not-pretty")) {

            // If mobile show mobile version
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                $('.selectpicker').selectpicker('mobile');

            } else {
                $('.selectpicker').selectpicker();
            }
        }
    },


    /**
     * Handle tab
     */
    handleTab : function()
    {
        // Handle ajax tabs
        $(document).on('click', 'a[data-toggle="tab"]', function(e)
        {
            e.preventDefault();

            if ($(this).attr("data-url")) {
                var tabLink = $(this);
                var ajaxUrl = $(this).attr("data-url");
                var tabPane = this.hash;

                // ajax load from data-url
                App.blockUI($(tabPane));
                $(tabPane).load(ajaxUrl, function(result) {
                    App.unblockUI(tabPane);
                    tabLink.tab('show');
                    App.jquery.refreshDataTables();
                });
            }
        });

        // Handle sticky tabs
        if (!$('a[data-toggle="tab"]').parents('.nav').hasClass("not-sticky")) {

            $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                var id  = $(this).parents('[role="tablist"]').attr('id');
                var key = 'lastTab';
                if (id) {
                    key += ':' + id;
                }
                App.storage.set(key, $(e.target).attr('href'))
            });

            $('[role="tablist"]').each(function(idx, elem)
            {
                var id  = $(elem).attr('id');
                var key = 'lastTab';
                if (id) {
                    key += ':' + id;
                }

                var lastTab = App.storage.get(key);
                if (lastTab) {

                    // Check for ajax
                    var tabLink = $('[href="' + lastTab + '"]');
                    if (tabLink.attr("data-url")) {
                        var ajaxUrl = tabLink.attr("data-url");
                        var tabPane = lastTab;

                        // ajax load from data-url
                        App.blockUI($(tabPane));
                        $(tabPane).load(ajaxUrl, function(result) {
                            App.unblockUI(tabPane);
                            tabLink.tab('show');
                        });

                    } else {
                        tabLink.tab('show');
                    }
                }
            });
        }
    },


    /**
     * Handle tooltip
     */
    handleTooltip : function()
    {
        $('.btn-tooltip').tooltip({
            placement : 'auto',
            container : 'body'
        });
        $('.top-tooltip').tooltip({
            placement : 'top',
            container : 'body'
        });
        $('.right-tooltip').tooltip({
            placement : 'right',
            container : 'body'
        });
        $('.bottom-tooltip').tooltip({
            placement : 'bottom',
            container : 'body'
        });
        $('.left-tooltip').tooltip({
            placement : 'left',
            container : 'body'
        });
    },


    /**
     * Handle colour picker
     */
    handleColourPicker: function()
    {
        $('.colorpicker-element').colorpicker({
            align: 'left'
        });
    },


    /**
     * Handle sticky actions
     *
     * This function is used to keep
     * the form buttons visible at all times
     */
    handleStickyActions : function()
    {
        $('#page-head').find('.container-fluid > .row').addClass('sticky-actions');
        $('.sticky-actions').affix({
            offset: {
                top: 95
            }
        });
    }
};


/**
 * Window load functions
 *
 * Once the window has
 * loaded create the object
 */
$(document).ready(function() {
    App.bootstrap.init();
});


/**
 * Ajax stop functions
 */
$(document).ajaxStop(function(data) {
    App.bootstrap.handleSelectBox();
});
/**
 * App breadcrumb Object
 *
 * @type object
 */
App.breadcrumb = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },

    /**
     * Get breadcrumb height
     *
     * @returns {*|jQuery}
     */
    getHeight: function() {
        return $('main .breadcrumbs').outerHeight();
    },


    /**
     * Handle breadcrumb height
     */
    handleHeight: function() {

    }
};
/**
 * App browser Object
 *
 * @type object
 */
App.browser = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.browser.handleIE();
    },


    /**
     * Get the user agent
     *
     * @returns {string}
     */
    getUserAgent: function() {
        return navigator.userAgent.toLowerCase();
    },


    /**
     * Is this internet explorer 6
     * @returns {boolean}
     */
    isIE6: function() {
        return !!navigator.userAgent.match(/MSIE 6.0/);
    },


    /**
     * Is this internet explorer 7
     *
     * @returns {boolean}
     */
    isIE7: function() {
        return !!navigator.userAgent.match(/MSIE 7.0/);
    },


    /**
     * Is this internet explorer 8
     *
     * @returns {boolean}
     */
    isIE8: function() {
        return !!navigator.userAgent.match(/MSIE 8.0/);
    },


    /**
     * Is this internet explorer 9
     *
     * @returns {boolean}
     */
    isIE9: function() {
        return !!navigator.userAgent.match(/MSIE 9.0/);
    },


    /**
     * Is this internet explorer 10
     *
     * @returns {boolean}
     */
    isIE10: function() {
        return !!navigator.userAgent.match(/MSIE 10.0/);
    },


    /**
     * Is this internet explorer 11
     *
     * @returns {boolean}
     */
    isIE11: function() {
        return !!navigator.userAgent.match(/MSIE 11.0/);
    },


    /**
     * Handle internet explorer
     */
    handleIE: function() {
        if (this.isIE8() || this.isIE9() || this.isIE10()) {
            $('body').addClass('ie');
        }
        if (this.isIE8()) {
            $('body').addClass('ie8');

        } else if(this.isIE9()) {
            $('body').addClass('ie9');

        } else if (this.isIE10()) {
            $('body').addClass('ie10');
        }
    }
};
/**
 * App container Object
 *
 * @type object
 */
App.container = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Get container height
     *
     * @returns {*|jQuery}
     */
    getHeight: function() {
        return $('#main').outerHeight();
    },


    /**
     * Handle container height
     */
    handleHeight: function(){
        if (App.window.getHeight() >= $('#main').height()) {
            var height = App.window.getHeight();
            if ($('header nav').length > 0) {
                height = height - App.header.getHeight();
            }
            if ($('main .breadcrumbs').length > 0) {
                height = height - App.breadcrumb.getHeight();
            }
            if ($('#page-head').length > 0) {
                height = height - App.pageHead.getHeight();
            }
            $('#main').attr('style', 'min-height:' + height + 'px !important');
        }
    }
};
/**
 * App debug Object
 *
 * @type object
 */
App.debug = {

    /**
     * Object properties
     */
    status: false,


    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.debug.get();
    },


    /**
     * Get the stored status
     */
    get: function() {
        if (App.storage.get('debug') && typeof App.storage.get('debug') !== 'undefined') {
            App.debug.status = App.storage.get('debug');
        }
        return App.debug.status;
    },


    /**
     * Store debug status
     */
    store: function(value) {
        App.storage.set('debug', value);
    },


    /**
     * Enable debugging
     */
    enable : function() {
        App.debug.status = true;
        App.debug.store(true);
        return 'debug enabled';
    },


    /**
     * Disable debugging
     */
    disable : function() {
        App.debug.status = false;
        App.debug.store(false);
        return 'debug disabled';
    }
};
/**
 * App device Object
 *
 * @type object
 */
App.device = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.device.handleDevice();
    },


    /**
     * Is this a smart device
     *
     * @returns {Array|{index: number, input: string}}
     */
    isSmart: function(){
        return App.browser.getUserAgent().match(/(iphone|ipod|ipad)/);
    },


    /**
     * Does this device have touch
     *
     * @returns {boolean}
     */
    hasTouch: function(){
        try {
            document.createEvent("TouchEvent");
            return true;

        } catch (e) {
            return false;
        }
    },


    /**
     * Handle this device
     */
    handleDevice: function() {

        // Fix for static header, footer
        if (this.isSmart()) {
            $(document).on('focus', 'input, textarea', function() {
                $('header').hide();
                $('footer').hide();
            });

            $(document).on('blur', 'input, textarea', function() {
                $('header').show();
                $('footer').show();
            });
        }
    }
};
/**
 * App editable form Object
 *
 * @type object
 */
App.editableForm = function() {

    /**
     * Object properties
     *
     * @type {App}
     */
    var _this = this;


    /**
     * Constructor
     *
     * Booting function
     *
     * @param form string
     */
    this.init = function(form) {
        this.setFormElements(form);
        this.setTriggers();
        this.bindEvents();
        this.disable();

        return this;
    };


    /**
     * Set form elements
     */
    this.setFormElements = function(form) {
        this.form = new App.form();
        this.form.init(form);
        this.createEditableElements();
        this.formState = this.form.bsf.find('.form-state');
        this.editBtn   = this.form.bsf.find('.edit-btn');
        this.cancelBtn = this.form.bsf.find('.cancel-btn');
        this.saveBtn   = this.form.bsf.find('.submit-btn');
    };


    /**
     * Create the editable elements for the form
     */
    this.createEditableElements = function() {

        // If there is a submit button then the user has update privileges
        if (this.form.bsf.find('button[type="submit"], input[type="submit"]').length > 0) {

            // Add state indicator
            this.form.bsf.find('.panel .pull-left').append('<i class="form-state mdi-action-lock-outline"></i>');

            // Add edit and cancel buttons
            this.form.bsf.find('.panel .actions')
                .prepend(
                    '<button type="button" title="Edit details" class="btn btn-sm btn-tooltip btn-default edit-btn">' +
                    '<span class="mdi-content-create"></span> Edit ' +
                    '</button>'
                )
                .prepend(
                    '<button type="button" title="Discard Changes" class="btn btn-sm btn-tooltip btn-default cancel-btn" style="display: none;">' +
                    '<span class="mdi-content-undo"></span> Cancel ' +
                    '</button>'
                );
        }
    };


    /**
     * Bind object events
     */
    this.bindEvents = function() {
        this.form.bindEvents();

        $(document).off('click', this.editBtn.selector).on('click', this.editBtn.selector, this.handleEditClick);
        $(document).off('click', this.form.cancelTrigger).on(this.form.cancelTrigger, this.handleCancelClick);
        $(document).off('click', this.form.submitTrigger).on(this.form.submitTrigger, this.handleSaveClick);
        $(document).off('click', this.form.ajaxSuccessTrigger).on(this.form.ajaxSuccessTrigger, this.handleAjaxSuccess);
        $(document).off('click', this.form.ajaxErrorTrigger).on(this.form.ajaxErrorTrigger, this.handleAjaxError);

        return this;
    };


    /**
     * Set object triggers
     */
    this.setTriggers = function() {
        this.editTrigger = this.form.createTriggerName('Edit');

        return this;
    };


    /**
     * Debug function
     */
    this.debug = function() {
        App.log(this.form);
        App.log('Edit Button: ' + this.editBtn.selector);
        App.log('Cancel Button: ' + this.cancelBtn.selector);
        App.log('Submit Button: ' + this.saveBtn.selector);

        App.log(this.editTrigger);
        App.log(this.form.cancelTrigger);
        App.log(this.form.submitTrigger);
        App.log(this.form.ajaxSuccessTrigger);
        App.log(this.form.ajaxErrorTrigger);
    };


    /**
     * Fire edit trigger function
     *
     * @param element
     */
    this.fireEditTrigger = function(element) {
        $.event.trigger(this.editTrigger, element);
    };


    /**
     * Set edit trigger
     *
     * @param value string
     */
    this.setEditTrigger = function(value) {
        this.editTrigger = value;
    };


    /**
     * Refresh select picker
     *
     * @returns {App.editableForm}
     */
    this.refreshSelectPicker = function() {
        $('.selectpicker').selectpicker('refresh');

        return this;
    };


    /**
     * Enable form fields
     */
    this.enable = function() {
        this.enableFormState();
        this.enableFormFields();
        this.refreshSelectPicker();

        return this;
    };


    /**
     * Disable form fields
     */
    this.disable = function() {
        this.form.resetValidation();
        this.disableFormState();
        this.disableFormFields();
        this.refreshSelectPicker();

        return this;
    };


    /**
     * Enable form fields
     */
    this.enableFormFields = function() {
        this.form.bsf.find('input, textarea, select').not('input[type=hidden]').each(function(index, value) {
            $(this).removeClass('disabled');
            $(this).addClass('enabled');
            $(this).prop('disabled', false);
        });

        return this;
    };


    /**
     * Disable form fields
     */
    this.disableFormFields = function() {
        this.form.bsf.find('input, textarea, select').not('input[type=hidden]').each(function(index, value) {
            $(this).removeClass('enabled');
            $(this).addClass('disabled');
            $(this).prop('disabled', true);
        });

        return this;
    };


    /**
     * Change form state to enabled
     */
    this.enableFormState = function() {
        this.editBtn.hide();
        this.cancelBtn.show();
        this.saveBtn.show();
        this.formState.addClass('mdi-action-lock-open');
        this.formState.removeClass('mdi-action-lock-outline');
        this.form.bsf.removeClass('disabled');
        this.form.bsf.addClass('enabled');

        if (this.form.bsf.find('.hasRedactor').length) {
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('> *').not('.form-control').show();
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('.redactor_editor').attr('contenteditable', 'true');
        }

        return this;
    };


    /**
     * Change form state to disabled
     */
    this.disableFormState = function() {
        this.cancelBtn.hide();
        this.saveBtn.hide();
        this.editBtn.show();
        this.formState.removeClass('mdi-action-lock-open');
        this.formState.addClass('mdi-action-lock-outline');
        this.form.bsf.removeClass('enabled');
        this.form.bsf.addClass('disabled');

        if (this.form.bsf.find('.hasRedactor').length) {
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('> *').not('.redactor_editor').hide();
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('.redactor_editor').attr('contenteditable', 'false');
        }

        return this;
    };


    /**
     * Handle edit click
     */
    this.handleEditClick = function(e) {
        _this.fireEditTrigger();
        _this.enable();
    };


    /**
     * Handle cancel click
     */
    this.handleCancelClick = function(e) {
        _this.disable();
    };


    /**
     * Handle save click
     */
    this.handleSaveClick = function(e) {
        e.preventDefault();

    };


    /**
     * Handle ajaxSuccess
     */
    this.handleAjaxSuccess = function(e) {
        _this.disable();
    };


    /**
     * Handle ajaxError
     */
    this.handleAjaxError = function(e) {
        _this.enable();
    };
};

/**
 * App form Object
 *
 * @type object
 */
App.form = function() {

    /**
     * Object properties
     *
     * @type {App}
     */
    var _this = this;


    /**
     * Constructor
     *
     * Booting function
     *
     * @param form string
     */
    this.init = function(form) {
        this.ajax      = true;
        this.validator = null;
        this.cancelBtn = null;
        this.submitBtn = null;
        this.rules     = {};
        this.messages  = {};
        this.ignore    = ":not(select:hidden, input:hidden, input:visible, textarea:visible)";

        this.setFormElements(form);
        this.resetValidation();
        this.setTriggers();
        this.bindEvents();
        this.handleValidator();

        return this;
    };


    /**
     * Set form elements
     *
     * @param form
     */
    this.setFormElements = function(form) {
        this.bsf = $(form);
        this.cancelBtn = this.getCancelBtn();
        this.submitBtn = this.getSubmitBtn();

        return this;
    };


    /**
     * Bind object events
     */
    this.bindEvents = function() {
        $(document).off('click', this.cancelBtn.selector).on('click', this.cancelBtn.selector, this.handleCancelClick);
        $(document).off('click', this.submitBtn.selector).on('click', this.submitBtn.selector, this.handleSubmitClick);

        return this;
    };


    /**
     * Check bindings
     *
     * List an elements bindings
     *
     * @param element
     */
    this.checkBindings = function(element) {
        $.each($(element).data('events'), function(i, e) {
            console.log(i, e);
        });
    };


    /**
     * Create trigger name
     *
     * This function create a unique trigger name
     */
    this.createTriggerName = function(value) {
        var formName    = this.bsf.selector;
        var triggerName = '';
        var words       = formName.replace('#', '').split('-');

        for (var i = 0 ; i < words.length; i++) {

            // Convert words to lowercase
            var lowerWord = words[i].toLowerCase().trim();

            // Convert the first letter of each additional word to uppercase
            if (i > 0) {
                triggerName += lowerWord.slice(0, 1).toUpperCase() + lowerWord.slice(1);

            } else {
                triggerName += lowerWord;
            }

            if (i != words.length -1) {
                triggerName += " ";
            }
        }
        triggerName[triggerName.length -1] = '';

        // Remove spaces, add the action name to the end and return
        return triggerName.replace(' ', '') + value;
    };


    /**
     * Set object triggers
     */
    this.setTriggers = function() {
        this.cancelTrigger      = this.createTriggerName('Cancel');
        this.submitTrigger      = this.createTriggerName('Submit');
        this.ajaxSuccessTrigger = this.createTriggerName('AjaxSuccess');
        this.ajaxErrorTrigger   = this.createTriggerName('AjaxError');

        return this;
    };



    /**
     * Debug function
     */
    this.debug = function() {
        App.log('Form: ' + this.bsf.selector);
        App.log('Cancel Button: ' + this.cancelBtn.selector);
        App.log('Submit Button: ' + this.submitBtn.selector);
        App.log(this.cancelTrigger);
        App.log(this.submitTrigger);
        App.log(this.ajaxSuccessTrigger);
        App.log(this.ajaxErrorTrigger);
    };


    /**
     * Get cancel button
     */
    this.getCancelBtn = function() {
        return this.bsf.find('.cancel-btn');
    };


    /**
     * Get submit button
     */
    this.getSubmitBtn = function() {
        var submitBtn = this.bsf.find('.submit-btn');
        if ($(submitBtn).length < 1) {
            submitBtn = this.bsf.find('button[type="submit"], input[type="submit"]');
            submitBtn.addClass('submit-btn');
        }
        return submitBtn;
    };


    /**
     * Fire cancel trigger function
     *
     * @param element
     */
    this.fireCancelTrigger = function(element) {
        $.event.trigger(this.cancelTrigger, element);
    };


    /**
     * Set cancel trigger
     *
     * @param value string
     */
    this.setCancelTrigger = function(value) {
        this.cancelTrigger = value;
    };


    /**
     * Fire submit trigger function
     *
     * @param element
     */
    this.fireSubmitTrigger = function(element) {
        $.event.trigger(this.submitTrigger, element);
    };


    /**
     * Set submit trigger
     *
     * @param value string
     */
    this.setSubmitTrigger = function(value) {
        this.submitTrigger = value;
    };


    /**
     * Fire ajaxSuccess trigger function
     *
     * @param element
     */
    this.fireAjaxSuccessTrigger = function(element) {
        $.event.trigger(this.ajaxSuccessTrigger, element);
    };


    /**
     * Set ajaxSuccess trigger
     *
     * @param value string
     */
    this.setAjaxSuccessTrigger = function(value) {
        this.ajaxSuccessTrigger = value;
    };


    /**
     * Fire ajaxError trigger function
     *
     * @param element
     */
    this.fireAjaxErrorTrigger = function(element) {
        $.event.trigger(this.ajaxErrorTrigger, element);
    };


    /**
     * Set ajaxError trigger
     *
     * @param value string
     */
    this.setAjaxErrorTrigger = function(value) {
        this.ajaxErrorTrigger = value;
    };


    /**
     * Get the form action
     */
    this.getAction = function() {
        return this.bsf.attr('action');
    };


    /**
     * Get the form data
     */
    this.getData = function() {
        return this.bsf.serialize();
    };


    /**
     * Validation function
     */
    this.validate = function() {
        return this.bsf.valid();
    };


    /**
     * Reset function
     */
    this.resetValidation = function() {
        this.bsf.find('.form-group').each(function(index, value) {
            $(this).removeClass('has-success');
            $(this).removeClass('has-error');
            $(this).find('.error-popup').hide();
        });

        return this;
    };


    /**
     * Submit function
     */
    this.submit = function() {
        this.bsf.submit();

        return this;
    };


    /**
     * Ajax submit function
     */
    this.ajaxSubmit = function() {
        App.ajax.setMethod('POST').request(this.getAction(), this.getData()).success(function(response) {
            _this.fireAjaxSuccessTrigger();
            App.bootstrap.notifyUser('Success: Changes saved', 'success');

        }).error(function(request, status, errorThrown) {
            _this.fireAjaxErrorTrigger();

            if (typeof request.responseJSON.errors !== 'undefined') {
                $.each(request.responseJSON.errors, function(key, error) {
                    App.log('Error: ' + error);
                    App.bootstrap.notifyUser('Error: <strong>' + error + '</strong>', 'danger');
                });

            } else {
                App.log('Error: ' + errorThrown);
                App.bootstrap.notifyUser('Error: <strong>' + errorThrown + '</strong>', 'danger');
            }
        });

        return this;
    };


    /**
     * Handle validator
     */
    this.handleValidator = function() {
        this.validator = this.bsf.validate({
            ignore   : ":not(select:hidden, input:hidden, input:visible, textarea:visible)",
            rules    : _this.rules,
            messages : _this.messages
        });

        return this;
    };


    /**
     * Handle cancel click
     */
    this.handleCancelClick = function(e) {
        e.preventDefault();
        _this.fireCancelTrigger();
    };


    /**
     * Handle submit click
     */
    this.handleSubmitClick = function(e) {
        e.preventDefault();

        _this.fireSubmitTrigger();

        if (_this.validate()) {
            if (_this.ajax) {
                _this.ajaxSubmit();

            } else {
                _this.submit();
            }

        } else {
            App.bootstrap.notifyUser('Validation failed: ' + _this.validator.numberOfInvalids() + ' field(s) are invalid', 'danger');
        }
        return false;
    };
};
/**
 * App format Object
 *
 * @type object
 */
App.format = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.format.handleNumberField();
        App.format.handleTextField();
    },


    /**
     * Handle number field formatting
     */
    handleNumberField: function() {
        $(document)
            .on('keypress', '.number-field', function(key) {
                if ((key.charCode != 46 && key.charCode < 48) || (key.charCode !== 46 && key.charCode > 57)) {
                    $(this).closest('.form-group').addClass('has-error');
                    return false;

                } else {
                    $(this).closest('.form-group').removeClass('has-error');
                }
            })
            .on('.focusout', '.number-field', function(e) {
                var str    = $(this).val();
                var newStr = str.replace(/(^\s+|\s+jQuery)/g, '');
                $(this).val(newStr);
            });
    },


    /**
     * Handle text field formatting
     */
    handleTextField: function() {
        $(document)
            .on('keypress', '.text-field', function(key) {
                if ((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 45)) {
                    $(this).closest('.form-group').addClass('has-error');
                    return false;

                } else {
                    $(this).closest('.form-group').removeClass('has-error');
                }
            })
            .on('focusout', '.text-field', function(e) {
                var str    = $(this).val();
                var newStr = str.replace(/(^\s+|\s+jQuery)/g, '');
                $(this).val(newStr);
            });
    }
};
/**
 * App header Object
 *
 * @type object
 */
App.header = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Get header height
     *
     * @returns {*|jQuery}
     */
    getHeight: function() {
        return $('header nav').outerHeight();
    },


    /**
     * Handle header height
     */
    handleHeight: function() {

    }
};
/**
 * App helper Object
 *
 * @type object
 */
App.helper = {

    /**
     * Object properties
     */
    csrfToken: null,


    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Set CSRF token
     *
     * @param token
     */
    setToken: function(token) {
        this.csrfToken = token;
    },


    /**
     * Get CSRF token
     *
     * @returns {*}
     */
    getToken: function() {
        if (this.csrfToken !== null) {
            return this.csrfToken;
        }
        return $('input[name="_token"]').val();
    },


    /**
     * Get word count function
     *
     * @param html
     * @returns {number|jQuery}
     */
    getWordCount : function(html)
    {
        // Remove any HTML tags, newlines and tabs, split by spaces and then count
        var count = $(html).text().replace(/\t+/g, " ").replace(/\n/g, "").split(' ').length;

        if ($(html).text().length) {
            // If there are HTML tags, remove them along with newlines and tabs, split by spaces and then count
            count = $(html).text().replace(/\t+/g, " ").replace(/\n/g, "").split(' ').length;

        } else {
            // Otherwise, just remove newlines and tabs, split by spaces and then count
            count = html.replace(/\t+/g, " ").replace(/\n/g, "").split(' ').length;
        }
        return count;
    }
};
/**
 * App Jquery Object
 *
 * @type object
 */
App.jquery = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.jquery.handleDataTables();
        App.jquery.handleRedactor();
        App.jquery.handleValidator();
        App.jquery.handleInputMask();
    },


    /**
     * Handle validator
     */
    handleValidator: function()
    {
        // Setup the Jquery Validation Defaults
        $.validator.setDefaults({
            doNotHideMessage : true,          // show the error/success messages on tab switch.
            errorElement     : 'span',        // default input error message container
            errorClass       : 'error-popup', // default input error message class
            focusInvalid     : false,         // do not focus the last invalid input

            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());

                } else {
                    error.insertAfter(element);
                }
            },

            highlight: function (element) {
                $(element)
                    .closest('.form-group')
                    .removeClass('has-success')
                    .addClass('has-error');
            },

            unhighlight: function (element) {
                if ($(element).closest('.form-group').hasClass('has-error')) {
                    $(element)
                        .closest('.form-group')
                        .removeClass('has-error')
                        .addClass('has-success');
                }
            },

            invalidHandler: function (event, validator) {
                App.window.scrollTo($('.form-horizontal'), -200);
            },

            onfocusout: function (element) {
                $(element).valid();
            },

            onchange: function (element) {
                $(element).valid();
            }
        });
    },


    /**
     * Refresh all data tables
     */
    refreshDataTables: function() {
        var tables = $('.table');

        // If the table has a URL add the POST function
        $.each(tables, function (index, value) {
            if ($(value).data('ajax')) {
                $(value).DataTable().clear().ajax.reload(null, false);
            }
        });

        return this;
    },


    /**
     * Handle data tables
     *
     * @param selector
     */
    handleDataTables: function(selector)
    {
        // If the plugin is not loaded then skip
        if (!jQuery().DataTable()) {
            return;
        }

        var tablesSelector = (typeof selector !== 'undefined') ? selector : '.data-tables';
        var tables         = $(tablesSelector);

        // Loop through tables and create data table object
        $.each(tables, function (index, value) {

            var options = {
                'order'   : [
                    [$(this).data('sort') || 0, $(this).data('order') || 'asc']
                ],
                'dom'         : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
                'stateSave'   : false,
                'deferRender' : true,
                'responsive'  : true,
                'autoWidth'   : false,
                'searchDelay' : 1500,

                'language'   : {
                    'paginate': {
                        'next'    : '<i class="mdi-navigation-arrow-forward"></i>',
                        'previous': '<i class="mdi-navigation-arrow-back"></i>'
                    },
                    'search'  : ""
                }
            };

            // If the table has a URL add the POST function
            if ($(value).data('ajax')) {
                options.ajax        = $(value).data('ajax');
                options.processing  = true;
                options.serverSide  = true;
            }

            // Create data table
            $(value).DataTable(options);
        });

        $('.dataTables_filter input[type=search]').attr('placeholder', 'Search...');
    },


    /**
     * Handle masked form inputs
     */
    handleInputMask: function()
    {
        $('.mask-time').mask('00:00:00');
        $('.mask-date').mask('11/11/1111');
        $('.mask-date-time').mask('00/00/0000 00:00:00');
        $('.mask-money').mask('000.000.000.000.000,00', {reverse : true});
        $('.mask-number').mask("#,##0", {reverse : true, maxlength : false});
        $('.mask-phone').mask('000000000000000');
        $('.mask-mobile').mask('000000000000000');
        $('.mask-postcode').on('keyup', function() {
            console.log('hi');
            $(this).val($(this).val().toUpperCase());
        });
    },


    /**
     * Get redactor language
     */
    getRedactorLangs: function()
    {
        return {
            en: {
                html               : 'HTML',
                video              : 'Insert Video',
                image              : 'Insert Image',
                table              : 'Table',
                link               : 'Link',
                link_insert        : 'Insert link',
                link_edit          : 'Edit link',
                unlink             : 'Unlink',
                formatting         : 'Formatting',
                paragraph          : 'Normal text',
                quote              : 'Quote',
                code               : 'Code',
                header1            : 'Header 1',
                header2            : 'Header 2',
                header3            : 'Header 3',
                header4            : 'Header 4',
                header5            : 'Header 5',
                bold               : 'Bold',
                italic             : 'Italic',
                fontcolor          : 'Font Color',
                backcolor          : 'Back Color',
                unorderedlist      : 'Unordered List',
                orderedlist        : 'Ordered List',
                outdent            : 'Outdent',
                indent             : 'Indent',
                cancel             : 'Cancel',
                insert             : 'Insert',
                save               : 'Save',
                _delete            : 'Delete',
                insert_table       : 'Insert Table',
                insert_row_above   : 'Add Row Above',
                insert_row_below   : 'Add Row Below',
                insert_column_left : 'Add Column Left',
                insert_column_right: 'Add Column Right',
                delete_column      : 'Delete Column',
                delete_row         : 'Delete Row',
                delete_table       : 'Delete Table',
                rows               : 'Rows',
                columns            : 'Columns',
                add_head           : 'Add Head',
                delete_head        : 'Delete Head',
                title              : 'Title',
                image_position     : 'Position',
                none               : 'None',
                left               : 'Left',
                right              : 'Right',
                center             : 'Center',
                image_web_link     : 'Image Web Link',
                text               : 'Text',
                mailto             : 'Email',
                web                : 'URL',
                video_html_code    : 'Video Embed Code',
                file               : 'Insert File',
                upload             : 'Upload',
                download           : 'Download',
                choose             : 'Choose Existing',
                or_choose          : 'Or choose',
                drop_file_here     : 'Drop file here',
                align_left         : 'Align text to the left',
                align_center       : 'Center text',
                align_right        : 'Align text to the right',
                align_justify      : 'Justify text',
                horizontalrule     : 'Insert Horizontal Rule',
                deleted            : 'Deleted',
                anchor             : 'Anchor',
                link_new_tab       : 'Open link in new tab',
                underline          : 'Underline',
                alignment          : 'Alignment',
                filename           : 'Name (optional)',
                edit               : 'Edit Or Drag to Resize'
            }
        };
    },


    /**
     * Handle redactor
     */
    handleRedactor: function()
    {
        if ($('.hasRedactor').length > 0) {

            // Get the controller URL and initialize redactor
            var url         = $('.hasRedactor').data("url");
            var documentUrl = $('.hasRedactor').data("document-url");

            var redactor    = $('.hasRedactor').redactor({
                focus            : true,
                minHeight        : 350,
                maxHeight        : 350,
                convertDivs      : false,
                convertVideoLinks: true,
                removeEmptyTags  : false,

                buttons: [
                    'html', 'formatting', 'bold', 'italic', 'deleted',
                    'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image',
                    'video', 'table', 'link', 'alignment', 'horizontalrule', // 'file',
                    'underline', 'alignleft', 'aligncenter', 'alignright', 'justify'
                ],

                imageGetJson      : url + 'list',
                clipboardUploadUrl: url + 'copy',
                imageUpload       : url + 'upload',
                predefinedLinks   : documentUrl,
                uploadFields      : {'_token': App.helper.getToken()},
                langs             : App.jquery.getRedactorLangs(),

                initCallback: function () {
                    var content = this.get();
                    var words   = App.helper.getWordCount(content);
                    $('.word-count').html('Word count: ' + words);
                },

                changeCallback: function (html) {
                    var content = html;
                    var words   = App.helper.getWordCount(content);
                    $('.word-count').html('Word count: ' + words);
                }
            });
        }
    }
};


/**
 * Window load functions
 *
 * Once the window has
 * loaded create the object
 */
$(document).ready(function() {
    App.jquery.init();
});
/**
 * App map Object
 *
 * @type object
 */
App.map = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Static google map function
     *
     * @param address
     * @returns {string}
     */
    static: function(address) {

        // Clean the address
        address = address.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

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

    },


    /**
     * Dynamic Google maps function
     *
     * @param address
     */
    dynamic: function(address) {

        // Clean the address
        address = address.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        // Google map variables
        var geocoder;
        var map;

        // Google Map setup
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-0.133, 51.500);
        var mapOptions = {
            zoom   : 15,
            center : latlng
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Geo coder for the address
        geocoder.geocode({'address' : address}, function(results, status)
        {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    position : results[0].geometry.location,
                    map      : map
                });
            }
        });
    }
};
/**
 * App message Object
 *
 * @type object
 */
App.message = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * General error message
     *
     * @returns {string}
     */
    error : function(){
        return "<strong>Unfortunately an error occurred whilst processing your request, "
            + "please contact the application Administrator for more assistance."
            + "<br /><br />Error Message:</strong> ";
    }
};
/**
 * App modal Object
 *
 * @type object
 */
App.modal = new function() {

    /**
     * Constructor Function
     *
     * Boot function
     */
    this.init = function() {
        this.setModalElement();
        this.reset();
        this.setTriggers();
        this.bindEvents();
    };


    /**
     * Bind the object events
     */
    this.bindEvents = function() {
        $(document).on('click', this.primaryBtn.selector, this.handlePrimaryClick);
        $(document).on('click', this.secondaryBtn.selector, this.handleSecondaryClick);
        $(document).on('click', this.closeBtn.selector, this.handleCloseClick);
    };


    /**
     * Set the modal element
     */
    this.setModalElement = function() {
        this.bsm          = $('#modal');
        this.container    = this.bsm.find('.modal-dialog');
        this.header       = this.bsm.find('.modal-header');
        this.title        = this.bsm.find('.modal-header h4');
        this.body         = this.bsm.find('.modal-body');
        this.footer       = this.bsm.find('.modal-footer');
        this.primaryBtn   = this.bsm.find('.primary-action');
        this.secondaryBtn = this.bsm.find('.secondary-action');
        this.closeBtn     = this.bsm.find('.close-action');
    };


    /**
     * Set object triggers
     */
    this.setTriggers = function() {
        this.primaryTrigger   = 'modalPrimary';
        this.secondaryTrigger = 'modalSecondary';
        this.closeTrigger     = 'modalClose';
        this.loadTrigger      = 'modalLoaded';
    };


    /**
     * Set title value
     *
     * @param value
     */
    this.setTitle = function(value) {
        this.title.html(value);
    };


    /**
     * Get title value
     */
    this.getTitle = function() {
        return this.title.html;
    };


    /**
     * Set body value
     *
     * @param value
     */
    this.setBody = function(value) {
        this.body.html(value);
    };


    /**
     * Get body value
     */
    this.getBody = function() {
        return this.body.html;
    };


    /**
     * Load function
     *
     * This function is used to load
     * ajax data into the modal body
     *
     * @param url
     */
    this.load = function(url) {
        this.setBody('<div class="modal-message">Loading please wait ....</div>');
        this.body.load(url, function(element) {
            App.modal.fireLoadTrigger();
        });
    };


    /**
     * Show the modal
     */
    this.show = function() {
        this.bsm.modal('show');
    };


    /**
     * Hide the modal
     */
    this.hide = function() {
        this.bsm.modal('hide');
    };


    /**
     * Show the header element
     */
    this.showHeader = function() {
        this.header.show();
    };


    /**
     * Hide the header element
     */
    this.hideHeader = function() {
        this.header.hide();
    };


    /**
     * Show the body element
     */
    this.showBody = function() {
        this.body.show();
    };


    /**
     * Hide the body element
     */
    this.hideBody = function() {
        this.body.hide();
    };


    /**
     * Set modal height
     *
     * @param value
     */
    this.setHeight = function(value) {
        this.body.css('height', value);
    };


    /**
     * Allow overflow
     */
    this.allowOverflow = function() {
        this.body.css('overflow', 'visible');
    };


    /**
     * Show the footer element
     */
    this.showFooter = function() {
        this.footer.show();
    };


    /**
     * Hide the footer element
     */
    this.hideFooter = function() {
        this.footer.hide();
    };


    /**
     * Force choice
     *
     * Force the user to use the primary
     * or secondary button.
     */
    this.forceChoice = function() {
        this.bsm.modal({
            keyboard: false,
            backdrop: 'static'
        });
        this.closeBtn.removeAttr('data-dismiss');
    };


    /**
     * Set load trigger
     *
     * @param value string
     */
    this.setLoadTrigger = function(value) {
        this.loadTrigger = value;
    };


    /**
     * Fire load trigger function
     *
     * @param element
     */
    this.fireLoadTrigger = function(element) {
        $.event.trigger(this.loadTrigger, element);
    };


    /**
     * Set primary trigger
     *
     * @param value string
     */
    this.setPrimaryTrigger = function(value) {
        this.primaryTrigger = value;
    };


    /**
     * Fire primary trigger function
     *
     * @param element
     */
    this.firePrimaryTrigger = function(element) {
        $.event.trigger(this.primaryTrigger, element);
    };


    /**
     * Set secondary trigger
     *
     * @param value string
     */
    this.setSecondaryTrigger = function(value) {
        this.secondaryTrigger = value;
    };


    /**
     * Fire secondary trigger function
     *
     * @param element
     */
    this.fireSecondaryTrigger = function(element) {
        $.event.trigger(this.secondaryTrigger, element);
    };


    /**
     * Set close trigger
     *
     * @param value string
     */
    this.setCloseTrigger = function(value) {
        this.closeTrigger = value;
    };


    /**
     * Fire close trigger function
     *
     * @param element
     */
    this.fireCloseTrigger = function(element) {
        $.event.trigger(this.closeTrigger, element);
    };


    /**
     * Hide backdrop
     */
    this.hideBackdrop = function() {
        this.bsm.modal({backdrop: false});
    };


    /**
     * Main reset function
     */
    this.reset = function() {
        this.hideFooter();
        this.resetContainer();
        this.resetTitle();
        this.resetBody();
        this.resetPrimaryBtn();
        this.resetSecondaryBtn();
        this.resetCloseBtn();
    };


    /**
     * Reset container
     */
    this.resetContainer = function() {
        this.container.removeClass('prompt');
        this.container.removeClass('large-modal');
    };


    /**
     * Reset title
     */
    this.resetTitle = function() {
        this.setTitle('');
    };


    /**
     * Reset body
     */
    this.resetBody = function() {
        this.setBody('');
        this.body.css('height', 'auto');
        this.body.css('min-height', '50px');
        this.body.css('overflow', 'inherit');
    };


    /**
     * Reset primary button
     */
    this.resetPrimaryBtn = function() {
        this.primaryBtn
            .removeClass('btn-danger')
            .removeClass('btn-info')
            .removeClass('btn-warning')
            .removeClass('btn-success')
            .addClass('btn-primary')
            .attr("href", 'javascript:void(0)')
            .removeAttr('target')
            .html('Ok')
            .unbind("click");
    };


    /**
     * Reset close button
     */
    this.resetCloseBtn = function() {
        this.closeBtn.attr('data-dismiss', 'modal');
    };


    /**
     * Reset secondary button
     */
    this.resetSecondaryBtn = function() {
        this.secondaryBtn.attr('data-dismiss', 'modal');
    };


    /**
     * Handle the primary click
     */
    this.handlePrimaryClick = function(event) {
        event.preventDefault();
        App.modal.firePrimaryTrigger();
        $(document).off('click', App.modal.primaryBtn.selector);
    };


    /**
     * Handle the secondary click
     */
    this.handleSecondaryClick = function(event) {
        event.preventDefault();
        App.modal.fireSecondaryTrigger();
        $(document).off('click', App.modal.secondaryBtn.selector);
    };


    /**
     * Handle the close click
     */
    this.handleCloseClick = function(event) {
        event.preventDefault();
        App.modal.fireCloseTrigger();
        $(document).off('click', App.modal.closeBtn.selector);
    };
};
/**
 * App pageHead Object
 *
 * @type object
 */
App.pageHead = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Get breadcrumb height
     *
     * @returns {*|jQuery}
     */
    getHeight: function() {
        return $('#page-head').outerHeight();
    },


    /**
     * Set breadcrumb height
     */
    setHeight: function() {

    }
};
/**
 * App prompt Object
 *
 * @type object
 */
App.prompt = {

    /**
     * Object properties
     */
    modal: null,


    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        this.modal = App.modal;
        this.modal.init();
        this.modal.hideHeader();
        this.modal.showFooter();
        this.bindEvents();
        this.handlePrompt();
        this.modal.forceChoice();
        this.modal.primaryBtn.html('Accept');
    },


    /**
     * Bind the object events
     */
    bindEvents: function() {
        $(document).on('modalPrimary', this.handlePrimaryClick);
        $(document).on('modalSecondary', this.handleSecondaryClick);
        $(document).on('modalClose', this.handleCloseClick);
    },


    /**
     * Prompt icon
     *
     * @param icon string
     */
    icon: function(icon) {
        this.modal.body.append('<div class="prompt-icon"><i class="' + icon + '"</i></div>');
    },


    /**
     * Prompt title
     *
     * @param title string
     */
    title: function(title) {
        this.modal.body.append('<div class="prompt-title">' + title + '</div>');
    },


    /**
     * Prompt message
     *
     * @param message string
     */
    message: function(message) {
        this.modal.body.append('<div class="prompt-message">' + message + '</div>');
    },


    /**
     * Show function
     */
    show : function() {
        this.modal.show();
    },


    /**
     * Hide function
     */
    hide: function() {
        this.modal.hide();
    },


    /**
     * Handle the primary click
     */
    handlePrimaryClick: function(element) {
        //App.log('Hey you fired the primary trigger');
        App.prompt.hide();
    },


    /**
     * Handle the secondary click
     */
    handleSecondaryClick: function(element) {
        //App.log('Hey you fired the secondary trigger');
    },


    /**
     * Handle the close click
     */
    handleCloseClick: function(element) {
        //App.log('Hey you fired the close trigger');
    },


    /**
     * Handle prompt
     */
    handlePrompt: function() {
        this.modal.container.addClass('prompt');
    }
};
/**
 * App router Object
 *
 * @type object
 */
App.router = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.router.getRoutes();
    },


    /**
     * Get route by name
     *
     * @param name
     */
    getRoute: function(name) {
        App.ajax.request(App.baseUrl + '/api/v1/route', {name:name}).success(function(data) {
            return data;
        });
    },


    /**
     * Get routes
     */
    getRoutes: function() {
        var nextCheck;
        var cachedRoutes;
        var currentTime  = moment();

        if (App.debug.get() == false && App.storage.get('routes')) {
            cachedRoutes = App.storage.get('routes');
            nextCheck = moment(cachedRoutes.nextCheck);
        }

        // If the current time is greater than the next check then refresh the routes
        if (typeof nextCheck === 'object' && nextCheck.isAfter(currentTime)) {
            App.routes = cachedRoutes;

        } else {
            App.router.setRoutes();
        }
    },


    /**
     * Set routes
     */
    setRoutes: function()
    {
        App.ajax.request(App.baseUrl + '/api/v1/routes').success(function(data)
        {
            App.routes = data;
            App.routes.lastCheck = moment();
            App.routes.nextCheck = moment().add(1, 'hour');
            App.storage.set('routes', App.routes);
        });
    }
};
/**
 * App select2 Object
 *
 * @type object
 */
App.select2 = {

    /**
     * Object properties
     */
    results : [],

    /**
     * Constructor Function
     *
     * Boot function
     */
    init : function()
    {
        App.select2.handle();
    },


    /**
     * Ajax object
     */
    getAjax : function() {
        return {
            url      : $('.select2').data('select-ajax-url'),
            dataType : 'json',
            delay    : 250,
            data     : function(params) {
                return {
                    q    : params.term, // search term
                    page : params.page
                };
            },
            processResults : function(data, page) {
                App.select2.formatResults(data);
                return {
                    results : App.select2.results
                }
            },
            cache              : true,
            minimumInputLength : 1

        }
    },


    /**
     * Format results function
     *
     * @param data
     * @returns {Array}
     */
    formatResults : function(data)
    {
        $.each(data, function(index, item)
        {
            App.select2.results.push({
                'id'   : item.id,
                'text' : item.name
            });
        });
    },


    /**
     * Handle the select2 element
     */
    handle : function()
    {

        //if($('.select2').data('select-ajax-url')) {

            $('.select2').select2({
                ajax : App.select2.getAjax()
            });

        //} else {
        //    $('.select2').select2();
        //}

    }


};
/**
 * App sidebar Object
 *
 * @type object
 */
App.sidebar = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.sidebar.handleHeight();
        App.sidebar.handleMenu();
        App.sidebar.handleToggle();
    },


    /**
     * Is the sidebar open
     *
     * @returns {*|jQuery}
     */
    isOpen: function() {
        return $('body').hasClass('sidebar-open');
    },


    /**
     * Is the sidebar closed
     *
     * @returns {*|jQuery}
     */
    isClosed: function() {
        return $('body').hasClass('sidebar-closed');
    },


    /**
     * Toggle the sidebar indicator
     */
    toggleIndicator: function() {
        $('.triangle-icon').toggleClass('left-pointing').toggleClass('right-pointing');
    },


    /**
     * Set the sidebar cookie status
     *
     * @param value
     */
    setCookie: function(value) {
        $.cookie("sidebar_status", value, { path: '/', expires: 7 });
    },


    /**
     * Get the sidebar height
     *
     * @returns {*|jQuery}
     */
    getHeight: function() {
        return $('#sidebar').outerHeight();
    },


    /**
     * Handle the sidebar height
     */
    handleHeight: function() {
        var windowHeight     = App.window.getHeight();
        var headerHeight     = App.header.getHeight();
        var breadcrumbHeight = App.breadcrumb.getHeight();
        var menuHeight       = windowHeight - headerHeight;
        var offset           = 0;

        if (App.window.viewport == 'phone') {
            offset = (headerHeight + breadcrumbHeight);
        }

        $('#sidebar').attr('style', 'top:' + offset + 'px !important');
        $('#sidebar-inner').attr('style', 'height:' + windowHeight + 'px !important');
        $('.menu-wrapper').attr('style', 'height:' + menuHeight + 'px !important');
    },


    /**
     * Handle the sidebar open / close toggle function
     */
    handleToggle: function() {

        // Handle the open indicator
        if (this.isOpen()) {
            this.toggleIndicator();
        }

        // Toggle Method
        $(document).on('click', '.sidebar-toggle', function()
        {
            var body = $('body');
            if (App.sidebar.isClosed()) {
                App.sidebar.setCookie('1');
                App.sidebar.toggleIndicator();
                body.removeClass('sidebar-closed').addClass('sidebar-open');

            } else {
                App.sidebar.setCookie('0');
                App.sidebar.toggleIndicator();
                body.removeClass('sidebar-open').addClass('sidebar-closed');
            }
        });
    },


    /**
     * Handle the sidebar drop down menu function
     */
    handleMenu : function() {

        // Handle drop down
        $(document).on('click', '#sidebar .nav-list > li > a', function() {
            if ($(this).parent('li').find('.sub-nav').length > 0) {
                $(this).parent('li').toggleClass('open');
                return false;
            }
        });

        $('.sidebar .nav-list > li').each(function(i, v)
        {
            if ($(this).find('.active').length > 0) {
                $(this).addClass('open');
            }
        });
    }
};
/**
 * App storage Object
 *
 * @type object
 */
App.storage = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Get an item from local storage
     *
     * @param key string
     * @param json boolean
     */
    get: function(key, json) {
        if ('localStorage' in window && window['localStorage'] !== null) {
            try {
                var val = localStorage.getItem(key);
                if (json == true) {
                    val = JSON.parse(val);
                }
                return val;

            } catch (e) {
                App.log('Error: ' + e);
            }

        } else {
            App.log('Unfortunately your browser do not support local storage');
        }
    },


    /**
     * Put an item into local storage
     *
     * @param key
     * @param val
     */
    set: function(key, val) {
        if ('localStorage' in window && window['localStorage'] !== null) {
            try {
                if (val !== null && typeof val === 'object') {
                    val = JSON.stringify(val);
                }
                localStorage.setItem(key, val);

            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    App.log('Storage Quota exceeded!');
                }
            }
        } else {
            App.log('Unfortunately your browser do not support local storage');
        }
    },


    /**
     * Remove an item from local storage
     *
     * @param key
     */
    delete: function(key) {
        App.log(key + ' removed from storage');
        localStorage.removeItem(key);
    },


    /**
     * Empty all content from local storage
     */
    empty: function() {
        localStorage.clear();
        App.log('storage now cleared');
    }
};
/**
 * App window Object
 *
 * @type object
 */
App.window = {

    /**
     * Object variables
     */
    a : 'inner',
    e : window,
    viewport: 'small_desktop',


    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.window.handleWidth();
        App.window.handleResize();
        App.window.handleScroll();
    },


    /**
     * Set viewport function
     */
    setViewPort: function() {
        if (!('innerWidth' in window)) {
            this.a = 'client';
            this.e = document.documentElement || document.body;
        }
    },


    /**
     * Get window width
     *
     * @returns {*}
     */
    getWidth: function() {
        this.setViewPort();
        return this.e[this.a + 'Width'];
    },


    /**
     * Get window height
     *
     * @returns {*}
     */
    getHeight: function() {
        this.setViewPort();
        return this.e[this.a + 'Height'];
    },


    /**
     * Scroll to an element in the window
     *
     * @param el
     * @param offeset
     */
    scrollTo: function(el, offeset) {
        var pos = (el && el.size() > 0) ? el.offset().top : 0;
        $('html, body').animate({
            scrollTop : pos + (offeset ? offeset : 0)
        }, 'slow');
    },


    /**
     * Handle the window width
     */
    handleWidth: function() {
        if (this.getWidth() < 768) {
            this.viewport = 'phone';

        } else if (this.getWidth() > 768 && this.getWidth() < 992) {
            this.viewport = 'tablet';

        } else if (this.getWidth() > 992 && this.getWidth() < 1200) {
            this.viewport = 'small_desktop';

        } else if (this.getWidth() > 1200) {
            this.viewport = 'large_desktop';
        }
    },


    /**
     * Handle the window scroll event
     */
    handleScroll: function() {

        var timeout = 0;

        $(window).scroll(function()
        {
            App.activityBar.handleHeight();

            // Wait 1 second until window resize finishes
            if (new Date().getTime() > timeout) {
                /* Put time sensitive calls in here */
                timeout = new Date().getTime() + 1000;
            }

            // Check the scroll position
            if ($(window).scrollTop() > 100) {

                // If not mobile show back to top link
                if (App.window.viewport !== 'phone') {
                    $('#top-shortcut').show();
                }

            } else {
                if ($(window).scrollTop() <= 100) {
                    $('#top-shortcut').hide();
                }
            }

        });
    },


    /**
     * Handle the window resize event
     */
    handleResize: function() {

        var timeout = 0;
        var width = App.window.getWidth();

        $(window).resize(function()
        {
            // Smart device fix
            if (width !== App.window.getWidth()) {

                // Wait 500 milliseconds until window resize finishes
                if (new Date().getTime() > timeout) {
                    width = App.window.getWidth();

                    App.window.handleWidth();
                    App.sidebar.handleHeight();
                    App.activityBar.handleHeight();

                    timeout = new Date().getTime() + 500;
                }
            }
        });
    }
};
//# sourceMappingURL=app.js.map