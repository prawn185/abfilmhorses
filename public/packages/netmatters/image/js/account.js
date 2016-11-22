/*
 *---------------------------------------------------------------
 * DROPZONE CONFIG
 *---------------------------------------------------------------
 */
function dropzoneConfig(images)
{
    var form  = $('#image-dropzone');
    var token = form.find('[name="_token"]').val;

    form.dropzone({
        uploadMultiple : true,
        paramName      : "file", // The name that will be used to transfer the file
        maxFilesize    : 10, // MB
        addRemoveLinks : true,
        acceptedFiles  : "image/*",

        sending : function(file, xhr, formData) {
            formData.append("_token", token);
        },

        init : function() {

            // Add Upload Message
            $('#image-dropzone').append('<div class="dz-default dz-message"><span>Drop files here to upload</span></div>');

            if (images.length) {
                thisDropzone = this;

                for (var i = 0; i < images.length; i++) {
                    var image = images[i];
                    var mockFile = {name : image.name, size : image.size, id : image.id};
                    thisDropzone.options.addedfile.call(thisDropzone, mockFile);
                    thisDropzone.options.thumbnail.call(thisDropzone, mockFile, image.thumb);
                }
            }

            // Handle Add
            this.on("complete", function(file)
            {
                thisDropzone = this;

                $.get(form.attr('action')).done(function(images) {

                    // Remove previous items and reload the dropzone
                    $('.dz-preview').each(function() {
                        $(this).remove();
                    });

                    for (var i = 0; i < images.length; i++) {
                        var image = images[i];
                        var mockFile = {name : image.name, size : image.size, id : image.id};
                        thisDropzone.options.addedfile.call(thisDropzone, mockFile);
                        thisDropzone.options.thumbnail.call(thisDropzone, mockFile, image.thumb);
                    }
                });
            });

            // Handle Remove
            this.on("removedfile", function(file) {
                $.ajax({
                    type : 'GET',
                    url  : '/account/image/delete/' + file.id,
                });
            });
        }
    });
}

