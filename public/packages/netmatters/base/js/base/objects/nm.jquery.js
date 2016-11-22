
/**
 *---------------------------------------------------------------
 * CREATE CUSTOM OBJECT
 *---------------------------------------------------------------
 */
var JQueryComponents = function(){};


/**
 *---------------------------------------------------------------
 * VALIDATOR
 *---------------------------------------------------------------
 */
JQueryComponents.prototype.handleValidator = function()
{
    // Setup the Jquery Validation Defaults
    jQuery.validator.setDefaults({
        doNotHideMessage : true, //this option enables to show the error/success messages on tab switch.
        errorElement     : 'span', //default input error message container
        errorClass       : 'error-popup', // default input error message class
        focusInvalid     : false, // do not focus the last invalid input
        errorPlacement   : function(error, element)
        {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight        : function(element)
        {
            jQuery(element)
                .closest('.form-group')
                .removeClass('has-success')
                .addClass('has-error');
        },
        unhighlight      : function(element)
        {
            if (jQuery(element).closest('.form-group').hasClass('has-error')) {
                jQuery(element)
                    .closest('.form-group')
                    .removeClass('has-error')
                    .addClass('has-success');
            }
        },
        invalidHandler   : function(event, validator)
        {
            App.scrollTo(jQuery('.wizard'), -200);
        },
        onfocusout       : function(element)
        {
            jQuery(element).valid();
        },
        onchange         : function(element)
        {
            jQuery(element).valid();
        },
    });
};


/**
 *---------------------------------------------------------------
 * INPUT: EDITABLE
 *---------------------------------------------------------------
 */
JQueryComponents.prototype.handleEditable = function()
{
    $('.editable').attr('contenteditable', 'true');

    $('.editable').on('focus', function()
    {
        $(this).toggleClass('active');
    });

    $('.editable').on('blur', function()
    {
        if ($(this).data('url') !== '') {
            console.log('ajax call');
        }
        console.log('No data url');
    });
};


/**
 *---------------------------------------------------------------
 * DATA TABLES
 *---------------------------------------------------------------
 * Datatables ** This must be loaded before pretty
 * checkable and select picker
 */
JQueryComponents.prototype.handleDataTables = function(selector)
{
    // If the plugin is not loaded then skip
    if (!jQuery().dataTable()) {
        return;
    }

    var tablesSelector = (typeof selector != 'undefined') ? selector : '.data-tables';

    var tables = jQuery(tablesSelector);

    // Loop through tables and create datatable object
    jQuery.each( tables, function( index, value ) {
        var options = {
            "aaSorting"  : [
                [$(this).data('sort') || 0, $(this).data('order') || 'asc']
            ],
            'sDom'       : '<"dataTables_header"lfr>t<"dataTables_footer"ip>',
            "bStateSave" : false,
            "bDeferRender" : false
        };

        // If the table has a URL add the POST function
        if( jQuery(value).data('ajax') )
        {
            options.ajax = $(value).data('ajax');
            options.bProcessing = false;
            options.bDeferRender = true;
        }

        // Create datatable
        jQuery(value).dataTable( options );

    });

};


/**
 *---------------------------------------------------------------
 * FLIPCLOCK
 *---------------------------------------------------------------
 */
JQueryComponents.prototype.handleFlipClock = function()
{
    // If the plugin is not loaded then skip
    if (!jQuery().FlipClock()) {
        return;
    }

    // Create the clock object
    var clock = jQuery('.clock').FlipClock({
        clockFace : 'MinuteCounter',
        countdown : false,
        autoStart : false,
    });

    function updateStatus(status)
    {
        jQuery.cookie("clockStatus", status, {path : '/'});
    }

    function updateTime(time)
    {
        jQuery.cookie("clockTime", time, {path : '/'});
    }

    function startClock(timeInSeconds)
    {
        // If the clock has not yet been created then set the start time
        if (jQuery.cookie("clockStart") == null || jQuery.cookie("clockStart") == 0) {
            jQuery.cookie("clockStart", timeInSeconds, {path : '/'});
        }

        // If the clock is not running and the user presses start then reset the start time
        if (jQuery.cookie("clockStatus") === 'reset' || jQuery.cookie("clockStatus") === 'stop') {
            var newStart = timeInSeconds - jQuery.cookie("clockTime");
            jQuery.cookie("clockStart", newStart, {path : '/'});
        }

        // Start the clock and change the status
        clock.start();
        updateStatus('start');

        console.log('Clock Status: ', jQuery.cookie("clockStatus"));
        console.log('Current time: ', timeInSeconds);
        console.log('Start time: ', jQuery.cookie("clockStart"));
        console.log('Logged Time:', jQuery.cookie("clockTime"));
    }

    function stopClock(timeInSeconds)
    {
        // Stop the clock and change the status
        clock.stop();
        updateStatus('stop');

        // Log the current time to the cookie
        var time = clock.getTime();
        updateTime(time);

        console.log('Clock Status: ', jQuery.cookie("clockStatus"));
        console.log('Current time: ', timeInSeconds);
        console.log('Start time: ', jQuery.cookie("clockStart"));
        console.log('Logged Time:', jQuery.cookie("clockTime"));
    }

    function resetClock()
    {
        // Stop the clock and reset the time
        clock.stop();
        clock.setTime(0);

        // Set the cookie to default
        jQuery.cookie("clockTime", 0, {path : '/'});
        jQuery.cookie("clockStart", 0, {path : '/'});

        // Remove the cookies
        jQuery.removeCookie("clockTime");
        jQuery.removeCookie("clockStart");

        // Change the status
        updateStatus('restart');
    }
};


/**
 *---------------------------------------------------------------
 * TINY MCE
 *---------------------------------------------------------------
 */
JQueryComponents.prototype.handleTinymce = function()
{
    // Date / Time
    var d = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var currentdate = day + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + hr + ':' + min;

    tinymce.init({
        menubar     : false,
        selector    : ".tinymce",
        plugins     : [
            "advlist autolink lists link charmap print",
            "code",
            "contextmenu paste"
        ],
        toolbar     : "mybutton | undo redo | bold italic | bullist numlist outdent indent | link | print | code",
        contextmenu : "link bold italic | cut copy paste | print",
        setup       : function(editor)
        {
            editor.addButton('mybutton', {
                text    : 'Add Note',
                icon    : false,
                onclick : function()
                {
                    var line = ' ---- ';
                    var user = '<strong class="red">' + _username + '</strong>: ';
                    editor.insertContent(line + user + currentdate + line + '<br/><br/><br/>');
                }
            });
        }
    });
};


/**
 *---------------------------------------------------------------
 * REDACTOR
 *---------------------------------------------------------------
 */
JQueryComponents.prototype.handleRedactor = function()
{
    if ($('.hasRedactor').length > 0) {

        var token = $('input[name="_token"]').val();

        function wordCount(html)
        {
            // Remove any HTML tags, newlines and tabs, split by spaces and then count
            var count = $(html).text().replace(/\t+/g, " ").replace(/\n/g, "").split(' ').length;

            if ($(html).text().length) {
                // If there are HTML tags, remove them along with newlines and tabs, split by spaces and then count
                count = $(html).text().replace(/\t+/g, " ").replace(/\n/g, "").split(' ').length;
            } else {
                // Otherwise, just remove newlines and tabs, split by spaces and then count
                count = html.replace(/\t+/g, " ").replace(/\n/g, "").split(' ').length;
            }
            return count;
        }

        var langs = {
            en : {
                html: 'HTML',
                video: 'Insert Video',
                image: 'Insert Image',
                table: 'Table',
                link: 'Link',
                link_insert: 'Insert link',
                link_edit: 'Edit link',
                unlink: 'Unlink',
                formatting: 'Formatting',
                paragraph: 'Normal text',
                quote: 'Quote',
                code: 'Code',
                header1: 'Header 1',
                header2: 'Header 2',
                header3: 'Header 3',
                header4: 'Header 4',
                header5: 'Header 5',
                bold: 'Bold',
                italic: 'Italic',
                fontcolor: 'Font Color',
                backcolor: 'Back Color',
                unorderedlist: 'Unordered List',
                orderedlist: 'Ordered List',
                outdent: 'Outdent',
                indent: 'Indent',
                cancel: 'Cancel',
                insert: 'Insert',
                save: 'Save',
                _delete: 'Delete',
                insert_table: 'Insert Table',
                insert_row_above: 'Add Row Above',
                insert_row_below: 'Add Row Below',
                insert_column_left: 'Add Column Left',
                insert_column_right: 'Add Column Right',
                delete_column: 'Delete Column',
                delete_row: 'Delete Row',
                delete_table: 'Delete Table',
                rows: 'Rows',
                columns: 'Columns',
                add_head: 'Add Head',
                delete_head: 'Delete Head',
                title: 'Title',
                image_position: 'Position',
                none: 'None',
                left: 'Left',
                right: 'Right',
                center: 'Center',
                image_web_link: 'Image Web Link',
                text: 'Text',
                mailto: 'Email',
                web: 'URL',
                video_html_code: 'Video Embed Code',
                file: 'Insert File',
                upload: 'Upload',
                download: 'Download',
                choose: 'Choose Existing',
                or_choose: 'Or choose',
                drop_file_here: 'Drop file here',
                align_left: 'Align text to the left',
                align_center: 'Center text',
                align_right: 'Align text to the right',
                align_justify: 'Justify text',
                horizontalrule: 'Insert Horizontal Rule',
                deleted: 'Deleted',
                anchor: 'Anchor',
                link_new_tab: 'Open link in new tab',
                underline: 'Underline',
                alignment: 'Alignment',
                filename: 'Name (optional)',
                edit: 'Edit Or Drag to Resize'
            },
        };

        // Get the controller URL and initialize redactor
        var url = $('.hasRedactor').data("url");
        var documentUrl = $('.hasRedactor').data("document-url");
        var redactor = $('.hasRedactor').redactor(
        {
            focus             : true,
            minHeight         : 350,
            maxHeight         : 350,
            convertDivs       : false,
            convertVideoLinks : true,
            removeEmptyTags   : false,
            buttons           : [
                'html', 'formatting', 'bold', 'italic', 'deleted',
                'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image',
                'video', 'table', 'link', 'alignment', 'horizontalrule', // 'file',
                'underline', 'alignleft', 'aligncenter', 'alignright', 'justify'
            ],

            imageGetJson       : url + 'list',
            clipboardUploadUrl : url + 'copy',
            imageUpload        : url + 'upload',
            predefinedLinks    : documentUrl,

            // fileUpload   : url + 'upload-file',
            uploadFields : {'_token' : token},

            langs: langs,

            initCallback   : function()
            {
                var content = this.get();
                var words = wordCount(content);
                $('.word-count').html('Word count: ' + words);
            },
            changeCallback : function(html)
            {
                var content = html;
                var words = wordCount(content);
                $('.word-count').html('Word count: ' + words);
            },

            // dropCallback: function(e){
            //     // Callback for drag and drop
            // },

            // autosave:           url + 'auto-save',
            // autosaveInterval:   30,
            // autosaveCallback:   function(data) {
            //     console.log(data);
            // }
        });
    }
};
