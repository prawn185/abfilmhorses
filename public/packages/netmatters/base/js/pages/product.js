/**
 *---------------------------------------------------------------
 * -- DECLARE VARIABLES
 *---------------------------------------------------------------
 */
var form           = $('#product-form');
var title          = $('#page-title', form);
var url            = $('#page-url', form);
var description    = $('#page-description', form);
var seoTitle       = $('.seo-title', form);
var seoUrl         = $('.seo-url span', form);
var seoDescription = $('.seo-description', form);

var table   = '.product-manage';
var ajaxUrl = $('.product-manage').data('ajax');
var filteredTable;

var typeIDs = [];


/****************************************************************************************************************
 * Document Ready Functions
 *****************************************************************************************************************/

$(document).ready(function()
{
    // Validation
    form.validate({
        ignore : ":not(select:hidden, input:hidden, input:visible, textarea:visible)",
    });

    createDatatable();
    $(document).on('change', '#account_type', function()
    {
        typeIDs = $(this).val();
        filteredTable.fnDraw();
    });

});


/**
 *---------------------------------------------------------------
 * CREATE DATA TABLE
 *---------------------------------------------------------------
 */
function createDatatable()
{
    filteredTable = $(table).dataTable({
        "lengthMenu"   : [[10, 25, 50, 100, 200, 500, 1000], [10, 25, 50, 100, 200, 500, 1000]],
        "pageLength"   : 10,
        "processing"   : true,
        "serverSide"   : true,
        "retrieve"     : true,
        "ajax"         : ajaxUrl,
        'dom'          : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
        "columns"      : [
            {"className" : ""},
            {"className" : "actions", "orderable" : false},
            {"className" : ""},
            {"className" : ""},
            {"className" : "actions", "orderable" : false}
        ],
        "fnServerData" : function(sSource, aoData, fnCallback)
        {
            /* Add some extra data to the sender */
            // aoData.push({"name" : "typeIDs", "value" : typeIDs});

            var request = jQuery.ajax({
                "url"      : sSource,
                "data"     : aoData,
                "dataType" : "json",
                "cache"    : false
            });
            request.success(
                function(result)
                {
                    fnCallback(result);
                }
            );
        },
        "order"        : [[0, 'asc']]
    });
}


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
jQuery(document).ready(function()
{
    createDatatable();
});


/****************************************************************************************************************
 * Document Load Functions
 *****************************************************************************************************************/

$(window).load(function()
{
    // Page Title
    title.on('keyup keypress blur change', function()
    {
        seoTitle.html(title.val());
    });

    // Page Url
    url.on('keyup keypress blur change', function()
    {
        var slug = url.val().toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '');
        url.val(slug);
        seoUrl.html(slug);
    });

    // Page Description
    description.on('keyup keypress blur change', function()
    {
        seoDescription.html(description.val());
    });

});
