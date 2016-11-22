/**
 * App prompt Object
 *
 * @type object
 */
App.prompt = {

    /**
     * Object properties
     */
    modal: null,


    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        this.modal = App.modal;
        this.modal.init();
        this.modal.hideHeader();
        this.modal.showFooter();
        this.bindEvents();
        this.handlePrompt();
        this.modal.forceChoice();
        this.modal.primaryBtn.html('Accept');
    },


    /**
     * Bind the object events
     */
    bindEvents: function() {
        $(document).on('modalPrimary', this.handlePrimaryClick);
        $(document).on('modalSecondary', this.handleSecondaryClick);
        $(document).on('modalClose', this.handleCloseClick);
    },


    /**
     * Prompt icon
     *
     * @param icon string
     */
    icon: function(icon) {
        this.modal.body.append('<div class="prompt-icon"><i class="' + icon + '"</i></div>');
    },


    /**
     * Prompt title
     *
     * @param title string
     */
    title: function(title) {
        this.modal.body.append('<div class="prompt-title">' + title + '</div>');
    },


    /**
     * Prompt message
     *
     * @param message string
     */
    message: function(message) {
        this.modal.body.append('<div class="prompt-message">' + message + '</div>');
    },


    /**
     * Show function
     */
    show : function() {
        this.modal.show();
    },


    /**
     * Hide function
     */
    hide: function() {
        this.modal.hide();
    },


    /**
     * Handle the primary click
     */
    handlePrimaryClick: function(element) {
        //App.log('Hey you fired the primary trigger');
        App.prompt.hide();
    },


    /**
     * Handle the secondary click
     */
    handleSecondaryClick: function(element) {
        //App.log('Hey you fired the secondary trigger');
    },


    /**
     * Handle the close click
     */
    handleCloseClick: function(element) {
        //App.log('Hey you fired the close trigger');
    },


    /**
     * Handle prompt
     */
    handlePrompt: function() {
        this.modal.container.addClass('prompt');
    }
};