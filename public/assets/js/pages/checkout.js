/**
 *---------------------------------------------------------------
 * DOCUMENT READY FUNCTIONS
 *---------------------------------------------------------------
*/

    $(document).ready(function()
    {
        saveDeliveryOption();
    });



/**
 *---------------------------------------------------------------
 * WINDOW LOAD FUNCTIONS
 *---------------------------------------------------------------
*/

    function saveDeliveryOption()
    {
        $('select[name=delivery_option_id]').change(function() {
            $('input[name=delivery_option_id]').val($(this).val());
        });
    }
