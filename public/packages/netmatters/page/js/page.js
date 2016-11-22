/**
 * Properties
 */
var pageModule = {

    /**
     * Constructor function
     */
    init: function() {
        this.table           = $('.page-manage');
        this.ajaxUrl         = $('.page-manage').data('ajax');
        this.filteredTable   = null;

        this.createDataTable();
    },


    /**
     * Handle filters
     */
    handleColumns: function() {
        var columns = [
            {"asSorting" : ["desc", "asc"]},
            {"asSorting" : ["asc", "desc"]},
            {"orderable" : false},
            {"orderable" : false},
            {"orderable" : false}
        ];

        return columns;
    },


    /**
     * Handle data table
     */
    createDataTable: function()
    {
        this.filteredTable = $('.page-manage').DataTable({
            'lengthMenu'  : [[10, 25, 50, 100, 200, 500, 1000], [10, 25, 50, 100, 200, 500, 1000]],
            'pageLength'  : 10,
            'dom'         : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
            'deferRender' : true,
            'responsive'  : true,
            'autoWidth'   : false,
            'searchDelay' : 1500,
            'order'       : [[0, 'asc']],
            "columns"     : this.handleColumns(),
            'language'    : {
                'paginate' : {
                    'next'     : '<i class="mdi-navigation-arrow-forward"></i>',
                    'previous' : '<i class="mdi-navigation-arrow-back"></i>'
                },
                "search"   : ""
            },

            'processing' : true,
            'serverSide' : true,
            'ajax'       : pageModule.ajaxUrl
        })
    }
};


/**
 * Document ready event
 */
$(document).ready(function() {
    pageModule.init();
});