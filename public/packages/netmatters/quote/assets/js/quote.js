/**
 * Properties
 *
 * @type {{}}
 */
var quoteModule = {

    /**
     * Constructor function
     */
    init: function() {
        this.table           = $('.quote-manage');
        this.ajaxUrl         = $('.quote-manage').data('ajax');
        this.filteredTable   = null;

        this.createDataTable();
    },


    /**
     * Handle data table
     */
    createDataTable: function()
    {
        this.filteredTable = $('.quote-manage').DataTable({
            'lengthMenu'  : [[10, 25, 50, 100, 200, 500, 1000], [10, 25, 50, 100, 200, 500, 1000]],
            'pageLength'  : 10,
            'dom'         : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
            'deferRender' : true,
            'responsive'  : true,
            'autoWidth'   : false,
            'searchDelay' : 1500,
            'order'       : [[0, 'asc']],

            "columns" : [
                {"className" : ""},
                {"className" : ""},
                {"className" : ""},
                {"className" : "hidden-xs", "orderable" : false},
                {"className" : "hidden-xs", "orderable" : false},
                {"className" : "hidden-xs", "orderable" : false},
                {"className" : "actions", "orderable" : false}
            ],

            'language'  : {
                'paginate' : {
                    'next'     : '<i class="mdi-navigation-arrow-forward"></i>',
                    'previous' : '<i class="mdi-navigation-arrow-back"></i>'
                },
                "search"   : ""
            },

            'processing' : true,
            'serverSide' : true,
            'ajax'       : quoteModule.ajaxUrl
        })
    }
};


/**
 * Document ready function
 */
$(document).ready(function()
{
    quoteModule.init();
});
