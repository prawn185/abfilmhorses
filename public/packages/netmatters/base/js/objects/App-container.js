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