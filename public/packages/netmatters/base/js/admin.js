
/**
 * Handle abstract modal function
 *
 * Use this function to create a dynamic model
 * via data attributes, to use simply add a class of
 * "open-model" to a button or link, available data
 * attributes are:
 *
 * "title"      - modal title
 * "overflow"   - allow modal body to overflow
 * "url"        - the url of the form to load into the body
 * "success"    - Message to display on success.
 * "failed"     - message to display on fail
 *
 */
function handleAbstractModal()
{
    $(document).on('click', '.open-modal', function(e)
    {
        // Prevent the default action
        e.preventDefault();

        // Create the Bootstrap Modal
        var object    = $(this);
        var AbstractModal = new BootstrapModal();

        // Change the Title
        AbstractModal.bsm_title.html(object.data('title'));

        // Set the modal primary and secondary buttons
        AbstractModal.bsm_primary
            .removeClass('btn-primary')
            .addClass('btn-success')
            .html(object.data('button'));

        // Allow overflow
        if (object.data('overflow') == true) {
            AbstractModal.bsm_body.css({"overflow" : "visible"});
        }

        // Load the form
        AbstractModal.bsm_body.load(object.data('url'), function(element)
        {
            // Fire the loaded event
            $.event.trigger(object.data('load-trigger') || "modalLoaded", element);
        });

        // Show the footer and the modal
        AbstractModal.bsm_footer.show();
        AbstractModal.bsm.modal('show');

        // If the user clicks the primary button
        AbstractModal.bsm_primary.on('click', function(e)
        {
            e.preventDefault();

            var form       = AbstractModal.bsm_body.children('form');
            var form_url   = form.attr("action");
            var form_data  = new FormData(form[0]);
            var successMsg = object.data('success');
            var errorMsg   = object.data('error');

            // Setup validation
            form.validate({
                ignore : ":not(select:hidden, input:hidden, input:visible, textarea:visible)"
            });

            if (form.valid()) {

                // Setup the ajax call
                $.ajax({
                    url         : form_url,
                    type        : 'POST',
                    data        : form_data,
                    contentType : false,
                    processData : false,
                    success: function(result)
                    {
                        if (object.data('success') !== undefined) {
                            App.bootstrap.notifyUser(object.data('success'), 'success');
                        }
                        AbstractModal.bsm_footer.hide();
                        AbstractModal.bsm_body.html('<div class="alert alert-success">' + successMsg + '</div>');

                        // Fire the success event
                        $.event.trigger(object.data('success-trigger') || "modalSuccess", result);
                    },
                    error: function(result)
                    {
                        console.log(result);
                        if (object.data('failed') !== undefined) {
                            App.bootstrap.notifyUser(object.data('failed'), 'danger');
                        }

                        if (typeof result.responseJSON.errors !== 'undefined') {
                            $.each(result.responseJSON.errors, function(key, error) {
                                App.log('Error: ' + error);
                                App.bootstrap.notifyUser('Error: <strong>' + error + '</strong>', 'danger');
                            });

                        } else {
                            App.log('Error: ' + errorThrown);
                            App.bootstrap.notifyUser('Error: <strong>' + errorThrown + '</strong>', 'danger');
                            AbstractModal.bsm_body.html('<div class="alert alert-danger">' + errorMsg + '</div>');
                        }

                        // Fire the failed event
                        $.event.trigger(object.data('fail-trigger') || "modalFailed", result);
                    }
                });

            } else {
                return false;
            }

            // Unbind the previous click event
            AbstractModal.bsm_primary.unbind("click");
        });

        // Return false to stop the browser from loading the link
        return false;
    });
}


/**
 * Handle delete modal function
 *
 * Use this function to show a "Are you sure" prompt
 * when the user clicks on a element with the class of "delete"
 *
 */
function handleDeleteModal(type, message)
{
    $(document).on('click', '.delete', function(e)
    {
        // Prevent the default action
        e.preventDefault();

        // Create the Bootstrap Modal
        var object     = $(this);
        var url        = object.attr('href');
        var return_url = $(location).attr('href');
        DeleteModal    = new BootstrapModal();

        // Set title and footer
        DeleteModal.bsm_title.html('Delete Record?');
        DeleteModal.bsm_body.html('Are you sure you want to delete this Record?');
        DeleteModal.bsm_footer.show();

        // Set the modal primary and secondary buttons
        DeleteModal.bsm_primary
            .removeClass('btn-primary')
            .addClass('btn-danger')
            .html('Delete');

        // Show the modal
        DeleteModal.bsm.modal('show');

        // If the user clicks the delete button
        DeleteModal.bsm_primary.on('click', function(e)
        {
            // Prevent the default action
            e.preventDefault();

            // Perform the Ajax request
            $.ajax({
                url     : url,
                type    : 'GET',
                cache   : false,
                success : function(result)
                {
                    if (result.error !== undefined) {
                        console.log(result.error);
                        DeleteModal.bsm.modal('hide');
                        App.bootstrap.notifyUser(result.error, 'danger');

                    } else {
                        App.bootstrap.notifyUser('Delete Complete', 'success');
                        document.location.href = return_url;
                    }

                    // Notify and refresh content
                    $('#middle').load(window.location.pathname + ' #middle > *', function(element) {
                        App.bootstrap.handleTab();
                        DeleteModal.bsm.modal('hide');

                        // Fire the loaded event
                        $.event.trigger("contentReloaded", element);
                    });
                },
                fail : function(result)
                {
                    DeleteModal.bsm.modal('hide');
                    App.bootstrap.notifyUser('Delete Failed', 'danger');
                    DeleteModal.bsm_body.html('Delete failed ');
                }
            });

            // Unbind the previous click event
            DeleteModal.bsm_primary.unbind("click");

            return false;
        });

        // Return false to stop the browser from loading the link
        return false;
    });
}


/**
 * Document ready functions
 */
$(document).ready(function()
{

});


/**
 * Window load functions
 */
$(window).load(function()
{
    // Handle boot functions
    handleAbstractModal();
    handleDeleteModal();
});


/**
 * Ajax start functions
 */
$(document).ajaxStart(function(data)
{

});


/**
 * Ajax stop functions
 */
$(document).ajaxStop(function(data)
{

});
