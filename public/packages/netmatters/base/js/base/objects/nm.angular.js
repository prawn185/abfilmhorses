

var app = angular.module('sysflow', ['ui.bootstrap', 'ui.sortable', 'angular-redactor', 'ngAnimate'], function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

app.directive('dropzone', function () {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];

    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);

    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});

app.directive('selectpicker', function ($interval) {
    return {
        restrict: 'CA',
        link: function (scope, elem) {
            angular.element('button.dropdown-toggle').on('click', function () {
                angular.element(elem).selectpicker('refresh');
            });
            $interval(function(){
                angular.element(elem).selectpicker('refresh');
            }, 1000);
        }
    };
});

app.filter('bytes', function() {
    return function(bytes, precision) {
        if (bytes === 0) { return '0 bytes' }
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;

        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024)),
            val = (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision);

        return  (val.match(/\.0*$/) ? val.substr(0, val.indexOf('.')) : val) +  ' ' + units[number];
    }
});


app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
