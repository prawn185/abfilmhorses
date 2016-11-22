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