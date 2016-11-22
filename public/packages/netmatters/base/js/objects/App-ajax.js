/**
 * App ajax Object
 *
 * @type object
 */
App.ajax = {

    /**
     * Object properties
     */
    method      : 'GET',
    dataType    : 'json',
    cache       : true,
    returnOrder : 'append',


    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

        return this;
    },


    /**
     * Set Method
     */
    setMethod: function(method) {
        this.method = method;
        return this;
    },


    /**
     * Set Data Type
     */
    setDataType: function(dataType) {
        this.dataType = dataType;
        return this;
    },


    /**
     * Set Cache
     */
    setCache: function(cache) {
        this.cache = cache;
        return this;
    },


    /**
     * Set Return Order
     */
    setReturnOrder: function(returnOrder) {
        this.returnOrder = returnOrder;
        return this;
    },


    /**
     * Shorthand full ajax request
     *
     * @param url       string
     * @param data      object any data you want to pass to the server
     *
     * @return object request
     */
    request: function(url, data) {
        return $.ajax({
            url      : url,
            data     : data || null,
            method   : App.ajax.method,
            dataType : App.ajax.dataType,
            cache    : App.ajax.cache
        });
    },


    /**
     * Load function
     *
     * @param url string
     * @param output string
     * @param callback
     */
    load: function(url, output, callback) {
        $(output).load(url + ' ' + output + ' > *', callback);
    },


    /**
     * Select list function
     *
     * @param url       string
     * @param output    string element to display the data
     * @param data      object any data you want to pass to the server
     * @param trigger   name of the trigger you want to listen for
     */
    selectList: function(url, output, data, trigger) {

        var request = App.ajax.request(url, data);

        // Success function
        request.success(function(data)
        {
            $(output).find('option').remove().end();

            $.each(data, function(key, val) {
                $(output).append(
                    $("<option/>", { value : key, text  : val })
                );
            });

            // After adding the new options to the select box refresh the select picker
            $('.selectpicker').selectpicker('refresh');

            $.event.trigger(trigger || "ajaxSelectSuccess", data);
            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' updated', 'success');
        });

        // Fail function
        request.fail(function(data) {
            $.event.trigger(trigger || "ajaxSelectFailed", data);
            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' update failed', 'danger');
        });
    },


    /**
     * Unordered list function
     *
     * @param url       string
     * @param output    string element to display the data
     * @param data      object any data you want to pass to the server
     * @param trigger   name of the trigger you want to listen for
     */
    unorderedList: function(url, output, data, trigger) {

        var request = App.ajax.request(url, data);

        // Success function
        request.success(function(data) {
            $(output).find('li').remove().end();

            $.each(result, function(key, val) {
                $(output).returnOrder(
                    '<li><a href="javascript:void(0)">' + val + '</a>'
                );
            });

            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' updated', 'success');
            $.event.trigger(trigger || "ajaxUnorderedSuccess", data);
        });

        // Fail function
        request.fail(function(data) {
            $.event.trigger(trigger || "ajaxUnorderedFailed", data);
            App.bootstrap.notifyUser('<strong>' + output + '</strong>' + ' update failed', 'danger');
        });
    }
};