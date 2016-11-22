
var product_id = $('#product_id').html();

var token = $('input[name="_token"]').val();


function loadPrice() {

    form = $('#attribute_form').serialize();
    console.log(form);
    $.ajax({
        url : ajaxPath,
        type : 'POST',
        data : form,
        success : function(response) {
            $('.product-price').html('&pound;' + response);
        }

    });
}

/**
 *---------------------------------------------------------------
 * DOCUMENT READY FUNCTIONS
 *---------------------------------------------------------------
 */
jQuery(document).ready(function()
{
    loadPrice();
    $('#related-products').carousel({
        interval: 10000
    });

    $(document).on('change', '.attribute_select', function() {
        loadPrice();
    });
});


/**
 *---------------------------------------------------------------
 * WINDOW LOAD FUNCTIONS
 *---------------------------------------------------------------
 */




