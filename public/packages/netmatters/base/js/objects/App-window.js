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
        App.window.handleUrl();
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
    },


    /**
     * Handle the url
     */
    handleUrl: function() {
        $(window).unload(function() {
            App.storage.set('previous_url', window.location.href);
        });
        App.storage.set('current_url', window.location.href);
    }
};