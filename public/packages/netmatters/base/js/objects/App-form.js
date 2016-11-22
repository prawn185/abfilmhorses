/**
 * App form Object
 *
 * @type object
 */
App.form = function() {

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
        this.ajax      = true;
        this.validator = null;
        this.cancelBtn = null;
        this.submitBtn = null;
        this.rules     = {};
        this.messages  = {};
        this.ignore    = ":not(select:hidden, input:hidden, input:visible, textarea:visible)";

        this.setFormElements(form);
        this.resetValidation();
        this.setTriggers();
        this.bindEvents();
        this.handleValidator();

        return this;
    };


    /**
     * Set form elements
     *
     * @param form
     */
    this.setFormElements = function(form) {
        this.bsf = $(form);
        this.cancelBtn = this.getCancelBtn();
        this.submitBtn = this.getSubmitBtn();

        return this;
    };


    /**
     * Bind object events
     */
    this.bindEvents = function() {
        $(document).off('click', this.cancelBtn.selector).on('click', this.cancelBtn.selector, this.handleCancelClick);
        $(document).off('click', this.submitBtn.selector).on('click', this.submitBtn.selector, this.handleSubmitClick);

        return this;
    };


    /**
     * Check bindings
     *
     * List an elements bindings
     *
     * @param element
     */
    this.checkBindings = function(element) {
        $.each($(element).data('events'), function(i, e) {
            console.log(i, e);
        });
    };


    /**
     * Create trigger name
     *
     * This function create a unique trigger name
     */
    this.createTriggerName = function(value) {
        var formName    = this.bsf.selector;
        var triggerName = '';
        var words       = formName.replace('#', '').split('-');

        for (var i = 0 ; i < words.length; i++) {

            // Convert words to lowercase
            var lowerWord = words[i].toLowerCase().trim();

            // Convert the first letter of each additional word to uppercase
            if (i > 0) {
                triggerName += lowerWord.slice(0, 1).toUpperCase() + lowerWord.slice(1);

            } else {
                triggerName += lowerWord;
            }

            if (i != words.length -1) {
                triggerName += " ";
            }
        }
        triggerName[triggerName.length -1] = '';

        // Remove spaces, add the action name to the end and return
        return triggerName.replace(' ', '') + value;
    };


    /**
     * Set object triggers
     */
    this.setTriggers = function() {
        this.cancelTrigger      = this.createTriggerName('Cancel');
        this.submitTrigger      = this.createTriggerName('Submit');
        this.ajaxSuccessTrigger = this.createTriggerName('AjaxSuccess');
        this.ajaxErrorTrigger   = this.createTriggerName('AjaxError');

        return this;
    };



    /**
     * Debug function
     */
    this.debug = function() {
        App.log('Form: ' + this.bsf.selector);
        App.log('Cancel Button: ' + this.cancelBtn.selector);
        App.log('Submit Button: ' + this.submitBtn.selector);
        App.log(this.cancelTrigger);
        App.log(this.submitTrigger);
        App.log(this.ajaxSuccessTrigger);
        App.log(this.ajaxErrorTrigger);
    };


    /**
     * Get cancel button
     */
    this.getCancelBtn = function() {
        return this.bsf.find('.cancel-btn');
    };


    /**
     * Get submit button
     */
    this.getSubmitBtn = function() {
        var submitBtn = this.bsf.find('.submit-btn');
        if ($(submitBtn).length < 1) {
            submitBtn = this.bsf.find('button[type="submit"], input[type="submit"]');
            submitBtn.addClass('submit-btn');
        }
        return submitBtn;
    };


    /**
     * Fire cancel trigger function
     *
     * @param element
     */
    this.fireCancelTrigger = function(element) {
        $.event.trigger(this.cancelTrigger, element);
    };


    /**
     * Set cancel trigger
     *
     * @param value string
     */
    this.setCancelTrigger = function(value) {
        this.cancelTrigger = value;
    };


    /**
     * Fire submit trigger function
     *
     * @param element
     */
    this.fireSubmitTrigger = function(element) {
        $.event.trigger(this.submitTrigger, element);
    };


    /**
     * Set submit trigger
     *
     * @param value string
     */
    this.setSubmitTrigger = function(value) {
        this.submitTrigger = value;
    };


    /**
     * Fire ajaxSuccess trigger function
     *
     * @param element
     */
    this.fireAjaxSuccessTrigger = function(element) {
        $.event.trigger(this.ajaxSuccessTrigger, element);
    };


    /**
     * Set ajaxSuccess trigger
     *
     * @param value string
     */
    this.setAjaxSuccessTrigger = function(value) {
        this.ajaxSuccessTrigger = value;
    };


    /**
     * Fire ajaxError trigger function
     *
     * @param element
     */
    this.fireAjaxErrorTrigger = function(element) {
        $.event.trigger(this.ajaxErrorTrigger, element);
    };


    /**
     * Set ajaxError trigger
     *
     * @param value string
     */
    this.setAjaxErrorTrigger = function(value) {
        this.ajaxErrorTrigger = value;
    };


    /**
     * Get the form action
     */
    this.getAction = function() {
        return this.bsf.attr('action');
    };


    /**
     * Get the form data
     */
    this.getData = function() {
        return this.bsf.serialize();
    };


    /**
     * Validation function
     */
    this.validate = function() {
        return this.bsf.valid();
    };


    /**
     * Reset function
     */
    this.resetValidation = function() {
        this.bsf.find('.form-group').each(function(index, value) {
            $(this).removeClass('has-success');
            $(this).removeClass('has-error');
            $(this).find('.error-popup').hide();
        });

        return this;
    };


    /**
     * Submit function
     */
    this.submit = function() {
        this.bsf.submit();

        return this;
    };


    /**
     * Ajax submit function
     */
    this.ajaxSubmit = function() {
        App.ajax.setMethod('POST').request(this.getAction(), this.getData()).success(function(response) {
            _this.fireAjaxSuccessTrigger();
            App.bootstrap.notifyUser('Success: Changes saved', 'success');

        }).error(function(request, status, errorThrown) {
            _this.fireAjaxErrorTrigger();

            if (typeof request.responseJSON.errors !== 'undefined') {
                $.each(request.responseJSON.errors, function(key, error) {
                    App.log('Error: ' + error);
                    App.bootstrap.notifyUser('Error: <strong>' + error + '</strong>', 'danger');
                });

            } else {
                App.log('Error: ' + errorThrown);
                App.bootstrap.notifyUser('Error: <strong>' + errorThrown + '</strong>', 'danger');
            }
        });

        return this;
    };


    /**
     * Handle validator
     */
    this.handleValidator = function() {
        this.validator = this.bsf.validate({
            ignore   : ":not(select:hidden, input:hidden, input:visible, textarea:visible)",
            rules    : _this.rules,
            messages : _this.messages
        });

        return this;
    };


    /**
     * Handle cancel click
     */
    this.handleCancelClick = function(e) {
        e.preventDefault();
        _this.fireCancelTrigger();
    };


    /**
     * Handle submit click
     */
    this.handleSubmitClick = function(e) {
        e.preventDefault();

        _this.fireSubmitTrigger();

        if (_this.validate()) {
            if (_this.ajax) {
                _this.ajaxSubmit();

            } else {
                _this.submit();
            }

        } else {
            App.bootstrap.notifyUser('Validation failed: ' + _this.validator.numberOfInvalids() + ' field(s) are invalid', 'danger');
        }
        return false;
    };
};