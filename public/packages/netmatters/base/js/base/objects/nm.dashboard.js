/**
 *---------------------------------------------------------------
 * DECLARE VARIABLES
 *---------------------------------------------------------------
 */
var form                = $('#dashboard-form');
var dashboardGroup      = $('.dashboard-group-manage');
var groupItem           = dashboardGroup.children();
var token               = $('input[name="_token"]', form).val();

var action              = form.attr('action');

/**
 *---------------------------------------------------------------
 * ADD OPTIONS
 *---------------------------------------------------------------
 */
function addOptions($this)
{
    $('.popover').remove();

    id      = $this.data('id');
    size    = $this.attr('class').replace("col-xs-", "");
    height  = $this.height();

    if ($this.attr('data-module')) {
        module = $(this).data('module');
    } else {
        module = null;
    }

    $.ajax({
        url  : action,
        type : 'GET',
        data : {
            id      : id,
            size    : size,
            module  : module,
            height  : height,
            type    : 'get_view'
        }

    }).done(function(data)
    {
        $this.append(data);
    });
}

/**
 *---------------------------------------------------------------
 * INITIALIZE SORTABLE
 *---------------------------------------------------------------
 */
function initializeSortable()
{
    // Create the sortable object
    dashboardGroup.sortable({
        connectWith          : '.dashboard-group-manage',
        forcePlaceholderSize : true
    });
}


/**
 *---------------------------------------------------------------
 * ADD SORTABLE
 *---------------------------------------------------------------
 */
function addSortable()
{
    initializeSortable();

    // On sort do the following
    $(document).on('dragstart', '.dashboard-group-manage', function(e, ui)
    {
        var group       = $(this).data('group');
        var newGroup    = parseInt(group) + 1;
        var item        = $(this).children();
    });

    // On sort do the following
    $(document).on('sortupdate', '.dashboard-group-manage', function(e, ui)
    {
        var items = $('.dashboard-group-manage li');
        var rows = [];

        // Foreach item, update the order push back into array
        items.each(function()
        {

            var groupItem = $(this).parent();
            var group = groupItem.data('group');
            var index = groupItem.children().index(this);

            row = {};
            row.group = group;
            row.order = index;

            var id = $(this).data('id');
            row.id = id;
            rows[id] = row;

        });


        //Post the data to the current url
        var request = $.ajax({
            type : "POST",
            data : {
                'rows'   : rows,
                '_token' : token,
                'type'   : 'update_order'
            },
            url  : action,
        });

        request.done(function(msg)
        {
            // console.log(msg);
        });

    });
}


/**
 *---------------------------------------------------------------
 * UPDATE SIZE
 *---------------------------------------------------------------
 */
function updateSize($this)
{
    dashboardItem = $this.closest('li');
    dashboardItem.removeAttr('class').addClass('col-xs-' + $this.val());
    $this.closest('.popover').remove();

    // Post Variables
    id = dashboardItem.data('id');

    $.ajax({
        url  : action,
        type : 'GET',
        data : {
            id      : id,
            size    : $this.val(),
            type    : 'update_size'
        }
    });
}


/**
 *---------------------------------------------------------------
 * UPDATE WIDGET
 *---------------------------------------------------------------
 */
function updateWidget($this)
{
    // Post Variables
    dashboardItem = $this.closest('li');
    id = dashboardItem.data('id');

    $.ajax({
        url  : action,
        type : 'GET',
        data : {
            id      : id,
            widget  : $this.val(),
            type    : 'update_widget'
        }

    }).done(function(data)
    {
        dashboardItem.replaceWith(data);
        initializeSortable();
    });
}


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
$(document).ready(function()
{
    // Add sortable
    addSortable();

    // Handle context menu
    $(document).on('contextmenu', '.dashboard-group-manage > li', function(e)
    {
        e.preventDefault();
        addOptions($(this));
        return false;
    });

    // Handle size select
    $(document).on('change', '#dashboard-form select[name=size]', function()
    {
        var select = $(this);
        updateSize(select);
    });

    // Handle widget select
    $(document).on('change', '#dashboard-form select[name=widget]', function()
    {
        var select = $(this);
        updateWidget(select);
    });

    // Handle close popover
    $(document).on('click', '#dashboard-form .close', function()
    {
        $(this).closest('.popover').remove();
    });

});
