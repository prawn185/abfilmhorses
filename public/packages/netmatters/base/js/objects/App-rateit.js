/**
 * App rateit Object
 *
 * @type object
 */
App.rateit = {

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
        App.rateit.handle();
    },


    /**
     * Handle the rateit element
     */
    handle : function()
    {
        $('.rateit').rateit({});
    }
};