/**
 *---------------------------------------------------------------
 * DOCUMENT READY FUNCTIONS
 *---------------------------------------------------------------
*/

    $(document).ready(function() {
        loadDatepicker();
        loadRedactor();
    });


/**
 *---------------------------------------------------------------
 * LOAD DATE PICKER
 *---------------------------------------------------------------
*/

    function loadDatepicker()
    {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy'
        });
    }


/**
 *---------------------------------------------------------------
 * LOAD REDACTOR
 *---------------------------------------------------------------
*/

    function loadRedactor()
    {
        $('.hasRedactor').redactor( {
            focus             : true,
            minHeight         : 350,
            maxHeight         : 350,
            convertDivs       : false,
            removeEmptyTags   : false,
            buttons           : [
                'bold', 'italic', 'unorderedlist', 'orderedlist', 'horizontalrule', 'link'
            ],
        });
    }
