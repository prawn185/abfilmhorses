
/**
 * BootstrapModal Object
 *
 * Use this object to create an abstracted
 * version of the Bootstrap Modal
 *
 * @param element
 * @constructor
 */
var BootstrapModal = function(element)
{
    // Get the bootstrap modal
    this.bsm            = element || jQuery('#modal');
    this.bsm_container  = this.bsm.find('.modal-dialog');
    this.bsm_header     = this.bsm.find('.modal-header');
    this.bsm_title      = this.bsm.find('.modal-header h4');
    this.bsm_body       = this.bsm.find('.modal-body');
    this.bsm_footer     = this.bsm.find('.modal-footer');

    // Set unique values on primary and secondary buttons
    this.bsm.find('.btn-primary').addClass('primary-action');
    this.bsm.find('.btn-default').addClass('secondary-action');

    this.bsm_primary = this.bsm.find('.primary-action');
    this.bsm_secondary = this.bsm.find('.secondary-action');

    // Reset the modal for use
    this.resetModal();
};


/**
 * Reset Modal function
 *
 * Use this function to reset all the
 * BootstrapModal properties back to their defaults
 */
BootstrapModal.prototype.resetModal = function()
{
    this.bsm_container.removeClass('large-modal');
    this.bsm_title.html('');
    this.bsm_body.html('');
    this.bsm_body.css({"min-height" : "100px"});
    this.bsm_primary
        .removeClass('btn-danger')
        .removeClass('btn-info')
        .removeClass('btn-warning')
        .removeClass('btn-success')
        .addClass('btn-primary')
        .attr("href", '#')
        .removeAttr('target')
        .html('Ok')
        .unbind("click");
    this.bsm_footer.hide();
};
