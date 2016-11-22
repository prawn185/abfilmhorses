
/**
 * Declare variables
 *
 * @type {string}
 */
var table   = '.address-manage';
var filteredTable;

/**
 * Handle data table
 */
function handleDataTable()
{
    filteredTable = $(table).DataTable({
        'lengthMenu'  : [[10, 25, 50, 100, 200, 500, 1000], [10, 25, 50, 100, 200, 500, 1000]],
        'pageLength'  : 10,
        'dom'         : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
        'deferRender' : true,
        'responsive'  : true,
        'autoWidth'   : false,
        'searchDelay' : 1500,
        'order'       : [[0, 'asc']],

        "columns" : [
            {"className" : ""},
            {"className" : ""},
            {"className" : ""},
            {"className" : "actions", "orderable" : false}
        ],

        'language'  : {
            'paginate' : {
                'next'     : '<i class="mdi-navigation-arrow-forward"></i>',
                'previous' : '<i class="mdi-navigation-arrow-back"></i>'
            },
            "search"   : ""
        },

        'processing' : true,
        'serverSide' : true,
        'ajax'       : $(table).data('ajax')
    });

    $('.dataTables_filter input[type=search]').attr('placeholder', 'Search...');
}


/**
 * Handle address type
 */
function handleAccountType()
{
    $(document).on('change', '#address_type', function()
    {
        // Listen for the data table ajax pre-flight event and append the data
        filteredTable
            .on('preXhr.dt', function(e, settings, data) {
                data.type_ids = $('#address_type').val();
            })
            .ajax.reload();
    });
}


/**
 * Document ready event
 */
$(document).ready(function() {
    handleDataTable();
    handleAccountType();
});