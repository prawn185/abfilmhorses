/**
 * App editable form Object
 *
 * @type object
 */
App.editableForm = function() {

    /**
     * Object properties
     *
     * @type {App}
     */
    var _this = this;


    /**
     * Constructor
     *
     * Booting function
     *
     * @param form string
     */
    this.init = function(form) {
        this.setFormElements(form);
        this.setTriggers();
        this.bindEvents();
        this.disable();

        return this;
    };


    /**
     * Set form elements
     */
    this.setFormElements = function(form) {
        this.form = new App.form();
        this.form.init(form);
        this.createEditableElements();
        this.formState = this.form.bsf.find('.form-state');
        this.editBtn   = this.form.bsf.find('.edit-btn');
        this.cancelBtn = this.form.bsf.find('.cancel-btn');
        this.saveBtn   = this.form.bsf.find('.submit-btn');
    };


    /**
     * Create the editable elements for the form
     */
    this.createEditableElements = function() {

        // If there is a submit button then the user has update privileges
        if (this.form.bsf.find('button[type="submit"], input[type="submit"]').length > 0) {

            // Add state indicator
            this.form.bsf.find('.panel .pull-left').append('<i class="form-state mdi-action-lock-outline"></i>');

            // Add edit and cancel buttons
            this.form.bsf.find('.panel .actions')
                .prepend(
                    '<button type="button" title="Edit details" class="btn btn-sm btn-tooltip btn-default edit-btn">' +
                    '<span class="mdi-content-create"></span> Edit ' +
                    '</button>'
                )
                .prepend(
                    '<button type="button" title="Discard Changes" class="btn btn-sm btn-tooltip btn-default cancel-btn" style="display: none;">' +
                    '<span class="mdi-content-undo"></span> Cancel ' +
                    '</button>'
                );
        }
    };


    /**
     * Bind object events
     */
    this.bindEvents = function() {
        this.form.bindEvents();

        $(document).off('click', this.editBtn.selector).on('click', this.editBtn.selector, this.handleEditClick);
        $(document).off('click', this.form.cancelTrigger).on(this.form.cancelTrigger, this.handleCancelClick);
        $(document).off('click', this.form.submitTrigger).on(this.form.submitTrigger, this.handleSaveClick);
        $(document).off('click', this.form.ajaxSuccessTrigger).on(this.form.ajaxSuccessTrigger, this.handleAjaxSuccess);
        $(document).off('click', this.form.ajaxErrorTrigger).on(this.form.ajaxErrorTrigger, this.handleAjaxError);

        return this;
    };


    /**
     * Set object triggers
     */
    this.setTriggers = function() {
        this.editTrigger = this.form.createTriggerName('Edit');

        return this;
    };


    /**
     * Debug function
     */
    this.debug = function() {
        App.log(this.form);
        App.log('Edit Button: ' + this.editBtn.selector);
        App.log('Cancel Button: ' + this.cancelBtn.selector);
        App.log('Submit Button: ' + this.saveBtn.selector);

        App.log(this.editTrigger);
        App.log(this.form.cancelTrigger);
        App.log(this.form.submitTrigger);
        App.log(this.form.ajaxSuccessTrigger);
        App.log(this.form.ajaxErrorTrigger);
    };


    /**
     * Fire edit trigger function
     *
     * @param element
     */
    this.fireEditTrigger = function(element) {
        $.event.trigger(this.editTrigger, element);
    };


    /**
     * Set edit trigger
     *
     * @param value string
     */
    this.setEditTrigger = function(value) {
        this.editTrigger = value;
    };


    /**
     * Refresh select picker
     *
     * @returns {App.editableForm}
     */
    this.refreshSelectPicker = function() {
        $('.selectpicker').selectpicker('refresh');

        return this;
    };


    /**
     * Enable form fields
     */
    this.enable = function() {
        this.enableFormState();
        this.enableFormFields();
        this.refreshSelectPicker();

        return this;
    };


    /**
     * Disable form fields
     */
    this.disable = function() {
        this.form.resetValidation();
        this.disableFormState();
        this.disableFormFields();
        this.refreshSelectPicker();

        return this;
    };


    /**
     * Enable form fields
     */
    this.enableFormFields = function() {
        this.form.bsf.find('input, textarea, select, .btn')
            .not('input[type=hidden]')
            .not('.edit-btn')
            .each(function(index, value) {
                $(this).removeClass('disabled');
                $(this).addClass('enabled');
                $(this).prop('disabled', false);
            });

        return this;
    };


    /**
     * Disable form fields
     */
    this.disableFormFields = function() {
        this.form.bsf.find('input, textarea, select, .btn')
            .not('input[type=hidden]')
            .not('.edit-btn')
            .each(function(index, value) {
                $(this).removeClass('enabled');
                $(this).addClass('disabled');
                $(this).prop('disabled', true);
            });

        return this;
    };


    /**
     * Change form state to enabled
     */
    this.enableFormState = function() {
        this.editBtn.hide();
        this.cancelBtn.show();
        this.saveBtn.show();
        this.formState.addClass('mdi-action-lock-open');
        this.formState.removeClass('mdi-action-lock-outline');
        this.form.bsf.removeClass('disabled');
        this.form.bsf.addClass('enabled');

        if (this.form.bsf.find('.hasRedactor').length) {
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('> *').not('.form-control').show();
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('.redactor_editor').attr('contenteditable', 'true');
        }

        return this;
    };


    /**
     * Change form state to disabled
     */
    this.disableFormState = function() {
        this.cancelBtn.hide();
        this.saveBtn.hide();
        this.editBtn.show();
        this.formState.removeClass('mdi-action-lock-open');
        this.formState.addClass('mdi-action-lock-outline');
        this.form.bsf.removeClass('enabled');
        this.form.bsf.addClass('disabled');

        if (this.form.bsf.find('.hasRedactor').length) {
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('> *').not('.redactor_editor').hide();
            this.form.bsf.find('.hasRedactor').closest('.redactor_box').find('.redactor_editor').attr('contenteditable', 'false');
        }

        return this;
    };


    /**
     * Handle edit click
     */
    this.handleEditClick = function(e) {
        _this.fireEditTrigger();
        _this.enable();
    };


    /**
     * Handle cancel click
     */
    this.handleCancelClick = function(e) {
        _this.disable();
    };


    /**
     * Handle save click
     */
    this.handleSaveClick = function(e) {
        e.preventDefault();

    };


    /**
     * Handle ajaxSuccess
     */
    this.handleAjaxSuccess = function(e) {
        _this.disable();
    };


    /**
     * Handle ajaxError
     */
    this.handleAjaxError = function(e) {
        _this.enable();
    };
};
