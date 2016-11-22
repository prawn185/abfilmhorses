/**
 *---------------------------------------------------------------
 * DOCUMENT READY FUNCTIONS
 *---------------------------------------------------------------
*/

    $(document).ready(function()
    {
        updateQuantity();
    });


/**
 *---------------------------------------------------------------
 * CAPTURE NEW QUANTITY AMOUNT
 *---------------------------------------------------------------
*/

    function updateQuantity()
    {
        $('.item-qty button').click(function() {

            var data        = {};

            var value       = $(this).val();
            var form        = $(this).closest('form');
            data.id         = form.find('[name=cart_item_id]').val();
            data.token      = form.find('[name=_token]').val();
            data.qty        = parseInt(form.find('[name=qty]').val());
            data.url        = form.attr('action');
            data.action     = 'save';

            // Decrease
            if (data.qty > 1 && value == '-1') {
                data.qty -= 1;
            }

            // Increase
            if (value == '+1') {
                data.qty += 1;
            }

            // Set new quantities
            form.find('[name=qty]').val(data.qty);

            // Save new amount
            saveQuantity(data);
            return false;

        });
    }


/**
 *---------------------------------------------------------------
 * SAVE QUANTITY TO SESSION
 *---------------------------------------------------------------
*/

    function saveQuantity(data)
    {

        // Post the data to the current url
        var request = $.ajax({
            type : "POST",
            data : {
                'cart_item_id'  : data.id,
                '_token'        : data.token,
                'qty'           : data.qty,
                'action'        : data.action
            },
            dataType: 'json',
            url  : data.url,
        });

        request.done(function(object)
        {

            // Get current prices
            var row = $('#cart_item_' + data.id);
            var cartTotal = $('.cart-totals');

            // Set new prices
            row.find('.item-subtotal').text('£' + object.items[data.id].itemPrice);
            cartTotal.find('.subtotal').text('£' + object.subtotal);
            cartTotal.find('.delivery').text('£' + object.delivery);
            cartTotal.find('.vat').text('£' + object.vat);
            cartTotal.find('.total').text('£' + object.total);

        });
    }
