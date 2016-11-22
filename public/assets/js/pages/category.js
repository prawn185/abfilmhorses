

/**
 *---------------------------------------------------------------
 * DOCUMENT READY FUNCTIONS
 *---------------------------------------------------------------
*/
jQuery(document).ready(function()
{

});



/**
 *---------------------------------------------------------------
 * WINDOW LOAD FUNCTIONS
 *---------------------------------------------------------------
*/
jQuery(window).load(function()
{
    $('#list').click(function(event)
    {
        event.preventDefault();
        $('.category-items .item').addClass('list-group-item');
    });

    $('#grid').click(function(event)
    {
        event.preventDefault();
        $('.category-items .item').removeClass('list-group-item');
        $('.category-items .item').addClass('grid-group-item');
    });

});
