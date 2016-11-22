
/**
 *---------------------------------------------------------------
 * CREATE CUSTOM OBJECT
 *---------------------------------------------------------------
 */
var JQueryAjax = function(){};


/**
 *---------------------------------------------------------------
 * AJAX: REQUEST
 *---------------------------------------------------------------
 * @param url string
 * @param output string element to display the data
 * @param data object any data you want to pass to the server
 * @param type string request type e.g 'GET', 'POST'
 * @param dataType string e.g 'json'
 * @param cache boolean e.g true
 */
JQueryAjax.prototype.request = function(url, output, data, type, dataType, cache)
{
    // Setup the ajax call
    var request = $.ajax({
        url      : url,
        data     : data || null,
        type     : type || 'GET',
        dataType : dataType || 'json',
        cache    : cache || false
    });
    return request;
};


/**
 *---------------------------------------------------------------
 * AJAX: SELECT LIST
 *---------------------------------------------------------------
 * @param url string
 * @param output string element to display the data
 * @param data object any data you want to pass to the server
 * @param trigger name of the trigger you want to listen for
 * @param type string request type e.g 'GET', 'POST'
 * @param dataType string e.g 'json'
 * @param cache boolean e.g true
 */
JQueryAjax.prototype.select_list = function(url, output, data, trigger, type, dataType, cache, message)
{
    // Setup the ajax call
    var request = $.ajax({
        url      : url,
        data     : data || null,
        type     : type || 'GET',
        dataType : dataType || 'json',
        cache    : cache || false
    });

    // Ajax Success
    request.success(function(data)
    {
        // Remove Previous Appended Items and set default
        $(output).find('option').remove().end();

        // Format the returned this.data
        $.each(data, function(key, val) {
            $(output).append(
                $("<option/>", { value : key, text  : val })
            );
        });

        // Fire the success event
        $.event.trigger(trigger || "ajaxSelectSuccess", data);

        // After adding the new options to the select box refresh the select picker
        $('.selectpicker').selectpicker('refresh');

        if (message === undefined || message === true) {
            BsComponents.notifyUser('<strong>' + output + '</strong>' + ' updated', 'success');
        }
    });

    // Ajax Fail
    request.fail(function(data)
    {
        // Fire the failed event
        $.event.trigger(trigger || "ajaxSelectFailed", data);

        if (message === undefined || message === true) {
            BsComponents.notifyUser('<strong>' + output + '</strong>' + ' update failed', 'danger');
        }
    });
};


/**
 *---------------------------------------------------------------
 * AJAX: UN-ORDERED LIST
 *---------------------------------------------------------------
 * @param url string
 * @param output string element to display the data
 * @param data object any data you want to pass to the server
 * @param type string request type e.g 'GET', 'POST'
 * @param dataType string e.g 'json'
 * @param cache boolean e.g true
 */
JQueryAjax.prototype.unordered_list = function(url, output, data, type, dataType, cache)
{
    // Setup the ajax call
    var request = $.ajax({
        url      : url,
        data     : data || null,
        type     : type || 'GET',
        dataType : dataType || 'json',
        cache    : cache || false
    });

    // Ajax Success
    request.success(function(result)
    {
        // Remove Previous Apended Items
        $(output).find('li').remove().end();

        // For each result array element returned via the php script display key / value pairs
        $.each(result, function(key, val)
        {
            $(output).append(
                '<li><a href="javascript:void(0)">' + val + '</a>'
            );
        });

        // Notify the user
        BsComponents.notifyUser('<strong>' + output + '</strong>' + ' updated', 'success');
    });

    // Ajax Fail
    request.fail(function(result) {
        BsComponents.notifyUser('<strong>' + output + '</strong>' + ' failed', 'danger');
    });
};
