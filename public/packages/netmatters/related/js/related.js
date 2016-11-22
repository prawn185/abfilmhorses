/**
 * Properties
 */
var relatedForm     = $('#related-form');
var relatedFormBtn  = relatedForm.find('#related-form-btn');
var relatedFormType = relatedForm.find('[name="type"]');
var relatedFormItem = relatedForm.find('[name="item"]');


/**
 * Handle related type
 */
function handleRelatedType()
{
    $(document).on('change', '#related-type-select', function(e)
    {
        e.preventDefault();

        var value = $(this).val();
        var type  = $("input[name=relatedType]").val();
        var url   = $(this).data('url');
        var token = $("input[name=_token]").val();

        $.ajax({
            url      : url,
            type     : 'POST',
            dateType : 'json',
            data     : {type : value, relatedType : type, _token : token},
            success  : function(response)
            {
                var html = '';
                if (response) {
                    for (var item in response) {
                        html += '<option value="' + item + '">' + response[item] + '</option>';
                    }
                    $('#related-form-btn').removeClass('disabled');
                    $('#related-type-items').html(html).removeAttr('disabled').removeClass('disabled').selectpicker('refresh');

                } else {
                    $('#related-type-items').html(html).attr('disabled', 'disabled').addClass('disabled').selectpicker('refresh');
                }
            }
        });
    });
}


/**
 * Handle related item
 */
function handleRelatedItem()
{
    $(document).off('click', '#related-form-btn').on('click', '#related-form-btn', function(e)
    {
        e.preventDefault();

        var type        = relatedFormType.val();
        var item        = relatedFormItem.val();
        var token       = $('[name="_token"]').val();
        var relatedType = relatedForm.find('[name="relatedType"]').val();

        $.ajax({
            url  : relatedForm.data('url'),
            type : 'POST',
            data : {
                type        : type,
                item        : item,
                _token      : token,
                relatedType : relatedType
            }

        }).success(function(data) {
            $("#related-items-container").load(App.currentUrl + ' #related-items-container > *', function() {
                App.jquery.handleDataTables('#related-items-table');
                App.bootstrap.notifyUser(data, 'success');
            });

        }).fail(function(data) {
            App.bootstrap.notifyUser(data.responseText, 'danger');
        });
    });
}


/**
 * Document ready functions
 */
$(document).ready(function() {

});


/**
 * Window load functions
 */
$(window).load(function() {
    handleRelatedType();
    handleRelatedItem();
});