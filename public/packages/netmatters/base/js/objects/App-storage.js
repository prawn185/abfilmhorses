/**
 * App storage Object
 *
 * @type object
 */
App.storage = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Get an item from local storage
     *
     * @param key string
     * @param json boolean
     */
    get: function(key, json) {
        if ('localStorage' in window && window['localStorage'] !== null) {
            try {
                var val = localStorage.getItem(key);
                if (json == true) {
                    val = JSON.parse(val);
                }
                return val;

            } catch (e) {
                App.log('Error: ' + e);
            }

        } else {
            App.log('Unfortunately your browser do not support local storage');
        }
    },


    /**
     * Put an item into local storage
     *
     * @param key
     * @param val
     */
    set: function(key, val) {
        if ('localStorage' in window && window['localStorage'] !== null) {
            try {
                if (val !== null && typeof val === 'object') {
                    val = JSON.stringify(val);
                }
                localStorage.setItem(key, val);

            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    App.log('Storage Quota exceeded!');
                }
            }
        } else {
            App.log('Unfortunately your browser do not support local storage');
        }
    },


    /**
     * Remove an item from local storage
     *
     * @param key
     */
    delete: function(key) {
        App.log(key + ' removed from storage');
        localStorage.removeItem(key);
    },


    /**
     * Empty all content from local storage
     */
    empty: function() {
        localStorage.clear();
        App.log('storage now cleared');
    }
};