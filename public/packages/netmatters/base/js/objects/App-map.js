/**
 * App map Object
 *
 * @type object
 */
App.map = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {

    },


    /**
     * Static google map function
     *
     * @param address
     * @returns {string}
     */
    static: function(address) {

        // Clean the address
        address = address.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        // If the map-canvas exists
        var zoom = 16;
        var scale = 1;
        var width = 525;
        var height = 230;
        var mapType = 'roadmap';
        var sensor = false;
        var format = 'png';
        var refresh = true;
        var markers = 'size:mid%7Ccolor:red%7C' + address;

        return '<img src="http://maps.googleapis.com/maps/api/staticmap?center='
            + address + '&zoom='
            + zoom + '&scale='
            + scale + '&size='
            + width + 'x'
            + height + '&maptype='
            + mapType + '&sensor='
            + sensor + '&format='
            + format + '&visual_refresh='
            + refresh + '&markers='
            + markers + ' ">';

    },


    /**
     * Dynamic Google maps function
     *
     * @param address
     */
    dynamic: function(address) {

        // Clean the address
        address = address.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        // Google map variables
        var geocoder;
        var map;

        // Google Map setup
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-0.133, 51.500);
        var mapOptions = {
            zoom   : 15,
            center : latlng
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Geo coder for the address
        geocoder.geocode({'address' : address}, function(results, status)
        {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    position : results[0].geometry.location,
                    map      : map
                });
            }
        });
    }
};