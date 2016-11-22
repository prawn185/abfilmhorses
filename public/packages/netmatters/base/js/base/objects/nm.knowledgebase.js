/**
 *---------------------------------------------------------------
 * DATA TABLES
 *---------------------------------------------------------------
 * OVERWRITE
 */

action = $('#form-sortable').attr('action');
token = jQuery('input[name="_token"]', $('#form-sortable')).val();
parent_id = jQuery('input[name="parent_id"]', $('#form-sortable')).val();



//function sortableTables()
//{
//    $(".data-tables-sortable tbody").sortable({
//        handle : '.sort-move',
//    });
//
//    // On sort do the following
//    $(document).on('sortupdate', '.data-tables-sortable tbody', function(e, ui)
//    {
//
//
//
//        //Post the data to the current url
//        var request = $.ajax({
//        type : "POST",
//        data : {
//            'rows'   : rows,
//            '_token' : token,
//            'parent_id' : parent_id
//        },
//        url  : action
//    });
//
//        request.done(function(msg)
//        {
//
//            var i = 1;
//            $('#form-sortable').find('.pnum').each(function()
//            {
//                $(this).html(i);
//                i++;
//            });
//
//        });
//
//        items.css('display', 'none !important');
//
//    });


function getRows() {
    var items = $('.data-tables-sortable tbody tr');
    var rows = [];

    // Foreach item, update the order push back into array
    items.each(function()
    {
        var index = $('.data-tables-sortable tbody').children().index(this);
        row = {};
        row.order = index;

        var id = $(this).data('id');
        row.id = id;
        rows[id] = row;

    });
    return rows;
}



$(document).ready(function() {

    var rows;

    $('.data-tables-sortable').tableDnD({

        onDragClass: "dragging",
        onDrop: function (table, row) {
            rows = getRows();
            $.ajax({
                url: action,
                data : {
                    'rows'   : rows,
                    '_token' : token,
                    'parent_id' : parent_id
                },
                dataType: 'json',
                type: 'POST',
                success: function(data) {
                    $('#sort-response').remove();

                    $('#image-list').prepend('<tr id="sort-response"><td colspan="7"><div class="alert alert-' + data.message_type + '"><button data-dismiss="alert" class="close">&times;</button><p>' + data.message + '</p></div></td></tr>');

                    setTimeout(function() {
                        $('#sort-response').fadeOut();
                    }, 2000);
                }
            }).complete(function()
            {
                var i = 1;
                $('#form-sortable').find('.pnum').each(function()
                {

                    $(this).html(i);
                    i++;
                });

            });
        },
        dragHandle: ".dragHandle"

    });
});
