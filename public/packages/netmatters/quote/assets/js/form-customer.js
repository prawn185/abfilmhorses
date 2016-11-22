/**
 *---------------------------------------------------------------
 * DECLARE VARIABLES
 *---------------------------------------------------------------
 */

// Form Details
var quoteId                 = $("#quote-id");
var submitBtn               = $('#submit-btn');
var validator;

// Account Details
var accountInput            = $("#account_id");
var accountBtn              = $(".account-btn");

// Contact Details
var contactInput            = $("#contact_id");
var contactBtn              = $(".contact-btn");
var contactUrl              = contactInput.data('url');

// Address Details
var invoiceAddressInput     = $("#invoice_address_id");
var siteAddressInput        = $("#site_address_id");
var addressBtn              = $(".address-btn");
var invoiceAddressUrl       = invoiceAddressInput.data('url');
var siteAddressUrl          = siteAddressInput.data('url');


/**
 *---------------------------------------------------------------
 * SETUP VALIDATION
 *---------------------------------------------------------------
 */
function handleValidation()
{
    // Setup validation
    validator = $("#quote-form").validate({
        ignore: [],
        rules: {
            account_id: {
                required: function(element) {
                    if (!$("#account_id").val() >= 1) {
                        return true;
                    }
                }
            },
            contact_id: {
                required: function(element) {
                    if (!$("#contact_id").val() >= 1) {
                        return true;
                    }
                }
            },
            invoice_address_id: {
                required: function(element) {
                    if (!$("#invoice_address_id").val() >= 1) {
                        return true;
                    }
                }
            },
            site_address_id: {
                required: function(element) {
                    if (!$("#site_address_id").val() >= 1) {
                        return true;
                    }
                }
            }
        }
    });
}


/**
 *---------------------------------------------------------------
 * HANDLE WIZARD
 *---------------------------------------------------------------
 */
function handleWizard()
{
    $("#quote-form").bootstrapWizard({
        'nextSelector'     : '.btn-next',
        'previousSelector' : '.btn-previous',
        'onTabShow' : function(tab, navigation, index)
        {
            var total      = navigation.find('li').length;
            var current    = index + 1;

            if (current >= total) {
                $('.btn-finish').prop('disabled', false);

            } else {
                $('.btn-finish').prop('disabled', true);
            }
        },
        'onTabClick': function(tab, navigation, index)
        {
            var valid = $("#quote-form").valid();
            if (valid) {
                tab.removeClass('error');
                tab.addClass('success');
                $(tab).find('i').remove();
                $(tab).find('a').prepend('<i class="glyphicons ok"></i>');
                return true;

            } else {
                tab.removeClass('success');
                tab.addClass('error');
                $(tab).find('i').remove();
                $(tab).find('a').prepend('<i class="glyphicons remove"></i>');
                validator.focusInvalid();
                return false;
            }
        },
        'onNext': function(tab, navigation, index)
        {
            var valid = $("#quote-form").valid();
            if (valid) {
                tab.removeClass('error');
                tab.addClass('success');
                $(tab).find('i').remove();
                $(tab).find('a').prepend('<i class="glyphicons ok"></i>');
                return true;

            } else {
                tab.removeClass('success');
                tab.addClass('error');
                $(tab).find('i').remove();
                $(tab).find('a').prepend('<i class="glyphicons remove"></i>');
                validator.focusInvalid();
                return false;
            }
        }
    });
}


/**
 *---------------------------------------------------------------
 * GET: ACCOUNTS
 *---------------------------------------------------------------
 */
function getAccounts(id)
{

        // If the user has added a new account automatically select it
    if (id !== null && id !== undefined) {

        getContacts(contactInput.val());
        getInvoiceAddresses();
        getSiteAddresses();
        handleBtnState();
    };
}


/**
 *---------------------------------------------------------------
 * GET: CONTACTS
 *---------------------------------------------------------------
 */
function getContacts(id)
{

    if (!$('#contact_id').length) {
        return false;
    }

    App.ajax.selectList(contactUrl, '#contact_id', {account_id  : $("#account_id").val()}, 'contactCreatedSuccess');

    // If the user has added a new contact automatically select it
    $(document).on('contactCreatedSuccess', function(e, data) {
        if (id !== null && id !== undefined) {
            $("#contact_id").val(id);
            $("#contact_id").selectpicker('refresh');
        }
    });
}


/**
 *---------------------------------------------------------------
 * GET: ADDRESSES
 *---------------------------------------------------------------
 */
function getInvoiceAddresses(invoiceId)
{

    if (!$('#invoice_address_id').length) {
        return false;
    }

    App.ajax.selectList(invoiceAddressUrl, '#invoice_address_id', {account_id  : $("#account_id").val()}, 'invoiceAddressCreatedSuccess');

    // If the user has added a new contact automatically select it
    $(document).on('invoiceAddressCreatedSuccess', function(e, data) {
        if (invoiceId !== null && invoiceId !== undefined) {
            $("#invoice_address_id").val(invoiceId);
            $("#invoice_address_id").selectpicker('refresh');
        }
    });
}

function getSiteAddresses(siteId)
{

    if (!$('#site_address_id').length) {
        return false;
    }

    App.ajax.selectList(siteAddressUrl, '#site_address_id', {account_id  : $("#account_id").val()}, 'siteAddressCreatedSuccess');

    $(document).on('siteAddressCreatedSuccess', function(e, data) {
        if (siteId !== null && siteId !== undefined) {
            $("#site_address_id").val(siteId);
            $("#site_address_id").selectpicker('refresh');
        }
    });
}

/**
 *---------------------------------------------------------------
 * HANDLE BUTTON STATE
 *---------------------------------------------------------------
 */
function handleBtnState()
{
    if ($("#account_id").val() == '' || $("#account_id").val() == 0) {
        contactBtn.prop('disabled', true);
        addressBtn.prop('disabled', true);
        contactInput.prop('disabled', true);
        invoiceAddressInput.prop('disabled', true);
        siteAddressInput.prop('disabled', true);

    } else {
        contactBtn.prop('disabled', false);
        addressBtn.prop('disabled', false);
        contactInput.prop('disabled', false);
        invoiceAddressInput.prop('disabled', false);
        siteAddressInput.prop('disabled', false);
    }
    contactInput.selectpicker('refresh');
    invoiceAddressInput.selectpicker('refresh');
    siteAddressInput.selectpicker('refresh');
}


/**
 *---------------------------------------------------------------
 * HANDLE ACCOUNT INPUT
 *---------------------------------------------------------------
 */
function handleAccount()
{
    if(contactInput.data('value')) {
        getContacts(contactInput.data('value'));
    }

    if(invoiceAddressInput.data('value')) {
        getInvoiceAddresses(invoiceAddressInput.data('value'));
    }

    if(siteAddressInput.data('value')) {
        getSiteAddresses(siteAddressInput.data('value'));
    }

    // Handle account input change
    $('#account_id').on("select2:select", function(e)
    {
        if (accountInput.val() != '' && accountInput.val() != 0) {
            getContacts();
            getInvoiceAddresses();
            getSiteAddresses();
        }
        handleBtnState();
    });

    // Handle account modal loaded
    $(document).on('accountModalLoaded', function(e) {
        App.bootstrap.handleSelectBox();
    });

    // Handle account modal success
    $(document).on('accountModalSuccess', function(e, data) {
        getAccounts(data.account.id);
        $('.modal').modal('hide');
    });
}


/**
 *---------------------------------------------------------------
 * HANDLE CONTACT INPUT
 *---------------------------------------------------------------
 */
function handleContact()
{

    // Handle contact modal loaded
    $(document).on('contactModalLoaded', function(e) {
        App.bootstrap.handleSelectBox();
        $('input[name=account_id]').val($("#account_id").val());
    });

    // Handle contact modal success
    $(document).on('contactModalSuccess', function(e, data) {
        getContacts(data.contact.id);
        $('.modal').modal('hide');
    });
}


/**
 *---------------------------------------------------------------
 * HANDLE ADDRESS INPUT
 *---------------------------------------------------------------
 */
function handleSiteAddress()
{

    // Handle address modal loaded
    $(document).on('siteAddressModalLoaded', function(e) {
        App.bootstrap.handleSelectBox();
        $('input[name=account_id]').val($("#account_id").val());
    });

    // Handle address modal success
    $(document).on('siteAddressModalSuccess', function(e, data) {
        getSiteAddresses(data.address.id);
        $('.modal').modal('hide');
    });
}

function handleInvoiceAddress()
{
    // Handle address modal loaded
    $(document).on('invoiceAddressModalLoaded', function(e) {
        App.bootstrap.handleSelectBox();
        $('input[name=account_id]').val($("#account_id").val());
    });

    // Handle address modal success
    $(document).on('invoiceAddressModalSuccess', function(e, data) {
        getInvoiceAddresses(data.address.id);
        $('.modal').modal('hide');
    });
}


/**
 *---------------------------------------------------------------
 * HANDLE CONVERT TO QUOTE
 *---------------------------------------------------------------
 */
function handleConvert()
{
    // Convert the quote and ajax reload the page
    $(document).on('click', '.convert-btn', function(e) {

        e.preventDefault();

        showPageLoading();

        $.get($(this).data('url'), {quote_id : $(this).data('id')}).done(function(data)
        {
            $('#main').load(window.location.href + ' #main > *', function() {
                hidePageLoading();
                $('.selectpicker').selectpicker();
            });
        });

        return false;
    });
}

/**
 *---------------------------------------------------------------
 * DOCUMENT READY FUNCTIONS
 *---------------------------------------------------------------
 */
jQuery(document).ready(function()
{
    handleBtnState();
    handleValidation();
    handleWizard();
    handleAccount();
    handleContact();
    handleInvoiceAddress();
    handleSiteAddress();
    handleConvert();
});


/**
 *---------------------------------------------------------------
 * WINDOW LOAD FUNCTIONS
 *---------------------------------------------------------------
 */
jQuery(window).load(function()
{


});
