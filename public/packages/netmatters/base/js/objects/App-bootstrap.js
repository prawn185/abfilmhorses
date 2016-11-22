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