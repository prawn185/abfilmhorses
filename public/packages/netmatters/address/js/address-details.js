/**
 * Handle google map
 */
function handleMap()
{
    // If the map-canvas exists
    if ($('#map-canvas').length > 0) {

        // Field Variables
        var ln1         = $('#line_1');
        var ln2         = $('#line_2');
        var city        = $('#city');
        var county      = $('#county');
        var postcode    = $('#postcode');
        var country     = $('#country_id');
        var address     = $('#map-canvas').data("address") || ln1.val() + ', ' + ln2.val() + ', ' + city.val() + ', ' + county.val() + ', ' + postcode.val();

        // On load get the map
        $('#map-canvas').html(App.map.dynamic(address));

        // Update google maps, on change
        $(document).on('change', '.map-control', function()
        {
            address = ln1.val() + ', ' + ln2.val() + ', ' + city.val() + ', ' + county.val() + ', ' + postcode.val();

            var selectedCountry = $('#country_id option:selected');
            if (selectedCountry.val() !== '') {
                address = address + ', ' + selectedCountry.html();
            }

            App.map.dynamic(address);
        });
    }
}


/**
 * Document ready event
 */
$(document).ready(function()
{

});


/**
 * Window load event
 */
$(window).load(function()
{
    handleMap();
});