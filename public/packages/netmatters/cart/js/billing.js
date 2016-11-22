(function() {

    var StripeBilling = {

        // Initialise
        init: function() {

            // Define elements
            this.form = $('#billing-form');
            this.submitButton = '.primary-action';
            this.submitButtonValue = $(this.submitButton).text();

            // Obtain Stripe Key
            var stripeKey = this.form.data('publishable_key');

            // This identifies your website in the createToken call below
            Stripe.setPublishableKey(stripeKey);

            this.bindEvents();
        },

        // Check for form being submitted
        bindEvents: function() {
            $(document).on('click', this.submitButton, $.proxy(this.sendToken, this));
        },

        // Send Token
        sendToken: function(event) {

            // Update Button
            $(this.submitButton).html('One Moment').addClass('disabled');

            // Submit to Stripe to create token
            Stripe.createToken(this.form, $.proxy(this.stripeResponseHandler, this));

            // Prevent Default
            event.preventDefault();
        },

        stripeResponseHandler: function(status, response) {

            // Show the errors on the form
            if (response.error) {
                $(this.submitButton).html(this.submitButtonValue).removeClass('disabled');
                return this.form.find('.payment-errors').removeClass('hidden').text(response.error.message);
            }

            this.form.append($('<input type="hidden" name="stripe-token" />').val(response.id));

            // Submit Form
            this.form[0].submit();

        },

    };

    $(document).on('modalLoaded', function() {
        StripeBilling.init();
    });

})();
