
/**
 *---------------------------------------------------------------
 * DECLARE VARIABLES
 *---------------------------------------------------------------
 */
// Option Details
var optionSubmitBtn  = $("#option-submit-btn");
var optionNameInput  = $("#option-name-input");
var optionTypeInput  = $("#option-type-input");
var optionPriceLabel = $("#option-price-label");
var optionPriceInput = $("#option-price-input");
var optionPriceBlock = $("#option-price-block");

// Rule Details
var addRuleBtn      = $(".add-rule-btn");
var removeRuleBtn   = $(".remove-rule-btn");
var ruleMinInput    = $('#rule-min-input');
var ruleMaxInput    = $('#rule-max-input');
var ruleCostInput   = $('#rule-cost-input');
var ruleBlock       = $("#rule-block");


/**
 *---------------------------------------------------------------
 * FORMAT CURRENCY
 *---------------------------------------------------------------
 */
function formatCurrency(input)
{
    return input.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&');
}


/**
 *---------------------------------------------------------------
 * RESET RULE
 *---------------------------------------------------------------
 */
function resetRuleFields()
{
    ruleMinInput.val('');
    ruleMaxInput.val('');
    ruleCostInput.val('');
}


/**
 *---------------------------------------------------------------
 * VALIDATE RULE
 *---------------------------------------------------------------
 */
function isValid()
{
    var valid = true;

    if (ruleMinInput.val() == '' || ruleMaxInput.val() == '' || ruleCostInput.val() == '') {
        App.bootstrap.notifyUser('<strong>Validation Failed:</strong> Please complete all rule fields in order to proceed.', 'danger');
        valid = false;
    }
    if (parseInt(ruleMinInput.val()) > parseInt(ruleMaxInput.val())) {
        ruleMaxInput.closest('.form-group').addClass('has-error');
        App.bootstrap.notifyUser('<strong>Validation Failed:</strong> Max value must be greater than min value', 'danger');
        valid = false;
    }

    $.each($('#option-rules tr'), function( index, value ) {
        var minVal = $(this).find('.rule-min-vals').val();
        var maxVal = $(this).find('.rule-max-vals').val();
        var cost = $(this).find('.rule-costs').val();

        if ((ruleMinInput.val() > minVal && ruleMinInput.val() < maxVal) || (ruleMaxInput.val() > minVal && ruleMaxInput.val() < maxVal)) {
            valid = false;
            App.bootstrap.notifyUser('<strong>Validation Failed:</strong> Min / Max range conflicts with existing rule.', 'danger');
            return false;
        }
    });

    ruleMaxInput.closest('.form-group').removeClass('has-error');
    return valid;
}


/**
 *---------------------------------------------------------------
 * DELIVERY OPTION TYPE
 *---------------------------------------------------------------
 */
function handleDeliveryOptionType()
{
    $(document).on('change', '#option-type-input', function(e)
    {
        // Is this a fixed or variable price
        if ($(this).val() == 1) {
            ruleBlock.hide();
            optionPriceLabel.html('Price');

        } else {
            ruleBlock.show();
            optionPriceLabel.html('Default Price');
        }
    });
}


/**
 *---------------------------------------------------------------
 * ADD DELIVERY OPTION RULE
 *---------------------------------------------------------------
 */
function handleAddDeliveryOptionRule()
{
    $(document).on('click', '.add-rule-btn', function(e)
    {
        event.preventDefault();

        // Is the form valid
        if (isValid()) {
            var url   = $(this).data('url');
            var token = $("input[name=_token]").val();

            $.ajax({
                url     : url,
                type    : 'POST',
                data    : {
                    _token : token,
                    delivery_option_id : optionTypeInput.val(),
                    min_value : ruleMinInput.val(),
                    max_value : ruleMaxInput.val(),
                    cost : ruleCostInput.val()
                },
                success : function(response) {
                    $("#option-rules").find('tbody').append(response);
                    resetRuleFields();
                }
            });
        }

        return false;
    });
}


/**
 *---------------------------------------------------------------
 * REMOVE DELIVERY OPTION RULE
 *---------------------------------------------------------------
 */
function handleRemoveDeliveryOptionRule()
{
    $(document).on('click', '.remove-rule-btn', function(e)
    {
        event.preventDefault();

        $(this).closest('tr').remove();

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
    handleDeliveryOptionType();
    handleAddDeliveryOptionRule();
    handleRemoveDeliveryOptionRule();
});


/**
 *---------------------------------------------------------------
 * WINDOW LOAD FUNCTIONS
 *---------------------------------------------------------------
*/
jQuery(window).load(function()
{

});