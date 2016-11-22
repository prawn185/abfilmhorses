/**
 *---------------------------------------------------------------
 * Notification Controller
 *---------------------------------------------------------------
 */
function NotificationController($scope, $http, $timeout, $filter, $interval, Notification)
{
    $scope.url = Notification.url;
    $scope.url_read = Notification.url_read;

    // Commenting out until we have stable websocket support
    // var conn = new ab.Session(
    //     'ws://5.77.55.5:1111', // The host (our Latchet WebSocket server) to connect to
    //     function()
    //     { // Once the connection has been established
    //         conn.subscribe('netmatte_tasks', function(topic, event)
    //         {
    //             refreshData();
    //         });
    //     },
    //     function()
    //     {
    //         //If no socket refresh every 60 seconds
    //         refreshData();
    //         $interval(refreshData, 60000);
    //     },
    //     {
    //         // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
    //         'skipSubprotocolCheck' : true
    //     }
    // );

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

    refreshData();
    $interval(refreshData, 30000);

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
}
