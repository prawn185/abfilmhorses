/**
 * Properties
 *
 * @type {{}}
 */
var orderModule = {

    /**
     * Constructor function
     */
    init: function() {
        this.table           = $('.order-manage');
        this.ajaxUrl         = $('.order-manage').data('ajax');
        this.filteredTable   = null;

        this.createDataTable();
    },


    /**
     * Handle data table
     */
    createDataTable: function()
    {
        this.filteredTable = $('.order-manage').DataTable({
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
                {"className" : ""},
                {"className" : ""},
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
            'ajax'       : orderModule.ajaxUrl
        })
    }
};


/**
 * Document ready function
 */
$(document).ready(function()
{
    orderModule.init();
});