/**
 *---------------------------------------------------------------
 * CREATE THE BOOTSTRAP OBJECT
 *---------------------------------------------------------------
 */
var BootstrapComponents = function()
{
    // Dates
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getYear();
    this.today = (this.day < 10 ? '0' : '') + this.day + '/' + (this.month < 10 ? '0' : '') + this.month + '/' + this.date.getFullYear();
};


/**
 *---------------------------------------------------------------
 * BS: SPINNERS
 *---------------------------------------------------------------
 * Form Spinners
 */
BootstrapComponents.prototype.handleSpinners = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().TouchSpin()) {
        return;
    }
    jQuery(".spinner-percent").TouchSpin({
        inputGroupClass : 'input-group-sm',
        spinUpClass     : 'green',
        spinDownClass   : 'red',
        min             : -100,
        max             : 100,
        step            : 10,
        decimals        : 0,
        boostat         : 15,
        maxboostedstep  : 20,
    });
    jQuery(".spinner-currency").TouchSpin({
        inputGroupClass : 'input-group-sm',
        spinUpClass     : 'green',
        spinDownClass   : 'red',
        min             : -1000000000,
        max             : 1000000000,
        step            : 0.1,
        decimals        : 2,
        boostat         : 5,
        maxboostedstep  : 10,
    });
};


/**
 *---------------------------------------------------------------
 * BS: SELECT BOX
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleSelectBox = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().selectpicker()) {
        return;
    }
    if (!jQuery('select').hasClass("not-pretty")) {
        jQuery('select').addClass('selectpicker show-tick');
    }
    if (!jQuery('.selectpicker').hasClass("not-pretty")) {

        // If mobile show mobile version
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            jQuery('.selectpicker').selectpicker('mobile');

        } else {
            jQuery('.selectpicker').selectpicker();
        }
    }
};


/**
 *---------------------------------------------------------------
 * BS: COMBOBOX
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleCombobox = function()
{
    jQuery('.text-select').on('click', 'li a', function()
    {
        var value = jQuery(this).text();
        jQuery(this).parentsUntil('.form-group').children(".text-input").val(value);
    });
    if (jQuery('.text-select').hasClass('selected')) {
        jQuery(this).append('<i class="glyphicons ok_2"></i>');
    }
};


/**
 *---------------------------------------------------------------
 * BS: CHECK BOX
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleCheckBox = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().prettyCheckable()) {
        return;
    }
    // Style radio and check boxes
    if (!jQuery('input[type=checkbox]').hasClass("not-pretty")) {
        jQuery('input[type=checkbox]').prettyCheckable();
    }
    if (!jQuery('input[type=radio]').hasClass("not-pretty")) {
        jQuery('input[type=radio]').prettyCheckable();
    }
};


/**
 *---------------------------------------------------------------
 * BS: DATE PICKER
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleDatePicker = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().datepicker()) {
        return;
    }
    // Default date
    if (jQuery('.datepicker').val() === '' && jQuery('.datepicker').data('autofill') != false) {
        jQuery('.datepicker').val(this.today);
    }

    jQuery('.datepicker').datepicker({
        format    : 'dd/mm/yyyy',
        weekStart : 1
    }).on('changeDate', function(ev)
    {
        jQuery(this).change();
        jQuery(this).blur();
        jQuery(this).datepicker('hide');
    });
};


/**
 *---------------------------------------------------------------
 * BS: PANNELS
 *---------------------------------------------------------------
 */
// Handles portlet tools & actions
BootstrapComponents.prototype.handlePanels = function()
{
    // Add function
    jQuery(document).on('click', '.panel-heading a.add', function(e)
    {
        // Prevent the default action
        //e.preventDefault();
    });

    // Collapse function
    jQuery(document).on('click', '.panel-heading .collapse, .panel-heading .expand', function(e)
    {
        // Prevent the default action
        e.preventDefault();

        var el = jQuery(this).closest(".panel").children(".panel-body");
        if (jQuery(this).hasClass("collapse")) {
            jQuery(this).removeClass("collapse").addClass("expand");
            el.slideUp(200);

        } else {
            jQuery(this).removeClass("expand").addClass("collapse");
            el.slideDown(200);
        }
    });

    // Reload function
    jQuery(document).on('click', '.panel-heading a.reload', function(e)
    {
        // Prevent the default action
        e.preventDefault();

        var el = jQuery(this).closest(".panel").children(".panel-body");
        App.blockUI(el);
        window.setTimeout(function()
        {
            App.unblockUI(el);
        }, 1000);
    });

    // Remove function
    jQuery(document).on('click', '.panel-heading a.remove', function(e)
    {
        // Prevent the default action
        e.preventDefault();
        jQuery(this).closest(".panel").remove();
    });

    // Settings function
    jQuery(document).on('click', '.panel-heading a.config', function(e)
    {
        // Prevent the default action
        e.preventDefault();
        jQuery(this).closest(".panel").remove();
    });
};


/**
 *---------------------------------------------------------------
 * BS: WIZARD
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleWizard = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().bootstrapWizard()) {
        return;
    }
    jQuery('#wizard-view').bootstrapWizard(
        {
            'nextSelector'     : '.button-next',
            'previousSelector' : '.button-previous'
        });
};


/**
 *---------------------------------------------------------------
 * BS: MODAL
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleModal = function()
{
    // Fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class.
    jQuery(document).on('hide.bs.modal', function()
    {
        if (jQuery('.modal:visible').size() > 1 && jQuery('html').hasClass('modal-open') === false) {
            jQuery('html').addClass('modal-open');

        } else {
            if (jQuery('.modal:visible').size() <= 1) {
                jQuery('html').removeClass('modal-open');
            }
        }
    });

    jQuery(document).on('show.bs.modal', '.modal', function()
    {
        if (jQuery(this).hasClass("modal-scroll")) {
            jQuery('body').addClass("modal-open-noscroll");
        }
    });

    jQuery(document).on('hide.bs.modal', '.modal', function()
    {
        jQuery('body').removeClass("modal-open-noscroll");
    });
};


/**
 *---------------------------------------------------------------
 * BS: MODAL DELETE
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleDeleteModal = function()
{
    // Delete Confirmation prompt
    jQuery(document).on('click', '.delete', function(e)
    {
        // Prevent the default action
        e.preventDefault();

        // Set the url links
        var url = jQuery(this).attr('href');
        var return_url = jQuery(location).attr('href');

        // Load the Bootstrap Modal
        BsDelete = new BootstrapModal();

        // Set title and footer
        BsDelete.bsm_title.html('Delete Record?');
        BsDelete.bsm_body.html('Are you sure you want to delete this Record?');
        BsDelete.bsm_footer.show();

        // Set the modal primary and secondary buttons
        BsDelete.bsm_primary
            .removeClass('btn-primary')
            .addClass('btn-danger')
            .html('Delete');

        // Show the modal
        BsDelete.bsm.modal('show');

        // If the user clicks the delete button
        BsDelete.bsm_primary.on('click', function(e)
        {
            // Prevent the default action
            e.preventDefault();

            // Perform the Ajax request
            jQuery.ajax({
                url     : url,
                type    : 'GET',
                cache   : false,
                success : function(result)
                {
                    if (result.error !== undefined) {
                        console.log(result.error);
                        BsDelete.bsm.modal('hide');
                        BsComponents.notifyUser(result.error, 'danger');

                    } else {
                        BsComponents.notifyUser('Delete Complete', 'success');
                        document.location.href = return_url;
                    }

                    // Notify and redirect the user
                    //jQuery('#main').load(App.currentURL + ' #main > *');
                },
                fail : function(result)
                {
                    BsDelete.bsm.modal('hide');
                    BsComponents.notifyUser('Delete Failed', 'danger');
                    BsDelete.bsm_body.html('Delete failed ');
                }
            });

            // Return false to stop the browser from loading the link
            return false;
        });

        // Return false to stop the browser from loading the link
        return false;
    });
};


/**
 *---------------------------------------------------------------
 * BS: GROWL NOTIFICATIONS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.notifyUser = function(message, type)
{
    // Notifications
    jQuery.bootstrapGrowl(message, {
        ele             : 'body', // which element to bootstrapcomponentsend to
        type            : type, // (null, 'info', 'error', 'success')
        offset          : {from : 'bottom', amount : 50}, // 'top', or 'bottom'
        align           : 'right', // ('left', 'right', or 'center')
        width           : 250, // (integer, or 'auto')
        delay           : 4000,
        allow_dismiss   : true,
        stackup_spacing : 10 // spacing between consecutively stacked growls.
    });
};


/**
 *---------------------------------------------------------------
 * BS: INPUT MAX LENGTH
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleMaxlength = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().maxlength()) {
        return;
    }
    $('.maxlength').maxlength({
        alwaysShow        : true,
        threshold         : 10,
        warningClass      : "label label-default",
        limitReachedClass : "label label-danger",
    });
};


/**
 *---------------------------------------------------------------
 * BS: SPINNERS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleTooltip = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().tooltip()) {
        return;
    }
    jQuery('.btn-tooltip').tooltip({
        placement : 'auto',
        container: 'body'
    });
    jQuery('.top-tooltip').tooltip({
        placement : 'top',
        container: 'body'
    });
    jQuery('.right-tooltip').tooltip({
        placement : 'right',
        container: 'body'
    });
    jQuery('.bottom-tooltip').tooltip({
        placement : 'bottom',
        container: 'body'
    });
    jQuery('.left-tooltip').tooltip({
        placement : 'left',
        container: 'body'
    });
};



/**
 *---------------------------------------------------------------
 * BS: POPOVERS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handlePopover = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().tooltip()) {
        return;
    }

    jQuery('.click-popover').popover({
        placement : 'auto'
    });

    jQuery('.hover-popover').popover({
        placement : 'auto',
        trigger   : 'hover'
    });

    jQuery('.focus-popover').popover({
        placement : 'auto',
        trigger   : 'focus'
    });

    jQuery(document).on('click', '.modal-popover', function(e)
    {
        var htmlTitle = jQuery(this).parent().find('.pop-title').html();
        var htmlContent = jQuery(this).parent().find('.pop-content').html();
        var htmlTextarea = jQuery(this).parent().find('textarea');

        // Create the popover
        jQuery(this).popover({
            html      : true,
            placement : 'top',
            trigger   : 'manual',
            title     : htmlTitle,
            content   : htmlContent
        });

        // If the popover does not exist create it else update the existing one
        if (jQuery(this).parent().find('.popover').length == 0) {
            jQuery(this).popover('show');
        } else {
            jQuery(this).parent().find('.popover').show();
        }

        var pop = jQuery(this).parent().find('.popover');
        var popTitle = pop.find('.popover-title');
        var popContent = pop.find('.popover-content');
        var popTextarea = popContent.find('textarea');

        // If the popover does not have a close button append one
        if (popTitle.find('.close').length == 0) {
            popTitle.append('<button type="button" class="close">&times;</button>');
        }

        // Hide popover on click
        popTitle.find('.close').on('click', function(e)
        {
            pop.hide();
        });

        // Prevent default action
        e.preventDefault();
    });
};


/**
 *---------------------------------------------------------------
 * BS: ACCORDIANS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleAccordians = function()
{
    var lastClicked;

    // Add scrollable class name if you need scrollable panes
    jQuery(document).on('click', '.accordion.scrollable .accordion-toggle', function()
    {
        lastClicked = jQuery(this);
    });

    jQuery(document).on('show.bs.collapse', '.accordion.scrollable', function()
    {
        jQuery('html,body').animate({
            scrollTop : lastClicked.offset().top - 150
        }, 'slow');
    });
};


/**
 *---------------------------------------------------------------
 * BS: TABS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleTabs = function()
{
    // Activate tab if tab id provided in the URL
    if (location.hash) {
        var tabid = location.hash.substr(1);
        jQuery('a[href="#' + tabid + '"]').parents('.tab-pane:hidden').each(function()
        {
            var tabid = jQuery(this).attr("id");
            jQuery('a[href="#' + tabid + '"]').click();
        });
        jQuery('a[href="#' + tabid + '"]').click();
    }
};


/**
 *---------------------------------------------------------------
 * BS: DROPDOWNS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleDropdowns = function()
{
    // For touch supported devices disable the hoverable dropdowns - data-hover="dropdown"
    if (App.isTouchDevice()) {
        jQuery('[data-hover="dropdown"]').each(function()
        {
            jQuery(this).parent().off("hover");
            jQuery(this).off("hover");
        });
    }

    // Hold dropdown on click
    jQuery(document).on('click', '.dropdown-menu.hold-on-click', function(e)
    {
        e.stopPropagation();
    });
};


/**
 *---------------------------------------------------------------
 * BS: ALERTS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleAlerts = function()
{
    jQuery(document).on('click', '[data-close="alert"]', function(e)
    {
        jQuery(this).parent('.alert').hide();
        e.preventDefault();
    });
};


/**
 *---------------------------------------------------------------
 * BS: SCROLLERS
 *---------------------------------------------------------------
 */
BootstrapComponents.prototype.handleScrollers = function()
{
    // Handles scrollable contents using jQuery SlimScroll plugin.
    jQuery('.scroller').each(function()
    {
        var height;

        if (jQuery(this).attr("data-height")) {
            height = jQuery(this).attr("data-height");
        } else {
            height = jQuery(this).css('height');
        }
        jQuery(this).slimScroll({
            size           : '7px',
            color          : (jQuery(this).attr("data-handle-color") ? jQuery(this).attr("data-handle-color") : '#a1b2bd'),
            railColor      : (jQuery(this).attr("data-rail-color") ? jQuery(this).attr("data-rail-color") : '#333'),
            position       : isRTL ? 'left' : 'right',
            height         : height,
            alwaysVisible  : (jQuery(this).attr("data-always-visible") == "1" ? true : false),
            railVisible    : (jQuery(this).attr("data-rail-visible") == "1" ? true : false),
            disableFadeOut : true
        });
    });
};
