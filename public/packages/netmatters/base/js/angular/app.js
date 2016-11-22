'use strict';

var app = angular.module('sysflow',
    ['ngSanitize', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.sortable', 'ui.select',  'ui.grid', 'angular-redactor', 'ngAnimate'],
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
