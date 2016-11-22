/**
 * Shared variables
 */
var timeout = 0;


/**
 * Display Image Manager Modal
 *
 * @param object
 * @private
 */
function _displayImageManagerModal(object)
{
    // Load the Bootstrap Modal
    var NmModal = new BootstrapModal();

    // Change the Title
    NmModal.bsm_title.html('Image Selector');
    NmModal.bsm_container.addClass('modal-lg');

    // Display loading image
    NmModal.bsm_body.html('<div class="image-manager"><div class="load spin">Loading...</div></div>');

    // Load the form and Fire the loaded event
    NmModal.bsm_body.load(object.data('url'), function() {
        $.event.trigger(object.data('load-trigger') || "modalLoaded", object);
    });

    // Show the footer and the modal
    NmModal.bsm.modal('show');
}


/**
 * Hide the image manager modal
 *
 * @private
 */
function _hideImageManagerModal()
{
    $('#modal').modal('hide');
}


/**
 * Show loading image
 *
 * @private
 */
function _showLoadingImage()
{
    $('#image-group').html('<div class="load spin">Loading...</div>');
}


/**
 * Prevent image manager form defaults
 *
 * @private
 */
function _preventImageManagerFormDefaults(e)
{
    // If the return key is pressed
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
}


/**
 * Filter images by keyword
 *
 * @private
 */
function _filterImagesByKeyword(object)
{
    clearTimeout(timeout);

    var form     = object.closest('form');
    var form_url = form.attr('action');
    var keyword  = object.val();

    if (!$('#image-group > .load').length) {
        _showLoadingImage();
    }

    // Load the form
    timeout = setTimeout(function() {
        $('#image-group').load(form_url + '?keyword=' + encodeURIComponent(keyword) + ' #image-group .inner');
    }, 250);
}


/**
 * Filter images by page
 *
 * @private
 */
function _filterImagesByPage(object)
{
    var link = object.attr('href');
    _showLoadingImage();

    // Load the form
    $('#image-group').load(link + ' #image-group .inner');
}


/**
 * Reload the dropzone image list
 *
 * @private
 */
function _reloadImageList()
{
    $('#dropzone-results').load(window.location.pathname + ' #image-list', function() {
        handleImageListSorting();
    });
}


/**
 * Get the existing image from the server
 *
 * @private
 */
function _getImageFromServer(object)
{
    var id     = object.closest('.col-img').data('id');
    var form   = object.closest('form');
    var action = form.attr('action');
    var token  = form.find('[name="_token"]').val();

    _showLoadingImage();

    $.ajax({
        url  : action,
        type : 'POST',
        data : {
            id     : id,
            _token : token
        }

    }).done(function(data) {
        _hideImageManagerModal();
        _reloadImageList();
    });
}


/**
 * Display the existing image button
 *
 * @private
 */
function _displayExistingImageBtn()
{
    $('.image-select').removeClass('hidden');
}


/**
 * Update the image sort order
 *
 * @private
 */
function _updateImageSortOrder(sortOrder, ajaxUrl)
{
    $.ajax({
        url      : ajaxUrl,
        headers  : {
            'X-CSRF-Token' : $('meta[name="csrf-token"]').attr('content')
        },
        data     : sortOrder,
        dataType : 'json',
        type     : 'POST',
        success  : function(data) {
            _displaySortingMessage(data);
        }
    });
}


/**
 * Display sorting message
 *
 * @private
 */
function _displaySortingMessage(data)
{
    $('#sort-response').remove();

    $('#image-list').prepend(
        '<tr id="sort-response"><td colspan="7">'
        + '<div class="alert alert-' + data.message_type + '"><button data-dismiss="alert" class="close">&times;</button><p>'
        + data.message
        + '</p></div></td></tr>'
    );

    $('#image-list tbody tr').not('#sort-response').each(function(i) {
        $(this).find('td').first().html(parseInt(i + 1));
    });

    setTimeout(function() {
        $('#sort-response').fadeOut();
    }, 2000);
}


/**
 * Handle the image manager button
 *
 * This handles the select existing image button
 *
 * @public
 */
function handleImageManagerBtn()
{
    _displayExistingImageBtn();
    $(document).off('click', '.image-select').on('click', '.image-select', function() {
        var object = $(this);
        _displayImageManagerModal(object);
    });
}


/**
 * Handle the keyboard functions for the image manager
 *
 * @public
 */
function handleImageManagerKeyPress()
{
    $(document).on('keydown', '.image-manager form', function(e) {
        _preventImageManagerFormDefaults(e);
    });
}


/**
 * Handle the image manager search field
 *
 * @public
 */
function handleImageManagerSearchField()
{
    $(document).on('keyup', '.image-manager [name="keyword"]', function() {
        var object = $(this);
        _filterImagesByKeyword(object);
    });
}


/**
 * Handle the image manager pagination
 *
 * @public
 */
function handleImageManagerPagination()
{
    $(document).on('click', '.image-manager .pagination a', function(e) {
        e.preventDefault();

        var object = $(this);
        _filterImagesByPage(object );

        return false;
    });
}


/**
 * Handle image manager selection
 */
function handleImageManagerSelection()
{
    $(document).off('click', '#image-group .col-img a').on('click', '#image-group .col-img a', function() {
        var object = $(this);
        _getImageFromServer(object);
    });
}


/**
 * Handle image manager success trigger
 */
function handleImageManagerSuccess()
{
    $(document).on('modalSuccess', function() {
        _reloadImageList();
    });
}


/**
 * Handle the size of the image manger modal
 */
function handleImageManagerDisplaySize()
{
    $('#modal').on('hidden.bs.modal', function() {
        $('#modal .modal-dialog').removeClass('modal-lg');
    });
}


/**
 * Handle the image manager loaded trigger
 */
function handleImageManagerLoaded()
{
    $(document).on('modalLoaded', function() {
        handleImageManagerKeyPress();
        handleImageManagerSearchField();
        handleImageManagerPagination();
        handleImageManagerSelection();
        handleImageManagerSuccess();
    });
}


/**
 * Handle the ordering of the image list
 */
function handleImageListSorting()
{
    var ajaxUrl = $('#image-list').data('ajax-url');

    $('#image-list.sortable').tableDnD({
        onDragClass : "dragging",
        onDrop      : function(table, row) {
            var sortOrder = $.tableDnD.serialize();
            _updateImageSortOrder(sortOrder, ajaxUrl);
        }
    });
}


/**
 * Document ready function
 */
$(document).ready(function() {
    handleImageManagerBtn();
    handleImageManagerDisplaySize();
    handleImageManagerLoaded();
    handleImageListSorting();
});


/**
 * Window load function
 */
$(window).load(function() {

});