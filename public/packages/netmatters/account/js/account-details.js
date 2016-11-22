
/**
 * Declare variables
 *
 * @type {string}
 */
var accountDetailsForm;
var accountStatusForm;
var primaryAddressForm;
var primaryContactForm;


/**
 * Handle account details form
 */
function handleAccountDetailsForm() {
    accountDetailsForm = new App.editableForm().init('#account-details');
}


/**
 * Handle account status form
 */
function handleAccountStatusForm() {
    accountStatusForm = new App.editableForm().init('#account-status');
}


/**
 * Handle primary address form
 */
function handlePrimaryAddressForm() {
    primaryAddressForm = new App.editableForm().init('#primary-address');
}


/**
 * Handle primary contact form
 */
function handlePrimaryContactForm() {
    primaryContactForm = new App.editableForm().init('#primary-contact');
}


/**
 * Handle the account details trigger
 */
function handleAccountDetailsTrigger() {
    $(document).on(accountDetailsForm.form.ajaxSuccessTrigger, function(element) {
        $('#account-name').load(App.currentUrl + ' #account-name > *');
    });
}


/**
 * Handle the account status trigger
 */
function handleAccountStatusTrigger() {
    $(document).on(accountStatusForm.form.ajaxSuccessTrigger, function(element) {
        $('#account-name').load(App.currentUrl + ' #account-name > *');
        $('.timestamps').load(App.currentUrl + ' .timestamps > *');
    });
}


/**
 * Handle the primary address trigger
 */
function handlePrimaryAddressTrigger() {
    $(document).on(primaryAddressForm.form.ajaxSuccessTrigger, function(element) {
        $('#primary-contact').load(App.currentUrl + ' #primary-contact > *', function(data) {
            handlePrimaryContactForm();
            handleMap();
        });
    });
}


/**
 * Handle the primary contact trigger
 */
function handlePrimaryContactTrigger() {
    $(document).on(primaryContactForm.form.ajaxSuccessTrigger, function(element) {

    });
}


/**
 * Handle google map
 */
function handleMap() {
    var mapCanvas = $('#map-canvas');
    if (mapCanvas.length > 0 && mapCanvas.data('address')) {
        var address = mapCanvas.data('address');
        mapCanvas.html(App.map.dynamic(address));
    }
}


/**
 * Document ready event
 */
$(document).ready(function()
{
    handleAccountDetailsForm();
    handleAccountStatusForm();
    handlePrimaryAddressForm();
    handlePrimaryContactForm();

    handleAccountDetailsTrigger();
    handleAccountStatusTrigger();
    handlePrimaryAddressTrigger();
    handlePrimaryContactTrigger();

    handleMap();
});