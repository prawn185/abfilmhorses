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