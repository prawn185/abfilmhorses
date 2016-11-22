/***********************************************************
 *  DOCUMENT READY FUNCTIONS
 **********************************************************/
//$(document).ready(function() {
//    loadTemplateSections($('#template_select'));
//});

$(document).ready(function() {
    bindSections();
});

/***********************************************************
 *  ON FUNCTIONS
 **********************************************************/
$(document).on('change', '#template_select', function() {
    loadTemplateSections($(this));
});

$(document).on('click', '#add_partial_button', function() {
    loadTemplatePartial($('#add_partial_select'));
});

$(document).on('click', '.pop-settings-modal', function() {
    var id = $(this).data('target');
    $(id).modal();
    return false;
});

$(document).on('click', '.delete-partial', function() {

    $(this).closest('.partial').slideUp(function() {
        $(this).remove();
    });

    return false;
});

$(document).on('click', '.dropzone-replace-image', function() {
    $(this).parent().hide();
    $(this).parent().next('.dropzone-row').removeClass('hide');

    return false;
});


/***********************************************************
 *  GENERAL FUNCTIONS
 **********************************************************/
 function loadTemplateSections(select) {
    var url                 = select.data('url');
    var value               = select.val();
    var templatableType     = select.data('type');
    var templatableId       = select.data('id');
    var sectionContainer    = $('#template-section-fields');
    var loading             = $('#section-loader > div');

    // Remove current sections
    sectionContainer.empty();

    // Show loading gif
    loading.show();

    // Load the required sections based on template
    $.ajax({
        url: url,
        type: 'POST',
        data: { template_id: value, templatable_type: templatableType, templatable_id: templatableId },
        dataType: 'json',
        success: function(data) {
            if (data) {

                sectionContainer.empty();

                loading.hide();

                for (var element in data) {
                    console.log(data[element]);
                    sectionContainer.append(data[element].html);
                }

                bindSections();
            }
        }
    });
}

/**
 * Add any required bindings in this function
 * to run once sections have been loaded in
 * i.e redactor
 */
function bindSections() {
    App.jquery.handleRedactor();
    initImageUploader();
}



function loadTemplatePartial(select) {
    var url                 = select.data('url');
    var value               = select.val();
    var templatableType     = select.data('type');
    var templatableId       = select.data('id');
    var partialContainer    = $('#template-partial-fields');
    var loading             = $('#section-loader > div');


    // Show loading gif
    //loading.show();

    // Calculate what position this should be added
    var targetPosition = (partialContainer.find('.partial').length) ? (partialContainer.find('.partial').last().data('position') + 1) : 0;

    // Load the required sections based on template
    $.ajax({
        url: url,
        type: 'POST',
        data: {
			_token: App.helper.getToken(),
			partial_id: value, 
			templatable_type: templatableType, 
			templatable_id: templatableId, 
			target_position: targetPosition
		},
        dataType: 'json',
        success: function(data) {
            if (data) {

                if (data.html) {
                    partialContainer.append(data.html);

                    $('html, body').animate({
                        scrollTop: $("#template-partial-fields")[0].scrollHeight
                    }, 2000);

                }

                bindSections();
            }
        }
    });
}



function initImageUploader() {

    // Dropzone.options.dropzone = {
    //     uploadMultiple:     true,
    //     paramName:          "file", // The name that will be used to transfer the file
    //     maxFilesize:        2, // MB
    //     addRemoveLinks:     false,
    //     acceptedFiles:      "image/*",
    //     init: function() {
    //         this.on("complete", function (file) {
    //             if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
    //                 var file = this.files[0].xhr.response.toString().replace(/[\[\]\\"]/g, '');

    //                 console.log(this);
    //                 $(this.element).next('.dropzone-file-path').val(file);
    //                 //$('.image-list-load').load("{{ URL::route('admin.gallery.edit', $gallery->id) }} .image-list-load > *");
    //             }
    //         });
    //     }
    // };
}
