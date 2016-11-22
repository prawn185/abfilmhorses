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