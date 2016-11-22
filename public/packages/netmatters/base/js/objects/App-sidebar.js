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
        App.sidebar.handleToggle();
        App.sidebar.handleMenuToggle();
        App.sidebar.restoreMenuState();
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
     * Handle the menu group drop down
     */
    handleMenuToggle: function() {

        $(document).on('click', '#sidebar .nav-list > li > a', function(e) {
            if ($(this).parent('li').find('.sub-nav').length > 0) {
                e.preventDefault();

                if ($(this).parent('li').hasClass('open')) {
                    $(this).parent('li').removeClass('open');
                    App.sidebar.removeMenuState($(this).parent('li').data('menu-item'));

                } else {
                    $(this).parent('li').addClass('open');
                    App.sidebar.saveMenuState($(this).parent('li').data('menu-item'));
                }
                return false;
            }
        });
    },

    /**
     * Get menu state
     */
    getMenuState: function() {
        var openMenuItems = [];
        if (App.storage.get('open_menu_items') !== null) {
            openMenuItems = App.storage.get('open_menu_items', true);
        }
        return openMenuItems;
    },


    /**
     * Save menu state
     */
    saveMenuState: function(menuItem) {
        var savedMenuItems = App.sidebar.getMenuState();
        savedMenuItems.push(menuItem);
        App.storage.set('open_menu_items', savedMenuItems);
    },


    /**
     * Remove menu state
     */
    removeMenuState: function(menuItem) {
        var savedMenuItems = App.sidebar.getMenuState();
        var i = savedMenuItems.indexOf(menuItem);
        if (i != -1) {
            savedMenuItems.splice(i, 1);
            App.storage.set('open_menu_items', savedMenuItems);
        }
    },


    /**
     * Restore menu state
     */
    restoreMenuState: function() {
        var openMenuItems = App.sidebar.getMenuState();
        $('#sidebar .nav-list > li').each(function(key, value) {
            if ($(this).find('.sub-nav').length > 0 && $.inArray($(this).data('menu-item'), openMenuItems) > -1) {
                $(this).addClass('open');
            }
        });
    }
};