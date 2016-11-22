/**
 * App format Object
 *
 * @type object
 */
App.format = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.format.handleNumberField();
        App.format.handleTextField();
    },


    /**
     * Handle number field formatting
     */
    handleNumberField: function() {
        $(document)
            .on('keypress', '.number-field', function(key) {
                if ((key.charCode != 46 && key.charCode < 48) || (key.charCode !== 46 && key.charCode > 57)) {
                    $(this).closest('.form-group').addClass('has-error');
                    return false;

                } else {
                    $(this).closest('.form-group').removeClass('has-error');
                }
            })
            .on('.focusout', '.number-field', function(e) {
                var str    = $(this).val();
                var newStr = str.replace(/(^\s+|\s+jQuery)/g, '');
                $(this).val(newStr);
            });
    },


    /**
     * Handle text field formatting
     */
    handleTextField: function() {
        $(document)
            .on('keypress', '.text-field', function(key) {
                if ((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 45)) {
                    $(this).closest('.form-group').addClass('has-error');
                    return false;

                } else {
                    $(this).closest('.form-group').removeClass('has-error');
                }
            })
            .on('focusout', '.text-field', function(e) {
                var str    = $(this).val();
                var newStr = str.replace(/(^\s+|\s+jQuery)/g, '');
                $(this).val(newStr);
            });
    }
};