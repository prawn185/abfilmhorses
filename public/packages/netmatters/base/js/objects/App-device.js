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