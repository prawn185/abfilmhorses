/**
 * Setup validation
 *
 * @returns {boolean}
 */
function setupValidation()
{
    $("#page-details").validate({
        ignore : ":not(select:hidden, input:hidden, input:visible, textarea:visible)",
        rules : {
            name : {
                required : true
            },
            status : {
                required : true,
                number   : true
            }
        },
        errorPlacement: function(error, element) {
            error.prependTo(element.parent("div")).addClass('has-error');
        },
        highlight: function(element) {
            $(element).addClass("has-error");
            $(element).parent().parent().find('.control-label').addClass("has-error");
        },
        unhighlight: function(element) {
            $(element).removeClass("has-error");
            $(element).parent().parent().find('.control-label').removeClass("has-error");
        }
    });
}


/**
 * Handle template select
 */
function handleTemplateSelect()
{
    $(document).on('change', '#template_select', function() {
        var url   = $(this).data('url');
        var value = $(this).val();

        $.ajax({
            url      : url,
            type     : 'POST',
            data     : {template_id : value},
            dataType : 'json',
            success  : function(data) {
                if (data) {
                    $('#template-fields').empty();
                    for (var element in data) {
                        console.log(data[element]);
                        $('#template-fields').append(data[element].html);
                    }
                    App.jquery.handleRedactor();
                }
            }
        });
    });
}


/**
 * Document ready function
 */
$(document).ready(function()
{
    setupValidation();
});


/**
 * Window load function
 */
$(window).load(function()
{
    handleTemplateSelect();
});