

app.controller('AlertCtrl', function($rootScope, $scope, NmAlert)
{
    // Get the alerts from the root scope
    $scope.alerts       = $rootScope.alerts;

    // Close function
    $scope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };
});
