/**
 * Get addresses
 *
 * @param $this
 */
function getAddresses($this)
{
    App.ajax.setReturnOrder('prepend');
    $.when(App.ajax.selectList($('#address_id').data('ajax-url'), '#address_id', {account_id : $this}, 'addressTrigger'));

}

/**
 * Get Contacts
 *
 * @param $this
 */
function getContacts($this)
{
    App.ajax.setReturnOrder('prepend');
    $.when(App.ajax.selectList($('#contact_id').data('ajax-url'), '#contact_id', {account_id : $this}, 'contactTrigger'));
}

/**
 * Address trigger
 */
$(document).on('addressTrigger', function()
{
    $('#address_id').prepend($('<option>', {value : '', text : 'Select Address', selected : 'selected'}))
});


/**
 * Contact trigger
 */
$(document).on('contactTrigger', function()
{
    $('#contact_id').prepend($('<option>', {value : '', text : 'New Contact', selected : 'selected'}))
});


/**
 * Contact sliders
 */
$(document).on('change', '#contact_id', (function()
{
    if ($(this).val() == '') {
        $('#contact-details').slideDown();

    } else {
        $('#contact-details').slideUp();
    }
}));


/**
 * Document ready function
 */
$(document).ready(function()
{
    $('#account_id').on("select2:select", function(e)
    {
        getContacts($(this).val());
        getAddresses($(this).val());
    });
});

