
/**
 * Properties
 *
 * @type {*|jQuery|HTMLElement}
 */

// Item Details
var addItemBtn             = $("#add-item-btn");
var itemDescription        = $('#item-description');
var itemDescriptionTrigger = $('#item-description-trigger');
var itemServiceId          = $('#item-product-id');
var itemUnitPrice          = $('#item-unit-price');
var itemQuantity           = $('#item-quantity');
var itemPaymentType        = $('#item-payment-type');

var itemSubtotal            = 0.00;
var itemSubtotalInput       = $('#item-subtotal');
var itemVatRate             = 0;
var itemVatRateInput        = $('#item-vat-rate');
var itemVatTotal            = 0.00;
var itemVatTotalInput       = $('#item-vat-total');
var itemVatBlock            = $('#item-vat-block');
var itemTotal               = 0.00;
var itemTotalInput          = $('#item-total');

// Current quote option
var currentQuoteOption      = null;

// Total Details
var paymentTypes            = [];
var subtotal                = 0.00;
var subtotalInput           = $('#subtotal');
var subtotalSpan            = $('#subtotal-span');
var vat                     = 0.00;
var vatInput                = $('#vat');
var vatSpan                 = $('#vat-span');
var total                   = 0.00;
var totalInput              = $('#total');
var totalSpan               = $('#total-span');

// Modals
var productModal            = new BootstrapModal();


/**
 * Format currency
 *
 * @param input
 * @returns {string}
 */
function formatCurrency(input)
{
    return input.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


/**
 * Generate random key
 *
 * @returns {string}
 */
function generateRandomKey()
{
    return Math.random().toString(36).substring(10);
}


/**
 * Reset item fields
 */
function resetItemFields()
{
    // Reset item fields
    itemServiceId.val('');
    itemUnitPrice.val('');
    itemDescription.val('');
    itemQuantity.val('');
    itemSubtotalInput.val('0.00');
    itemVatRateInput.val('0.00');
    $('#item-vat-rate').selectpicker('val', '0.00');
    itemVatTotalInput.val('0.00');
    itemTotalInput.val('0.00');
}


/**
 * Update item subtotal
 */
function updateItemSubtotal()
{
    var subtotal = formatCurrency(parseFloat(itemUnitPrice.val()) * parseFloat(itemQuantity.val()));
    itemSubtotalInput.val(subtotal);
    itemSubtotalInput.trigger('change');
}


/**
 * Update item total
 */
function updateItemTotal()
{
    // Get the subtotal
    itemSubtotal = itemSubtotalInput.val();

    // Set the vat total
    if (itemVatRateInput.val() != 0.00) {
        itemVatBlock.show();
        itemVatTotal = itemVatRateInput.val() * (itemSubtotal / 100);
        itemVatTotal = formatCurrency(itemVatTotal);
        itemVatTotalInput.val(itemVatTotal);

    } else {
        itemVatBlock.hide();
        itemVatTotal = 0.00;
        itemVatTotalInput.val(0.00);
    }

    // Update the grand total
    itemTotal = (parseFloat(itemSubtotal) + parseFloat(itemVatTotal));
    itemTotal = formatCurrency(itemTotal);
    itemTotalInput.val(itemTotal);
}


/**
 * Update quote totals
 *
 * @param optionKey
 */
function updateTotals(optionKey)
{
    var itemsTable  = $("#quote-form").find($('[data-option-key=' + optionKey + ']').attr('href') + ' table');
    var totalsTable = $(itemsTable).closest('.quote-option-tab-pane').find('.totals-table');
    var totals      = [];

    for (var paymentType in paymentTypes) {

        // Payment Type Totals object
        var paymentTypeTotals = {
            subtotal : 0.00,
            vat      : 0.00,
            total    : 0.00
        };

        // Get item payment type field
        var items = $(itemsTable).find('.item-payment-type[value=' + paymentTypes[paymentType] + ']');

        // If no items have this payment type, ignore it
        if (items.length) {

            // For each item row
            $(items).each(function(index) {
                var row = $(this).closest('tr');
                paymentTypeTotals.subtotal += parseFloat($(row).find('.item-subtotals').val()); // Subtotal
                paymentTypeTotals.vat += parseFloat($(row).find('.item-vat-totals').val()); // VAT
                paymentTypeTotals.total += parseFloat($(row).find('.item-totals').val()); // Total
            });

            // Add this payment type totals to the totals array
            totals[paymentTypes[paymentType]] = paymentTypeTotals;
        }
    }

    // Empty the body before repopulating
    $(totalsTable).find('tbody tr:not(.option-totals-row-stub)').empty();

    for (var total in totals) {
        var stub = $(totalsTable).find('.option-totals-row-stub');
        var type = $(stub).clone();

        $(type).removeClass('.option-totals-row-stub'); // Remove class
        $(type).find('[data-field=payment_type]').html(total); // Set Payment Type
        $(type).find('[data-field=subtotal]').html('&pound;' + formatCurrency(totals[total].subtotal ? totals[total].subtotal : 0.00)); // Set Subtotal
        $(type).find('[data-field=vat]').html('&pound;' + formatCurrency(totals[total].vat ? totals[total].vat : 0.00)); // Set VAT
        $(type).find('[data-field=total]').html('&pound;' + formatCurrency(totals[total].total ? totals[total].total : 0.00)); // Set Total

        stub.after('<tr>' + type.html() + '</tr>');
    }
}


/**
 * Add item function
 *
 * @param url
 * @returns {boolean}
 */
function addItem(url)
{
    var token = $("input[name=_token]").val();

    if (itemDescription.val() != ''
        && itemQuantity.val() != ''
        && itemSubtotalInput.val() != ''
        && itemTotalInput.val() != ''
    ) {
        $.ajax({
            url     : url,
            type    : 'POST',
            data    : {
                _token          : token,
                quote_option_id : currentQuoteOption,
                product_id      : itemServiceId.val(),
                unit_price      : itemUnitPrice.val(),
                description     : itemDescription.val(),
                quantity        : itemQuantity.val(),
                payment_type    : itemPaymentType.val(),
                vat_rate        : itemVatRateInput.val(),
            },
            success : function(response)
            {
                $('.empty-table-placeholder').remove();
                var paneId = $('[data-option-key=' + response.quote_option + ']').attr('href');
                $("#quote-form").find(paneId + ' .quote-items-table tbody').append(response.html);

                updateTotals(response.quote_option);
                resetItemFields();
            }
        });
        return true;
    }
    App.bootstrap.notifyUser('<strong>Validation Failed:</strong> Please complete all item fields in order to proceed.', 'danger');
    return false;
}


/**
 * Clone Tab
 */
function cloneTab(tabs, newOptionNumber, newOptionKey)
{
    var newTab = tabs.eq(0).clone();

    newTab.removeClass('active');
    newTab.find('a')
        .text('Option ' + newOptionNumber)
        .attr('href', '#quote-option-' + newOptionNumber)
        .attr('data-option', newOptionNumber)
        .attr('data-option-key', newOptionKey);

    $('#quote-option-tabs').append(newTab);
}


/**
 * Clone Tab Pane
 */
function cloneTabPane(panes, newOptionNumber, newOptionKey)
{
    var newPane = panes.eq(0).clone();

    newPane.attr('id', 'quote-option-' + newOptionNumber);
    newPane.removeClass('active');
    newPane.find('.quote-items-table tbody').empty();

    newPane.find('.quote-option-name')
        .attr('name', newPane.find('.quote-option-name').attr('name').replace(/options\[(\w+)\]/, "options[" + newOptionKey + "]"))
        .val('Option ' + newOptionNumber)
        .attr('data-default', 'Option ' + newOptionNumber);

    newPane.find('.quote-option-description')
        .attr('name', newPane.find('.quote-option-description').attr('name').replace(/options\[(\w+)\]/, "options[" + newOptionKey + "]"))
        .val('');

    $('#quote-option-panes').append(newPane);

    // REBIND TABS
    $('#quote-option-tabs li:last a').tab('show');
}


/**
 * Add quote option
 */
function addQuoteOption()
{
    var tabs               = $('#quote-option-tabs li.quote-option-tab');
    var panes              = $('#quote-option-panes > .tab-pane');
    var optionCount        = tabs.length;

    var newOptionNumber    = parseInt(optionCount + 1);
    var newOptionButtonTab = $('#new-quote-option-button').parent('li');
    var newOptionKey       = generateRandomKey();

    // Clone the tab
    cloneTab(tabs, newOptionNumber, newOptionKey);
    cloneTabPane(panes, newOptionNumber, newOptionKey);
}


/**
 * Set current quote option
 *
 * @param selector
 */
function setCurrentQuoteOption(selector)
{
    if (!selector) {
        selector = $('#quote-option-tabs li.active a');
    }

    var option = $(selector).data('option-key');
    if (option) {
        currentQuoteOption = option;
    }
}

/**
 * Update item fields
 *
 * @param data
 */
function updateItemFields(data)
{
    itemServiceId.val(data.id);
    itemUnitPrice.val(data.price);
    itemDescription.val(data.name);
    itemQuantity.val('1');
    itemSubtotalInput.val(data.price);
    itemVatTotalInput.val('0.00');
    itemTotalInput.val(data.price);
}


/**
 * Get service
 *
 * @param url
 */
function getProduct(url)
{
    if (url !== '') {
        $.ajax({
            url      : url,
            type     : 'GET',
            dataType : 'json',
            cache    : false,
            success  : function(data) {
                updateItemFields(data);
                App.bootstrap.notifyUser('Item Details Updated', 'success');
            },
            fail : function(data) {
                App.bootstrap.notifyUser('Item Update Failed', 'danger');
            }
        });

    } else {
        resetItemFields();
    }
}


/**
 * Get products by category
 */
function getProductsByCategory()
{
    var categoryId  = $('#category-selector').val();
    var url         = $('#category-selector').data('url');

    $.ajax({
        url     : url,
        type    : 'GET',
        data    : {category_id : categoryId},
        success : function(response)
        {
            var option;
            var html = '<option value="">-- Please Select --</option>';
            for (option in response) {
                html += '<option value="' + response[option].id + '">' + response[option].name + '</option>';
            }

            $('#product-selector').empty();
            $('#product-selector').html(html);
            $('#product-selector').selectpicker('refresh');
        }
    });
}


/**
 * Handle product modal category
 */
function handleProductModalCategory()
{
    $(document).on('change', '#category-selector', function(e) {
        getProductsByCategory();
    });
}


/**
 * Handle product modal submit button
 */
function handleProductModalSubmit()
{
    $(document).on('click', '#add-product-button', function(e)
    {
        e.preventDefault();

        var url       = $(this).data('get-product-url');
        var productId = $(this).closest('.modal').find('select[name=products]').val();

        if (productId !== '') {
            getProduct(url + '/' + productId);
            hideProductModal();

        } else {
            App.bootstrap.notifyUser('Validation failed: Please select a product', 'danger');
        }

        return false;
    });
}


/**
 * Show product modal
 */
function showProductModal(object)
{
    // Setup the modal
    productModal.bsm_title.html(object.data('title'));
    productModal.bsm_body.css({"overflow" : "visible"});
    productModal.bsm.find('.slimScrollDiv').css({"overflow" : "visible"});
    productModal.bsm_primary
        .removeClass('btn-primary')
        .addClass('btn-success')
        .html(object.data('button'));

    // Load the form
    productModal.bsm_body.load(object.data('url'), function() {
        handleProductModalCategory();
        handleProductModalSubmit();
    });

    // Show the footer and the modal
    productModal.bsm.modal('show');
}


/**
 * Hide product modal
 */
function hideProductModal()
{
    productModal.bsm.modal('hide');
}


/**
 * Handle product lookup button
 */
function handleProductLookUpBtn()
{
    $(document).on('click', '#lookup-product-button', function(e)
    {
        e.preventDefault();

        showProductModal($(this));

        return false;
    });
}


/**
 * Handle Quote option button
 */
function handleAddQuoteOptionBtn()
{
    $(document).on('click', '#add-quote-option-button', function(e)
    {
        e.preventDefault();

        addQuoteOption();

        return false;
    });
}


/**
 * Handle Tab show
 */
function handleTabShow()
{
    $(document).on('shown.bs.tab', function(e) {
        setCurrentQuoteOption(e.target);
        updateTotals(currentQuoteOption);
    });
}


/**
 * Handle item subtotal
 */
function handleItemSubtotal()
{
    $(document).on('change keyup', '#item-unit-price, #item-quantity', function(e) {
        updateItemSubtotal();
    });
}


/**
 * Handle item total
 */
function handleItemTotal()
{
    $(document).on('change blur keyup', '#item-subtotal, #item-vat-rate', function(e) {
        updateItemTotal();
    });
}

/**
 * Handle option name
 */
function handleOptionName()
{
    $(document).on('keyup change', '.quote-option-name', function(e) {
        var text = $(this).val();
        var tab  = $('.quote-option-tab a[href=#' + $(this).closest('.quote-option-tab-pane').attr('id') + ']');
        tab.text(text == '' ? $(this).data('default') : text);
    });

    $(document).on('blur', '.quote-option-name', function(e) {
        if ($(this).val() == '') {
            $(this).val($(this).data('default'));
        }
    });
}


/**
 * Handle add item button
 */
function handleAddItemBtn()
{
    $(document).on('click', '#add-item-btn', function(e) {
        addItem($(this).data('url'));
    });
}


/**
 * Handle remove item button
 */
function handleRemoveItemBtn()
{
    $(document).on('click', '.remove-item-btn', function(e)
    {
        e.preventDefault();

        $(this).closest('tr').remove();
        updateTotals(currentQuoteOption);

        return false;
    });
}


/**
 * Document ready function
 */
$(document).ready(function()
{
    setCurrentQuoteOption();
    updateTotals(currentQuoteOption);
    getProductsByCategory();
});


/**
 * Window load function
 */
$(window).load(function()
{
    handleProductLookUpBtn();
    handleItemSubtotal();
    handleItemTotal();
    handleOptionName();

    handleAddItemBtn();
    handleRemoveItemBtn();

    handleAddQuoteOptionBtn();
    handleTabShow();
});
