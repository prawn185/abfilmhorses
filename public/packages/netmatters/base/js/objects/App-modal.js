/**
 * App modal Object
 *
 * @type object
 */
App.modal = new function() {

    /**
     * Constructor Function
     *
     * Boot function
     */
    this.init = function() {
        this.setModalElement();
        this.reset();
        this.setTriggers();
        this.bindEvents();
    };


    /**
     * Bind the object events
     */
    this.bindEvents = function() {
        $(document).on('click', this.primaryBtn.selector, this.handlePrimaryClick);
        $(document).on('click', this.secondaryBtn.selector, this.handleSecondaryClick);
        $(document).on('click', this.closeBtn.selector, this.handleCloseClick);
    };


    /**
     * Set the modal element
     */
    this.setModalElement = function() {
        this.bsm          = $('#modal');
        this.container    = this.bsm.find('.modal-dialog');
        this.header       = this.bsm.find('.modal-header');
        this.title        = this.bsm.find('.modal-header h4');
        this.body         = this.bsm.find('.modal-body');
        this.footer       = this.bsm.find('.modal-footer');
        this.primaryBtn   = this.bsm.find('.primary-action');
        this.secondaryBtn = this.bsm.find('.secondary-action');
        this.closeBtn     = this.bsm.find('.close-action');
    };


    /**
     * Set object triggers
     */
    this.setTriggers = function() {
        this.primaryTrigger   = 'modalPrimary';
        this.secondaryTrigger = 'modalSecondary';
        this.closeTrigger     = 'modalClose';
        this.loadTrigger      = 'modalLoaded';
    };


    /**
     * Set title value
     *
     * @param value
     */
    this.setTitle = function(value) {
        this.title.html(value);
    };


    /**
     * Get title value
     */
    this.getTitle = function() {
        return this.title.html;
    };


    /**
     * Set body value
     *
     * @param value
     */
    this.setBody = function(value) {
        this.body.html(value);
    };


    /**
     * Get body value
     */
    this.getBody = function() {
        return this.body.html;
    };


    /**
     * Load function
     *
     * This function is used to load
     * ajax data into the modal body
     *
     * @param url
     */
    this.load = function(url) {
        this.setBody('<div class="modal-message">Loading please wait ....</div>');
        this.body.load(url, function(element) {
            App.modal.fireLoadTrigger();
        });
    };


    /**
     * Show the modal
     */
    this.show = function() {
        this.bsm.modal('show');
    };


    /**
     * Hide the modal
     */
    this.hide = function() {
        this.bsm.modal('hide');
    };


    /**
     * Show the header element
     */
    this.showHeader = function() {
        this.header.show();
    };


    /**
     * Hide the header element
     */
    this.hideHeader = function() {
        this.header.hide();
    };


    /**
     * Show the body element
     */
    this.showBody = function() {
        this.body.show();
    };


    /**
     * Hide the body element
     */
    this.hideBody = function() {
        this.body.hide();
    };


    /**
     * Set modal height
     *
     * @param value
     */
    this.setHeight = function(value) {
        this.body.css('height', value);
    };


    /**
     * Allow overflow
     */
    this.allowOverflow = function() {
        this.body.css('overflow', 'visible');
    };


    /**
     * Show the footer element
     */
    this.showFooter = function() {
        this.footer.show();
    };


    /**
     * Hide the footer element
     */
    this.hideFooter = function() {
        this.footer.hide();
    };


    /**
     * Force choice
     *
     * Force the user to use the primary
     * or secondary button.
     */
    this.forceChoice = function() {
        this.bsm.modal({
            keyboard: false,
            backdrop: 'static'
        });
        this.closeBtn.removeAttr('data-dismiss');
    };


    /**
     * Set load trigger
     *
     * @param value string
     */
    this.setLoadTrigger = function(value) {
        this.loadTrigger = value;
    };


    /**
     * Fire load trigger function
     *
     * @param element
     */
    this.fireLoadTrigger = function(element) {
        $.event.trigger(this.loadTrigger, element);
    };


    /**
     * Set primary trigger
     *
     * @param value string
     */
    this.setPrimaryTrigger = function(value) {
        this.primaryTrigger = value;
    };


    /**
     * Fire primary trigger function
     *
     * @param element
     */
    this.firePrimaryTrigger = function(element) {
        $.event.trigger(this.primaryTrigger, element);
    };


    /**
     * Set secondary trigger
     *
     * @param value string
     */
    this.setSecondaryTrigger = function(value) {
        this.secondaryTrigger = value;
    };


    /**
     * Fire secondary trigger function
     *
     * @param element
     */
    this.fireSecondaryTrigger = function(element) {
        $.event.trigger(this.secondaryTrigger, element);
    };


    /**
     * Set close trigger
     *
     * @param value string
     */
    this.setCloseTrigger = function(value) {
        this.closeTrigger = value;
    };


    /**
     * Fire close trigger function
     *
     * @param element
     */
    this.fireCloseTrigger = function(element) {
        $.event.trigger(this.closeTrigger, element);
    };


    /**
     * Hide backdrop
     */
    this.hideBackdrop = function() {
        this.bsm.modal({backdrop: false});
    };


    /**
     * Main reset function
     */
    this.reset = function() {
        this.hideFooter();
        this.resetContainer();
        this.resetTitle();
        this.resetBody();
        this.resetPrimaryBtn();
        this.resetSecondaryBtn();
        this.resetCloseBtn();
    };


    /**
     * Reset container
     */
    this.resetContainer = function() {
        this.container.removeClass('prompt');
        this.container.removeClass('large-modal');
    };


    /**
     * Reset title
     */
    this.resetTitle = function() {
        this.setTitle('');
    };


    /**
     * Reset body
     */
    this.resetBody = function() {
        this.setBody('');
        this.body.css('height', 'auto');
        this.body.css('min-height', '50px');
        this.body.css('overflow', 'inherit');
    };


    /**
     * Reset primary button
     */
    this.resetPrimaryBtn = function() {
        this.primaryBtn
            .removeClass('btn-danger')
            .removeClass('btn-info')
            .removeClass('btn-warning')
            .removeClass('btn-success')
            .addClass('btn-primary')
            .attr("href", 'javascript:void(0)')
            .removeAttr('target')
            .html('Ok')
            .unbind("click");
    };


    /**
     * Reset close button
     */
    this.resetCloseBtn = function() {
        this.closeBtn.attr('data-dismiss', 'modal');
    };


    /**
     * Reset secondary button
     */
    this.resetSecondaryBtn = function() {
        this.secondaryBtn.attr('data-dismiss', 'modal');
    };


    /**
     * Handle the primary click
     */
    this.handlePrimaryClick = function(event) {
        event.preventDefault();
        App.modal.firePrimaryTrigger();
        $(document).off('click', App.modal.primaryBtn.selector);
    };


    /**
     * Handle the secondary click
     */
    this.handleSecondaryClick = function(event) {
        event.preventDefault();
        App.modal.fireSecondaryTrigger();
        $(document).off('click', App.modal.secondaryBtn.selector);
    };


    /**
     * Handle the close click
     */
    this.handleCloseClick = function(event) {
        event.preventDefault();
        App.modal.fireCloseTrigger();
        $(document).off('click', App.modal.closeBtn.selector);
    };
};