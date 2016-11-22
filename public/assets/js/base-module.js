'use strict';

/**
 * App Module
 *
 * This is where we declare the module dependencies
 * and inject them into the app
 */
angular.module('app', [
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ngStorage',

    'ui.bootstrap',
    'ui.router',
    'ui.sortable',
    'ui.select',
    'ui.grid',
    'ui.utils',

    'angular-redactor',
    'jackrabbitsgroup.angular-datetimepicker',
    'restangular'
]);

/**
 * App Config
 *
 * This is where we define all the modules pre
 * configuration options.
 */
angular.module('app').config([
    '$httpProvider', '$locationProvider', '$interpolateProvider',
    function($httpProvider, $locationProvider, $interpolateProvider)
    {
        // Change the angular symbol from {{ variable }} to [[ variable ]] for blade
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        // Handle server error codes
        $httpProvider.interceptors.push(function($q, $location) {
            return {
                'responseError' : function(response)
                {
                    if (response.status === 401) { // Handle 401 not authorised
                        console.log('error 401 not authorised');
                        $location.path('/login');

                    } else if (response.status === 403) { // Handle 403 forbiddon
                        //$location.path('/403');

                    } else if (response.status === 500) { // handle 500 internal server error
                        //$location.path('/500');
                    }
                    return $q.reject(response);
                }
            };
        });
    }
]);


/**
 * App Run
 *
 * This is where we define the modules default
 * run methods (Boot Methods)
 */
angular.module('app').run([
    '$rootScope', '$window', '$http',
    function($rootScope, $window, $http)
    {
        // Set default CSRF token for all http requests
        $http.defaults.headers.common['X-Csrf-Token'] = App.helper.getToken();

        // Handle back button
        $rootScope.goBack = function() {
            $window.history.back();
        };

        // Handle online / offline
        $rootScope.online = navigator.onLine;

        $window.addEventListener("offline", function() {
            $rootScope.$apply(function() {
                $rootScope.online = false;
            });
        }, false);

        $window.addEventListener("online", function() {
            $rootScope.$apply(function() {
                $rootScope.online = true;
            });
        }, false);
    }
]);

/**
 * Restangular Config
 *
 * This is where we define all the modules pre
 * configuration options.
 */
angular.module('app').config([
    'RestangularProvider',
    function(RestangularProvider)
    {
        // Set base url
        RestangularProvider.setBaseUrl('/api/v1');

    }
]);
/**
 * Router config
 */
angular.module('app').config([
    '$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider)
    {

    }
]);


/**
 * Router boot method
 */
angular.module('app').run([
    '$rootScope', '$window', '$state', '$stateParams', 'sessionService',
    function($rootScope, $window, $state, $stateParams, sessionService)
    {
        // Save state
        $rootScope.$state       = $state;
        $rootScope.$stateParams = $stateParams;

    }
]);
/**
 * Auth Service (Model)
 *
 * This service is used to interact with a token based API
 */
angular.module('app').factory('authService', [
    '$http', 'sessionService',
    function($http, sessionService)
    {
        /**
         * Declare Variables
         */
        var resourceUrl = 'https://api.sysflow.co.uk/v1/auth/';
        var authService = {};


        /**
         * Create a new resource
         *
         * @param data
         * @returns {HttpPromise}
         */
        authService.create = function(data)
        {
            return $http({
                url     : resourceUrl,
                method  : "POST",
                data    : data || [],
                headers : {
                    'Content-Type'  : 'application/json'
                }
            });
        };


        /**
         * Destroy existing resource
         *
         * @param id
         * @returns {HttpPromise}
         */
        authService.destroy = function(data)
        {
            return $http({
                url     : resourceUrl,
                method  : "DELETE",
                data    : data || [],
                headers : {
                    'Content-Type' : 'application/json',
                    'X-Auth-Token' : sessionService.get('X-Auth-Token')
                }
            });
        };


        // Return the Service object
        return authService;
    }
]);


/**
 * Bootstrap Service
 *
 * This service is used to interact
 * with the core bootstrap functionality
 */
angular.module('app').factory('bootstrapService', [
    '$rootScope', '$timeout',
    function($rootScope, $timeout)
    {
        /**
         * Setup alert array
         * @type {Array}
         */
        $rootScope.alerts = [];


        /**
         * Add Alert
         *
         * @param message
         * @param type
         */
        self.addAlert = function(message, type)
        {
            // Add item to array
            $rootScope.alerts.push({
                type    : type,
                expired : false,
                message : message
            });

            // Timeout function
            angular.forEach($rootScope.alerts, function(alert, i) {
                $timeout(function() {
                    alert.expired = true;
                    $rootScope.alerts.splice(alert, 1);
                }, 3000);
            });
        };


        // Return the service object
        return self;
    }
]);


/**
 * Session Service (Model)
 *
 * This service is used to provide a form of persistence
 * for the application, at present it current store data
 * with the session resource of the browser.
 */
angular.module('app').factory('sessionService', [

    function()
    {
        /**
         * Declare Variables
         */
        var sessionService = {};


        /**
         * Get session data
         *
         * @param key
         * @returns {*}
         */
        sessionService.get = function(key)
        {
            return sessionStorage.getItem(key);
        };


        /**
         * Set session data
         *
         * @param key
         * @param val
         * @returns {*}
         */
        sessionService.set = function(key, val)
        {
            return sessionStorage.setItem(key, val);
        };


        /**
         * Unset session data
         *
         * @param key
         * @returns {*}
         */
        sessionService.unset = function(key)
        {
            return sessionStorage.removeItem(key);
        };


        // Return the Service object
        return sessionService;
    }
]);

/**
 * Dropzone directive
 */
angular.module('app').directive('dropzone', function()
{
    return function (scope, element, attrs) {

        // create a Dropzone for the element with the given options
        var config   = scope[attrs.dropzone];
        var dropzone = new Dropzone(element[0], config.options);

        // bind the given event handlers
        angular.forEach(config.eventHandlers, function (handler, event) {
            dropzone.on(event, handler);
        });
    };
});
/**
 * Select picker directive
 */
angular.module('app').directive('selectpicker', function($timeout)
{
    return {
        restrict: 'CA',
        link    : function (scope, element, attrs) {
            var refresh = function () {
                $(element).selectpicker('refresh')
            };
            $timeout(refresh, 0);
        }
    }
});
/**
 * Bootstrap switch directive
 */
angular.module('app').directive('bsSwitch', [
    '$timeout',
    function ($timeout) {
        return {
            restrict: 'EA',
            require : 'ngModel',
            scope   : {
                switchActive  : '@',
                switchOnText  : '@',
                switchOffText : '@',
                switchOnColor : '@',
                switchOffColor: '@',
                switchAnimate : '@',
                switchSize    : '@',
                switchLabel   : '@',
                switchIcon    : '@',
                switchWrapper : '@'
            },
            template: function (tElement) {
                return ('' + tElement.nodeName).toLowerCase() === 'input' ? undefined : '<input>';
            },
            replace : true,
            link    : function link(scope, element, attrs, controller)
            {
                /**
                 * Listen to model changes.
                 */
                var listenToModel = function ()
                {
                    // When the model changes
                    controller.$formatters.push(function (newValue) {
                        if (newValue !== undefined) {
                            $timeout(function () {
                                element.bootstrapSwitch('state', newValue || false, true);
                            });
                        }
                    });

                    scope.$watch('switchActive', function (newValue) {
                        var active = newValue === true || newValue === 'true' || !newValue;
                        element.bootstrapSwitch('disabled', !active);
                    });
                    scope.$watch('switchOnText', function (newValue) {
                        element.bootstrapSwitch('onText', getValueOrUndefined(newValue));
                    });
                    scope.$watch('switchOffText', function (newValue) {
                        element.bootstrapSwitch('offText', getValueOrUndefined(newValue));
                    });
                    scope.$watch('switchOnColor', function (newValue) {
                        attrs.dataOn = newValue;
                        element.bootstrapSwitch('onColor', getValueOrUndefined(newValue));
                    });
                    scope.$watch('switchOffColor', function (newValue) {
                        attrs.dataOff = newValue;
                        element.bootstrapSwitch('offColor', getValueOrUndefined(newValue));
                    });
                    scope.$watch('switchAnimate', function (newValue) {
                        element.bootstrapSwitch('animate', scope.$eval(newValue || 'true'));
                    });
                    scope.$watch('switchSize', function (newValue) {
                        element.bootstrapSwitch('size', newValue);
                    });
                    scope.$watch('switchLabel', function (newValue) {
                        element.bootstrapSwitch('labelText', newValue ? newValue : '&nbsp;');
                    });
                    scope.$watch('switchIcon', function (newValue) {
                        if (newValue) {
                            // build and set the new span
                            var spanClass = '<span class=\'' + newValue + '\'></span>';
                            element.bootstrapSwitch('labelText', spanClass);
                        }
                    });
                    scope.$watch('switchWrapper', function (newValue) {
                        // Make sure that newValue is not empty, otherwise default to null
                        if (!newValue) {
                            newValue = null;
                        }
                        element.bootstrapSwitch('wrapperClass', newValue);
                    });
                };

                /**
                 * Listen to view changes.
                 */
                var listenToView        = function () {
                    // When the switch is clicked, set its value into the ngModelController's $viewValue
                    element.on('switchChange.bootstrapSwitch', function (e, data) {
                        scope.$apply(function () {
                            controller.$setViewValue(data);
                        });
                    });
                };

                /**
                 * Returns the value if it is truthy, or undefined.
                 *
                 * @param value The value to check.
                 * @returns the original value if it is truthy, {@link undefined} otherwise.
                 */
                var getValueOrUndefined = function (value) {
                    return value ? value : undefined;
                };

                // Listen and respond to model changes
                listenToModel();

                // Bootstrap the switch plugin
                element.bootstrapSwitch();

                // Listen and respond to view changes
                listenToView();

                // Delay the setting of the state
                $timeout(function () {
                    element.bootstrapSwitch('state', controller.$modelValue || false, true);
                });

                // On destroy, collect ya garbage
                scope.$on('$destroy', function () {
                    element.bootstrapSwitch('destroy');
                });
            }
        };
    }
]);
/**
 * Bytes filter
 */
angular.module('app').filter('bytes', function()
{
    return function (bytes, precision) {
        if (bytes === 0) {
            return '0 bytes'
        }
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;

        var units  = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024)),
            val    = (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision);

        return (val.match(/\.0*$/) ? val.substr(0, val.indexOf('.')) : val) + ' ' + units[number];
    }
});


/**
 * Plain Text Filter
 */
angular.module('app').filter('htmlToPlaintext', function() {
    return function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
    }
});
/**
 * To trusted filter
 */
angular.module('app').filter('to_trusted', ['$sce', function ($sce)
{
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


/**
 * App Controller
 *
 * This is where we define the main
 * application controller, this controller is
 * meant to be as abstract as possible so
 * please only put global based methods in here
 */
angular.module('app').controller('appController', [
    '$rootScope', '$scope', '$location', '$localStorage', '$window', 'sessionService',
    function($rootScope, $scope, $location, $localStorage, $window, sessionService)
    {
        // Setup the base url
        var baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/';

        // Application Config
        $rootScope.app = {
            name            : 'Cloud App',
            version         : '4.0.0',
            base_url        : baseUrl,
            asset_path      : baseUrl + 'assets',
            image_path      : baseUrl + 'assets/images',
            js_path         : baseUrl + 'assets/js',
            css_path        : baseUrl + 'assets/css',
            font_path       : baseUrl + 'assets/fonts'
        };

         // Watch the app object for changes and update local storage
         $rootScope.$watch('app', function() {
             $localStorage.app = $rootScope.app;
         }, true);

        // Watch online state
        $rootScope.$watch('online');
    }
]);

/**
 * Bootstrap Controller
 *
 * This controller is used to handle
 * the core bootstrap based functionality
 */
angular.module('app').controller('bootstrapController', [
    '$rootScope', '$scope',
    function($rootScope, $scope)
    {
        /**
         * Get the alerts from the root scope
         */
        $scope.alerts = $rootScope.alerts;


        /**
         * Close alert function
         *
         * @param index
         */
        $scope.closeAlert = function(index)
        {
            $rootScope.alerts.splice(index, 1);
        };
    }
]);


/**
 * Notification Controller
 */
angular.module('app').controller('notificationController', [
    '$rootScope', '$scope', '$http', '$timeout', '$filter', '$interval',
    function($rootScope, $scope, $http, $timeout, $filter, $interval)
    {
        $scope.url      = App.notification.list;
        $scope.url_read = App.notification.read;

        /**
         * Refresh data function
         */
        var refreshData = function()
        {
            //Get review data
            $http.get($scope.url)
                .success(function(data, status, headers, config)
                {
                    $scope.notifications = data;
                    $scope.unread = 0;

                    angular.forEach($scope.notifications, function(value, key)
                    {
                        if (!value.read_at) {
                            $scope.unread += 1;
                        }
                    });
                })
                .error(function(data, status, headers, config)
                {

                });
        };


        /**
         * Read function
         */
        $scope.read = function()
        {
            $timeout(function()
            {
                angular.forEach($scope.notifications, function(value, key)
                {
                    $scope.notifications[key].read_at = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                });
                $scope.unread = 0;

                $http.post($scope.url_read, 'read');

            }, 2000);
        };


        /**
         * Init calls
         */
        refreshData();
        $interval(refreshData, 30000);
    }
]);

//# sourceMappingURL=base-module.js.map