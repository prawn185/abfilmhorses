/**
 * App selectize Object
 *
 * @type object
 */
App.selectize = {

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
        App.selectize.handle();
    },


    /**
     * Handle the selectize element
     */
    handle : function()
    {

        $('.selectize').selectize({
            delimiter: ',',
            persist: false,
            create: function(input) {
                return {
                    value: input,
                    text: input
                }
            }
        });

    }


};