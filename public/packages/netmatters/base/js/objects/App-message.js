/**
 * App message Object
 *
 * @type object
 */
App.message = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * General error message
     *
     * @returns {string}
     */
    error : function(){
        return "<strong>Unfortunately an error occurred whilst processing your request, "
            + "please contact the application Administrator for more assistance."
            + "<br /><br />Error Message:</strong> ";
    }
};