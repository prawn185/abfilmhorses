var form = $('#note-form');
$(document).on('click', '#add-note-btn', function(e)
{
    e.preventDefault();
    // Show loading gif
    App.blockUI();

    // Post the data to the current url
    var request = jQuery.ajax({
        type     : "POST",
        data     : form.serialize(),
        dataType : 'json',
        url      : form.attr('action')
    });
    $('#note').val(null);

    request.done(function(object)
    {
        // Set new quantities
        $(".view-notes").html(object.html);
        App.unblockUI();

    });
    // Show loading gif
    return false;
});



