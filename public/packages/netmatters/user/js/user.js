/**
 * Properties
 *
 * @type {{}}
 */
var userModule = {

    /**
     * Constructor function
     */
    init: function() {
        this.table           = $('.user-manage');
        this.ajaxUrl         = $('.user-manage').data('ajax');
        this.filteredTable   = null;

        this.createDataTable();
    },


    /**
     * Handle data table
     */
    createDataTable: function()
    {
        this.filteredTable = $('.user-manage').DataTable({
            'lengthMenu'  : [[10, 25, 50, 100, 200, 500, 1000], [10, 25, 50, 100, 200, 500, 1000]],
            'pageLength'  : 10,
            'dom'         : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
            'deferRender' : true,
            'responsive'  : true,
            'autoWidth'   : false,
            'searchDelay' : 1500,
            'order'       : [[0, 'asc']],

            "columns" : [
                {"className" : "", "orderable" : false},
                {"className" : ""},
                {"className" : ""},
                {"className" : "", "orderable" : false},
                {"className" : "actions", "orderable" : false},
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
            'ajax'       : userModule.ajaxUrl
        })
    }
};


/**
 * Document ready function
 */
$(document).ready(function()
{
    userModule.init();
});
