/**
 * Properties
 */
var form                = $('#seo-form');
var title               = $('.seo-title', form);
var url                 = $('.seo-url', form);
var description         = $('.seo-description', form);
var submitBtn           = $('.btn-success', form);
var nameField           = $('input[name=name]');

var previewTitle        = $('.preview-title', form);
var previewUrl          = $('.preview-url span', form);
var previewDescription  = $('.preview-description', form);


/**
 * Format url
 */
function formatUrl(url)
{
    return url.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[-]+/g, '-')
        .replace(/[^\w-]+/g, '');
}


/**
 * Setup validation
 */
function setupValidation()
{
    form.validate({
        ignore : ":not(select:hidden, input:hidden, input:visible, textarea:visible)"
    });
}


/**
 * Handle seo title
 */
function handleSeoTitle()
{
    title.on('keyup keypress blur change', function() {
        previewTitle.html(title.val());
    });
}


/**
 * Handle seo url
 */
function handleSeoUrl()
{
    url.on('keyup keypress blur change', function() {
        var slug = formatUrl(url.val());
        url.val(slug);
        previewUrl.html(slug);
    });
}


/**
 * Handle seo description
 */
function handleSeoDescription()
{
    description.on('keyup keypress blur change', function() {
        previewDescription.html(description.val());
    });
}


/**
 * Handle submit function
 */
function handleSeoSubmit()
{
    // Pre Populate SEO if empty
    submitBtn.on('click', function(e) {

        // Check if their is a name field in the scope
        if (nameField.length > 0) {

            // Set SEO title
            if (title.val() === '') {
                title.val(nameField.val());
            }

            // Set SEO URL
            if (url.val() === ''
                && (!$("select#status option[value='1']").attr('selected')
                || $("select#status option[value='0']").attr('selected'))
            ) {
                var slug = formatUrl(nameField.val());
                url.val(slug);
            }

            // Set SEO Description
            if (description.val() === '') {
                description.val(nameField.val());
            }
        }
    });
}


/**
 * Document ready event
 */
$(document).ready(function() {
    handleSeoTitle();
    handleSeoUrl();
    handleSeoDescription();
    handleSeoSubmit();
});