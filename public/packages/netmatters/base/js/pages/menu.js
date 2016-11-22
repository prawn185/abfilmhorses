/**
 *---------------------------------------------------------------
 * DECLARE VARIABLES
 *---------------------------------------------------------------
 */
var form = jQuery('#menu-items');
var token = jQuery('input[name="_token"]', form).val();


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
jQuery(document).ready(function() {
    // Create the sortable object
    if ($('.sortable').length >= 1) {
        jQuery('.sortable').sortable({
            handle : '.sort-move',
            items : ':not(.disabled)'
        });
    }




    // On sort do the following
    jQuery('.sortable').bind('sortupdate', function(e, ui) {
        fireSort();
    });

    linkType($('#link_type'));

    lookupItems($('#page-type-select'));
});


// Ajax Call to show all of the related pages from a category.
$(document).on('change', '#page-type-select', function() {
    lookupItems($(this));
});


// On change of the Link Type text box, show and hide the relevant field.
$(document).on('change', '#link_type', function() {
    linkType($(this));
});

function linkType(selector) {
    if (selector.val() == 1) {
        $('#link').hide();
        $('#pages').show();
    } else {
        $('#link').show();
        $('#pages').hide();
    }
}

function lookupItems(selector) {
    var value = selector.val();
    var current = $('#page-type-items').data('selected');
    var url = selector.data('url');
    var token = $("input[name=_token]").val();

    if (value != '') {
        $.ajax({
            url : url,
            type : 'POST',
            dateType : 'json',
            data : {type : value, _token : token},
            success : function(response) {
                var html = '';

                for (var item in response) {
                    var selectedHtml = current == item ? ' selected="selected"' : '';

                    html += '<option value="' + item + '"' + selectedHtml + '>' + response[item] + '</option>';
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
}

function fireSort() {
    var items = jQuery('.sortable > li');
    var rows = [];


    // Foreach item, update the order push back into array
    items.each(function() {
        var index = items.index(this);
        var id = jQuery(this).attr('id');
        var order = jQuery(this).children().find('.label');
        order.text(index);

        row = {};
        row['id'] = id;
        row['order'] = index;
        rows.push(row);
    });
    rows = JSON.stringify(rows);
    // Post the data to the current url
    jQuery.ajax({
        type : "POST",
        data : {
            'rows' : rows,
            '_token' : token
        },
        url : form.attr('action'),
    });
}
/**
 *---------------------------------------------------------------
 * WINDOW: LOAD
 *---------------------------------------------------------------
 */
jQuery(window).load(function() {

});
