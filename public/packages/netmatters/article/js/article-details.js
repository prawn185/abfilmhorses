
/**
 * Declare variables
 *
 * @type {string}
 */
var articleTagsForm;


/**
 * Handle article details form
 */
function handleArticleTagsForm() {
    articleTagsForm = new App.form().init('#article-tags');
    App.log(articleTagsForm.debug());
}


/**
 * Handle the article details trigger
 */
function handleArticleTagsTrigger() {
    $(document).on('articleTagsAjaxSuccess', function(element) {
        $('#tags-list').load(App.currentUrl + ' #tags-list > *', function(e) {
            App.jquery.handleDataTables();
        });
    });
}


/**
 * Document ready event
 */
$(document).ready(function()
{
    handleArticleTagsForm();
    handleArticleTagsTrigger();
});