/**
 * App select2 Object
 *
 * @type object
 */
App.select2 = {

    /**
     * Object properties
     */
    results : [],

    /**
     * Constructor Function
     *
     * Boot function
     */
    init : function()
    {
        App.select2.handle();
    },


    /**
     * Ajax object
     */
    getAjax : function() {
        return {
            url      : $('.select2').data('select-ajax-url'),
            dataType : 'json',
            delay    : 250,
            data     : function(params) {
                return {
                    q    : params.term, // search term
                    page : params.page
                };
            },
            processResults : function(data, page) {
                App.select2.formatResults(data);
                return {
                    results : App.select2.results
                }
            },
            cache              : true,
            minimumInputLength : 3
        }
    },


    /**
     * Format results function
     *
     * @param data
     * @returns {Array}
     */
    formatResults : function(data)
    {
        App.select2.results = [];
        $.each(data, function(index, item) {
            App.select2.results.push({
                'id'   : item.id,
                'text' : item.name
            });
        });
    },


    /**
     * Handle the select2 element
     */
    handle : function()
    {

        //if($('.select2').data('select-ajax-url')) {

            $('.select2').select2({
                ajax : App.select2.getAjax()
            });

        //} else {
        //    $('.select2').select2();
        //}

    }


};