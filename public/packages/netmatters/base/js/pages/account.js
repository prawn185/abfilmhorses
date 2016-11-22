/**
 *---------------------------------------------------------------
 * DECLARE VARIABLES
 *---------------------------------------------------------------
 */
var table = '.account-manage';
var ajaxUrl = $('.account-manage').data('ajax');
var filteredTable;

var typeIDs = [];
/**
 *---------------------------------------------------------------
 * CREATE DATA TABLE
 *---------------------------------------------------------------
 */
function createDatatable() {

    filteredTable = $(table).dataTable({
        "aLengthMenu" : [[10, 25, 50, 100, 200, 500, 1000], [10, 25, 50, 100, 200, 500, 1000]],
        "iDisplayLength" : 10,
        "bProcessing" : true,
        "bServerSide" : true,
        "sAjaxSource" : ajaxUrl,
        'sDom' : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
        "aoColumns" : [

            {"sClass" : ""},
            {"sClass" : ""},
            {"sClass" : ""},
            {"sClass" : "actions", "bSortable" : false}
        ],
        "fnServerData" : function(sSource, aoData, fnCallback) {
            /* Add some extra data to the sender */
            aoData.push({"name" : "typeIDs", "value" : typeIDs});


            var request = jQuery.ajax({
                "url" : sSource,
                "data" : aoData,
                "dataType" : "json",
                "cache" : false
            });
            request.success(
                function(result) {
                    fnCallback(result);
                }
            );
        },
        "aaSorting" : [[0, 'asc']]
    });
}


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
jQuery(document).ready(function() {
    createDatatable();
    $(document).on('change', '#account_type', function() {
        typeIDs = $(this).val();
        filteredTable.fnDraw();
    });
});