/**
 *---------------------------------------------------------------
 * DECLARE VARIABLES
 *---------------------------------------------------------------
 */
var form           = $('#page-form');
var pageName       = $('#name', form);
var seoTitle       = $('.seo-title', form);
var seoUrl         = $('.seo-url', form);
var seoDescription = $('.seo-description', form);
var successBtn     = $('.btn-success', form);

var dataTable = $('#manage-pages');
var ajaxUrl   = dataTable.data('ajax');


/**
 *---------------------------------------------------------------
 * CREATE DATA TABLE
 *---------------------------------------------------------------
 */
function createDatatable()
{
    oTable = dataTable.dataTable({
        "pageLength" : 10,
        "processing" : true,
        "serverSide" : true,
        "bStateSave" : true,
        "bAutoWidth" : false,
        "ajax"       : ajaxUrl,
        'dom'        : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
        "order"      : [[0, "asc"]],
        "columns"    : [
            {"asSorting" : ["desc", "asc"]},
            {"asSorting" : ["asc", "desc"]},
            {"orderable" : false},
            {"orderable" : false},
            {"orderable" : false}
        ]
    });

}


/**
 *---------------------------------------------------------------
 * CONTACT VALIDATION
 *---------------------------------------------------------------
 */
function contactValidation()
{
    if (!$('#page-form').length) {
        return false;
    }

    $("#page-form").validate({
        rules          : {
            name        : {
                required : true
            },
            status      : {
                required : true,
                number   : true
            },
            title       : {
                required : true
            },
            description : {
                required : true
            }
        },
        errorPlacement : function(error, element)
        {
            error.prependTo(element.parent("div")).addClass('has-error');
        },
        highlight      : function(element)
        {
            $(element).addClass("has-error");
            $(element).parent().parent().find('.control-label').addClass("has-error");
        },
        unhighlight    : function(element)
        {
            $(element).removeClass("has-error");
            $(element).parent().parent().find('.control-label').removeClass("has-error");
        }
    });
}


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
$(document).ready(function()
{
    // Load Datatables
    createDatatable();
    contactValidation();

    // Validation
    form.validate({
        ignore : ":not(select:hidden, input:hidden, input:visible, textarea:visible)"
    });
});


/**
 *---------------------------------------------------------------
 * WINDOW: LOAD
 *---------------------------------------------------------------
 */
$(window).load(function()
{
    // Page Title
    seoTitle.on('keyup keypress blur change', function()
    {
        $('#seo .preview-title').html($(this).val());
    });

    // Page Url
    seoUrl.on('change', function()
    {
        var slug = $(this).val();
        slug     = slug.toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '');
        seoUrl.val(slug);
    });

    // Page Url
    seoUrl.on('keyup keypress blur change', function()
    {
        var slug = $(this).val();
        $('#seo .preview-url').html(slug);
    });

    // Page Description
    seoDescription.on('keyup keypress blur change', function()
    {
        $('#seo .preview-description').html($(this).val());
    });

    // Pre Populate SEO if empty
    successBtn.on('click', function(e)
    {

        var pageNameVal = pageName.val();

        // Set SEO title
        if (seoTitle.val() === '') {
            seoTitle.val(pageNameVal);
        }

        // Set SEO URL
        if (seoUrl.val() === '' && (!$("select#status option[value='1']").attr('selected') || $("select#status option[value='0']").attr('selected'))) {
            seoUrl.val(pageNameVal);
        }

        // Set SEO Description
        if (seoDescription.val() === '') {
            seoDescription.val(pageNameVal);
        }

    });

});


/**
 *---------------------------------------------------------------
 * ON EVENTS
 *---------------------------------------------------------------
 */
$(document).on('change', '#template_select', function()
{
    var url   = $(this).data('url');
    var value = $(this).val();

    $.ajax({
        url      : url,
        type     : 'POST',
        data     : {template_id : value},
        dataType : 'json',
        success  : function(data)
        {
            if (data) {
                $('#template-fields').empty();

                for (var element in data) {
                    console.log(data[element]);
                    $('#template-fields').append(data[element].html);
                }

                // re-bind
                App.jquery.handleRedactor();
            }
        }
    });
});