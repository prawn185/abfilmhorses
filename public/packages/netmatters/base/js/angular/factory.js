
app.factory('NmAlert', function($rootScope, $timeout) {

    $rootScope.alerts = [];

    self.addAlert = function(msg, type)
    {
        // Add item to array
        $rootScope.alerts.push({
            msg: msg,
            type: type,
            expired: false
        });

        // Timeout function
        angular.forEach($rootScope.alerts, function(alert, i) {
            $timeout(function() {
                alert.expired = true;
                $rootScope.alerts.splice(alert, 1);
            }, 5000);
        });
    };

    return self;
});
