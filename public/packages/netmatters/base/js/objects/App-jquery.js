/**
 * App Jquery Object
 *
 * @type object
 */
App.jquery = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.jquery.handleDataTables();
        App.jquery.handleRedactor();
        App.jquery.handleValidator();
        App.jquery.handleInputMask();
    },


    /**
     * Handle validator
     */
    handleValidator: function()
    {
        // Setup the Jquery Validation Defaults
        $.validator.setDefaults({
            doNotHideMessage : true,          // show the error/success messages on tab switch.
            errorElement     : 'span',        // default input error message container
            errorClass       : 'error-popup', // default input error message class
            focusInvalid     : false,         // do not focus the last invalid input

            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());

                } else {
                    error.insertAfter(element);
                }
            },

            highlight: function (element) {
                $(element)
                    .closest('.form-group')
                    .removeClass('has-success')
                    .addClass('has-error');
            },

            unhighlight: function (element) {
                if ($(element).closest('.form-group').hasClass('has-error')) {
                    $(element)
                        .closest('.form-group')
                        .removeClass('has-error')
                        .addClass('has-success');
                }
            },

            invalidHandler: function (event, validator) {
                App.window.scrollTo($('.form-horizontal'), -200);
            },

            onfocusout: function (element) {
                $(element).valid();
            },

            onchange: function (element) {
                $(element).valid();
            }
        });
    },


    /**
     * Refresh all data tables
     */
    refreshDataTables: function() {
        var tables = $('.table');

        // If the table has a URL add the POST function
        $.each(tables, function (index, value) {
            if ($(value).data('ajax')) {
                $(value).DataTable().clear().ajax.reload(null, false);
            }
        });

        return this;
    },


    /**
     * Handle data tables
     *
     * @param selector
     */
    handleDataTables: function(selector)
    {
        // If the plugin is not loaded then skip
        if (!jQuery().DataTable()) {
            return;
        }

        var tablesSelector = (typeof selector !== 'undefined') ? selector : '.data-tables';
        var tables         = $(tablesSelector);

        // Loop through tables and create data table object
        $.each(tables, function (index, value) {

            var options = {
                'order'   : [
                    [$(this).data('sort') || 0, $(this).data('order') || 'asc']
                ],
                'dom'         : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
                'stateSave'   : false,
                'deferRender' : true,
                'responsive'  : true,
                'autoWidth'   : false,
                'searchDelay' : 1500,

                'language'   : {
                    'paginate': {
                        'next'    : '<i class="mdi-navigation-arrow-forward"></i>',
                        'previous': '<i class="mdi-navigation-arrow-back"></i>'
                    },
                    'search'  : ""
                }
            };

            // If the table has a URL add the POST function
            if ($(value).data('ajax')) {
                options.ajax        = $(value).data('ajax');
                options.processing  = true;
                options.serverSide  = true;
            }

            // Create data table
            $(value).DataTable(options);
        });

        $('.dataTables_filter input[type=search]').attr('placeholder', 'Search...');
    },


    /**
     * Handle masked form inputs
     */
    handleInputMask: function()
    {
        $('.mask-time').mask('00:00:00');
        $('.mask-date').mask('11/11/1111');
        $('.mask-date-time').mask('00/00/0000 00:00:00');
        $('.mask-money').mask('000.000.000.000.000,00', {reverse : true});
        $('.mask-number').mask("#,##0", {reverse : true, maxlength : false});
        $('.mask-phone').mask('000000000000000');
        $('.mask-mobile').mask('000000000000000');
        $('.mask-postcode').on('keyup', function() {
            console.log('hi');
            $(this).val($(this).val().toUpperCase());
        });
    },


    /**
     * Get redactor language
     */
    getRedactorLangs: function()
    {
        return {
            en: {
                html               : 'HTML',
                video              : 'Insert Video',
                image              : 'Insert Image',
                table              : 'Table',
                link               : 'Link',
                link_insert        : 'Insert link',
                link_edit          : 'Edit link',
                unlink             : 'Unlink',
                formatting         : 'Formatting',
                paragraph          : 'Normal text',
                quote              : 'Quote',
                code               : 'Code',
                header1            : 'Header 1',
                header2            : 'Header 2',
                header3            : 'Header 3',
                header4            : 'Header 4',
                header5            : 'Header 5',
                bold               : 'Bold',
                italic             : 'Italic',
                fontcolor          : 'Font Color',
                backcolor          : 'Back Color',
                unorderedlist      : 'Unordered List',
                orderedlist        : 'Ordered List',
                outdent            : 'Outdent',
                indent             : 'Indent',
                cancel             : 'Cancel',
                insert             : 'Insert',
                save               : 'Save',
                _delete            : 'Delete',
                insert_table       : 'Insert Table',
                insert_row_above   : 'Add Row Above',
                insert_row_below   : 'Add Row Below',
                insert_column_left : 'Add Column Left',
                insert_column_right: 'Add Column Right',
                delete_column      : 'Delete Column',
                delete_row         : 'Delete Row',
                delete_table       : 'Delete Table',
                rows               : 'Rows',
                columns            : 'Columns',
                add_head           : 'Add Head',
                delete_head        : 'Delete Head',
                title              : 'Title',
                image_position     : 'Position',
                none               : 'None',
                left               : 'Left',
                right              : 'Right',
                center             : 'Center',
                image_web_link     : 'Image Web Link',
                text               : 'Text',
                mailto             : 'Email',
                web                : 'URL',
                video_html_code    : 'Video Embed Code',
                file               : 'Insert File',
                upload             : 'Upload',
                download           : 'Download',
                choose             : 'Choose Existing',
                or_choose          : 'Or choose',
                drop_file_here     : 'Drop file here',
                align_left         : 'Align text to the left',
                align_center       : 'Center text',
                align_right        : 'Align text to the right',
                align_justify      : 'Justify text',
                horizontalrule     : 'Insert Horizontal Rule',
                deleted            : 'Deleted',
                anchor             : 'Anchor',
                link_new_tab       : 'Open link in new tab',
                underline          : 'Underline',
                alignment          : 'Alignment',
                filename           : 'Name (optional)',
                edit               : 'Edit Or Drag to Resize'
            }
        };
    },


    /**
     * Handle redactor
     */
    handleRedactor: function()
    {
        if ($('.hasRedactor').length > 0) {

            // Get the controller URL and initialize redactor
            var url         = $('.hasRedactor').data("url");
            var documentUrl = $('.hasRedactor').data("document-url");

            var redactor    = $('.hasRedactor').redactor({
                focus            : true,
                minHeight        : 350,
                maxHeight        : 350,
                convertDivs      : false,
                convertVideoLinks: true,
                removeEmptyTags  : false,

                buttons: [
                    'html', 'formatting', 'bold', 'italic', 'deleted',
                    'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image',
                    'video', 'table', 'link', 'alignment', 'horizontalrule', // 'file',
                    'underline', 'alignleft', 'aligncenter', 'alignright', 'justify'
                ],

                imageGetJson      : url + 'list',
                clipboardUploadUrl: url + 'copy',
                imageUpload       : url + 'upload',
                predefinedLinks   : documentUrl,
                uploadFields      : {'_token': App.helper.getToken()},
                langs             : App.jquery.getRedactorLangs(),

                initCallback: function () {
                    var content = this.get();
                    var words   = App.helper.getWordCount(content);
                    $('.word-count').html('Word count: ' + words);
                },

                changeCallback: function (html) {
                    var content = html;
                    var words   = App.helper.getWordCount(content);
                    $('.word-count').html('Word count: ' + words);
                }
            });
        }
    }
};


/**
 * Window load functions
 *
 * Once the window has
 * loaded create the object
 */
$(document).ready(function() {
    App.jquery.init();
});