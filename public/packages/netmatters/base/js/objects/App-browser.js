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