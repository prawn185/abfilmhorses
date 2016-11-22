/**
 * App router Object
 *
 * @type object
 */
App.router = {

    /**
     * Constructor Function
     *
     * Boot function
     */
    init: function() {
        App.router.getRoutes();
    },


    /**
     * Get route by name
     *
     * @param name
     */
    getRoute: function(name) {
        App.ajax.request(App.baseUrl + '/api/v1/route', {name:name}).success(function(data) {
            return data;
        });
    },


    /**
     * Get routes
     */
    getRoutes: function() {
        var nextCheck;
        var cachedRoutes;
        var currentTime  = moment();

        if (App.debug.get() == false && App.storage.get('routes')) {
            cachedRoutes = App.storage.get('routes');
            nextCheck = moment(cachedRoutes.nextCheck);
        }

        // If the current time is greater than the next check then refresh the routes
        if (typeof nextCheck === 'object' && nextCheck.isAfter(currentTime)) {
            App.routes = cachedRoutes;

        } else {
            App.router.setRoutes();
        }
    },


    /**
     * Set routes
     */
    setRoutes: function()
    {
        App.ajax.request(App.baseUrl + '/api/v1/routes').success(function(data)
        {
            App.routes = data;
            App.routes.lastCheck = moment();
            App.routes.nextCheck = moment().add(1, 'hour');
            App.storage.set('routes', App.routes);
        });
    }
};