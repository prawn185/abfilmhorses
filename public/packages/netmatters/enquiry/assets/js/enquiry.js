/**
 *---------------------------------------------------------------
 * DOCUMENT READ
 *---------------------------------------------------------------
*/

    $(document).ready(function () {
        initialize();
        contactValidation();
    });


/**
 *---------------------------------------------------------------
 * MAP
 *---------------------------------------------------------------
*/

    function initialize()
    {

        if (!$('#map').length) {
            return false;
        }

        var myLatlng = new google.maps.LatLng($('#map').data('lat'), $('#map').data('lng'));

        var myOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true
        };

        var map = new google.maps.Map(document.getElementById("map"), myOptions);

        var marker = new google.maps.Marker({
            position : new google.maps.LatLng($('#map').data('lat'), $('#map').data('lng')),
            title: $('#map').data('name')
        });

        marker.setMap(map);

        var infowindow = new google.maps.InfoWindow({
            content : $('#map').data('address')
        });

        google.maps.event.addListener(marker, 'click', function()
        {
            infowindow.open(map, marker);
        });

    }


/**
 *---------------------------------------------------------------
 * CONTACT VALIDATION
 *---------------------------------------------------------------
*/

    function contactValidation()
    {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                telephone: {
                    required: true,
                },
                subject: {
                    required: true,
                },
                message: {
                    required: true,
                },
                captcha: {
                    required: true,
                },
            },
            errorPlacement: function(error, element) {
            },
            highlight: function(element) {
                $(element).addClass("has-error");
            },
            unhighlight: function(element) {
                $(element).removeClass("has-error");
            }
        });
    }
