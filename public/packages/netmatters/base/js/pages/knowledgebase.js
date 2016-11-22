/**
 *---------------------------------------------------------------
 * DECLARE VARIABLES
 *---------------------------------------------------------------
 */
var form  = $('#menu-items');
var token = $('input[name="_token"]', form).val();


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
$(document).ready(function()
{
    // Create the sortable object
    $('.sortable tbody').sortable({
        handle : '.sort-move',
        items  : ':not(.disabled)',
        helper : function(e, tr)
        {
            var $originals = tr.children();
            var $helper    = tr.clone();
            $helper.children().each(function(index)
            {
                // Set helper cell sizes to match the original sizes
                $(this).width($originals.eq(index).width());
            });
            return $helper;
        }
    });

    $('.sortable tbody').disableSelection();


    // On sort do the following
    $('.sortable').bind('sortupdate', function(e, ui)
    {
        fireSort();

    });

});


// Ajax Call to show all of the related pages from a category.
$(document).on('change', '#page-type-select', function()
{
    var value = $(this).val();
    var url   = $(this).data('url');
    var token = $("input[name=_token]").val();

    if (value != '') {
        $.ajax({
            url      : url,
            type     : 'POST',
            dateType : 'json',
            data     : {type : value, _token : token},
            success  : function(response)
            {
                var html = '';

                for (var item in response) {
                    html += '<option value="' + item + '">' + response[item] + '</option>';
                }

                $('#page-type-items').html(html).removeAttr('disabled').removeClass('disabled').selectpicker('refresh');
            }
        });
    } else {
        if ($('#page-type-items').attr('disabled') == 'disabled') {
            $('#page-type-items').html('<option value="0">--- Type Required ---</option>').addClass('disabled').selectpicker('refresh');
        } else {
            $('#page-type-items').html('<option value="0">--- Type Required ---</option>').prop('disabled', true).addClass('disabled').selectpicker('refresh');

        }
    }

});


function fireSort()
{
    var items = $('.sortable > tr');
    var rows  = [];


    // Foreach item, update the order push back into array
    items.each(function()
    {
        var index = items.index(this);
        var id    = $(this).attr('id');
        var order = $(this).children().find('.label');
        order.text(index);

        row          = {};
        row['id']    = id;
        row['order'] = index;
        rows.push(row);
    });
    rows      = JSON.stringify(rows);
    // Post the data to the current url
    $.ajax({
        type : "POST",
        data : {
            'rows'   : rows,
            '_token' : token
        },
        url  : form.attr('action')
    });
}


/**
 *---------------------------------------------------------------
 * WINDOW: LOAD
 *---------------------------------------------------------------
 */
$(window).load(function()
{

});
