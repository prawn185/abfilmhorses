/**
 * App Object
 *
 * @type object
 */
var App = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        // Environment objects
        App.debug.init();
        App.browser.init();
        App.device.init();
        App.window.init();

        // Template objects
        App.header.init();
        App.breadcrumb.init();
        App.container.init();
        App.pageHead.init();
        App.sidebar.init();
        App.activityBar.init();

        // Utility objects
        App.ajax.init();
        App.storage.init();
        App.format.init();
        App.router.init();
        App.helper.init();
        App.message.init();
        App.map.init();

        // Elements
        App.select2.init();
        App.rateit.init();
        App.selectize.init();
    },


    /**
     * Log function for debugging
     */
    log: function(message) {
        if ("console" in window) {
            console.log(message);
        }
    },


    /**
     * Show loading bar function
     */
    showLoadingBar: function() {
        $("body").append('<div id="loadingbar"></div>');
        $("#loadingbar")
            .addClass("waiting")
            .append($("<dt/><dd/>"))
            .width((50 + Math.random() * 30) + "%");
    },


    /**
     * Hide loading bar function
     */
    hideLoadingBar: function() {
        $("#loadingbar")
            .width("101%")
            .delay(200)
            .fadeOut(400, function() {
                $(this).remove();
            });
    },


    /**
     * Block an element
     *
     * @param element
     */
    blockUI: function(element) {
        $(element).append(
            '<div class="loading">' +
                '<div class="preloader-wrapper small active">' +
                    '<div class="spinner-layer spinner-red-only">' +
                        '<div class="circle-clipper left">' +
                            '<div class="circle"></div>' +
                        '</div>' +
                        '<div class="gap-patch">' +
                            '<div class="circle"></div>' +
                        '</div>' +
                        '<div class="circle-clipper right">' +
                            '<div class="circle"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    },


    /**
     * Unblock an element
     *
     * @param element
     */
    unblockUI: function(element) {
        $(element).remove('.loading');
    }
};


/**
 * Document ready function
 *
 * When the document is ready
 * show the loading bar
 */
$(document).ready(function() {
    App.init();
    App.showLoadingBar();
});


/**
 * Window load functions
 *
 * Once the window has loaded
 * hide the loading bar
 */
$(window).load(function() {
    App.hideLoadingBar();
});


/**
 * Ajax start function
 */
$(document).ajaxStart(function(data) {
    App.showLoadingBar();
});


/**
 * Ajax stop function
 */
$(document).ajaxStop(function(data) {
    App.hideLoadingBar();
});
