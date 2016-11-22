/**
 *---------------------------------------------------------------
 * NM MODAL
 *---------------------------------------------------------------
 */
function NmModel(object)
{
    // Load the Bootstrap Modal
    NmModal = new BootstrapModal();

    // Change the Title
    NmModal.bsm_title.html(object.data('title'));

    // Set the modal primary and secondary buttons
    NmModal.bsm_primary
        .removeClass('btn-primary')
        .addClass('btn-success')
        .html(object.data('button'));

    // Allow overflow
    if (object.data('overflow') === true) {
        NmModal.bsm_body.css({"overflow" : "visible"});
    }

    // Load the form
    NmModal.bsm_body.load(object.data('url'), function(e)
    {
        // Fire the loaded event
        $.event.trigger(object.data('load-trigger') || "modalLoaded", object);
    });

    // Show the footer and the modal
    NmModal.bsm_footer.show();
    NmModal.bsm.modal('show');

    // If the user clicks the primary button
    NmModal.bsm_primary.on('click', function(e)
    {

        // Stop Default Response
        if (object.data('post') !== undefined && object.data('post') === false) {
            return;
        }

        e.preventDefault();

        var form        = NmModal.bsm_body.children('form');
        var form_url    = form.attr("action");
        var form_data   = new FormData(form[0]);
        var successMsg  = object.data('success');
        var errorMsg    = object.data('error');

        // Setup validation
        form.validate({
            ignore : ":not(select:hidden, input:hidden, input:visible, textarea:visible)"
        });

        if (form.valid()) {

            // Remove min height
            NmModal.bsm_body.css({"min-height" : "100px"});

            // Setup the ajax call
            var request = jQuery.ajax({
                url         : form_url,
                type        : 'POST',
                data        : form_data,
                contentType : false,
                processData : false
            });

            // Ajax Success
            request.success(function(data)
            {
                //BsComponents.notifyUser(object.data('success'), 'success');
                NmModal.bsm_footer.hide();
                NmModal.bsm_body.html(
                    '<div class="alert alert-success">' + successMsg + '</div>'
                );

                // Fire the success event
                $.event.trigger(object.data('success-trigger') || "modalSuccess", data);
            });

            // Ajax Fail
            request.fail(function(data)
            {
                //BsComponents.notifyUser(object.data('failed'), 'danger');
                NmModal.bsm_body.html(
                    '<div class="alert alert-danger">' + errorMsg + '</div>'
                );

                // Fire the failed event
                $.event.trigger(object.data('fail-trigger') || "modalFailed", data);
            });

        } else {
            return false;
        }

        // Unbind the previous click event
        NmModal.bsm_primary.unbind("click");
    });
}


/**
 *---------------------------------------------------------------
 * DOCUMENT: READY
 *---------------------------------------------------------------
 */
    jQuery(document).ready(function()
    {

    });


/**
 *---------------------------------------------------------------
 * WINDOW: LOAD
 *---------------------------------------------------------------
 */
    jQuery(window).load(function()
    {
        // Task Modal
        jQuery(document).on('click', '.open-modal', function(e)
        {
            // Prevent the default action
            e.preventDefault();

            // Call the delete item function
            NmModel($(this));

            // Return false to stop the browser from loading the link
            return false;
        });

    });
