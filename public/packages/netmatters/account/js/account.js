/**
 * Properties
 *
 * @type {{}}
 */
var accountModule = {

    /**
     * Constructor function
     */
    init: function() {
        this.table           = $('.account-manage');
        this.ajaxUrl         = $('.account-manage').data('ajax');
        this.filteredTable   = null;

        this.createDataTable();
        this.handleAccountCategoryFilter();
        this.handleAccountStatusFilter();
        this.handleAccountTypeFilter();
    },


    /**
     * Handle filters
     */
    handleColumns: function() {
        var columns = [
            {"className" : "col-xs-1"},
            {"className" : "col-xs-3"}
        ];

        if (this.table.data('type') == true && this.table.data('type-id') == '') {
            columns.push({"className" : "col-xs-2", "orderable" : true});
        }
        if (this.table.data('category') == true) {
            columns.push({"className" : "col-xs-2", "orderable" : false});
        }
        if (this.table.data('status') == true) {
            columns.push({"className" : "col-xs-2", "orderable" : false});
        }

        // Add actions
        columns.push({"className" : "col-xs-2 actions", "orderable" : false});

        return columns;
    },


    /**
     * Handle account category filter
     *
     * Listen for the data table
     * ajax pre-flight event and append the data
     */
    handleAccountCategoryFilter: function() {
        $(document).on('change', '#account_category', function() {
            accountModule.filteredTable.on('preXhr.dt', function(e, settings, data) {
                data.category_ids = $('#account_category').val();
            }).ajax.reload();
        });
    },


    /**
     * Handle account status filter
     *
     * Listen for the data table
     * ajax pre-flight event and append the data
     */
    handleAccountStatusFilter: function() {
        $(document).on('change', '#account_status', function() {
            accountModule.filteredTable.on('preXhr.dt', function(e, settings, data) {
                data.status_ids = $('#account_status').val();
            }).ajax.reload();
        });
    },


    /**
     * Handle account type filter
     *
     * Listen for the data table
     * ajax pre-flight event and append the data
     */
    handleAccountTypeFilter: function() {

        if (this.table.data('type') == true && this.table.data('type-id') != '') {
            var typeId = this.table.data('type-id');
            this.filteredTable.on('preXhr.dt', function(e, settings, data) {
                data.is_type  = true;
                data.type_ids = [typeId];
            }).ajax.reload();
        }

        $(document).on('change', '#account_type', function() {
            accountModule.filteredTable.on('preXhr.dt', function(e, settings, data) {
                data.type_ids = $('#account_type').val();
            }).ajax.reload();
        });
    },


    /**
     * Handle data table
     */
    createDataTable: function()
    {
        this.filteredTable = $('.account-manage').DataTable({
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
            'ajax'       : accountModule.ajaxUrl
        })
    }
};


/**
 * Document ready event
 */
$(document).ready(function() {
    accountModule.init();
});