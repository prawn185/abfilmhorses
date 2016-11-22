/**
 * Task Routes
 */
angular.module('app').config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider)
    {
        // Handle redirects
        $urlRouterProvider.when('', '/');

        $stateProvider
            .state('index', {
                url          : '/',
                templateUrl  : App.baseUrl + '/views/task/index.html'
            })
            .state('create', {
                url          : '/create',
                templateUrl  : App.baseUrl + '/views/task/create.html'
            })
            .state('show', {
                url          : '/:id',
                templateUrl  : App.baseUrl + '/views/task/show.html'
            })
            .state('edit', {
                url          : '/:id/edit',
                templateUrl  : App.baseUrl + '/views/task/edit.html'
            })
            .state('destroy', {
                url          : '/:id/destroy',
                templateUrl  : App.baseUrl + '/views/task/destroy.html'
            });
    }
]);

/**
 * Task Service (Model)
 */
angular.module('app').service('taskService', [
    '$http', 'sessionService', 'Restangular',
    function($http, sessionService, Restangular)
    {
        return Restangular.service('task');
    }
]);
/**
 * Task Controller
 */
angular.module('app').controller('taskController', [
    '$rootScope', '$scope', '$stateParams', 'taskService', 'bootstrapService',
    function ($rootScope, $scope, $stateParams, taskService, bootstrapService)
    {
        /**
         * Declare Variables
         */
        $scope.task         = {};
        $scope.tasks        = {};
        $scope.activeTaskId = null;


        /**
         * Display a tasking of the resource
         */
        $scope.index = function()
        {
            $scope.showLoading();

            taskService.getList().then(function(response) {
                $scope.tasks = response;
                $scope.hideLoading();
                bootstrapService.addAlert('Tasks Updated', 'success');
            });
        };


        /**
         * Show the form for creating a new resource
         *
         * @param id
         */
        $scope.create = function (id)
        {
            taskService.query(function(data) {
                $scope.tasks = data;
                bootstrapService.addAlert('Tasks Updated', 'success');
            });
        };


        /**
         * Store a newly created resource in storage
         */
        $scope.store = function (task)
        {
            var input = {
                name   : task.name,
                content: task.content
            };

            console.log(input);

            // Store the response
            taskService.create(input)
                .success(function (response) {
                    $scope.task = response;
                })
                .error(function (response) {
                    bootstrapService.addAlert('Unable to store task' + response.message, 'danger');
                });
        };


        /**
         * Display the specified resource
         *
         * @param id
         */
        $scope.show = function(id)
        {
            var input = $rootScope.$stateParams;

            taskService.get({id: input.id}, function(data) {
                $scope.task = data;
            });
        };


        /**
         * Show the form for editing the specified resource
         *
         * @param id
         */
        $scope.edit = function(id)
        {
            var input = $rootScope.$stateParams;

            taskService.get({id: input.id}, function(data) {
                $scope.task = data;
            });
        };


        /**
         * Update the specified resource in storage
         *
         * @param id
         */
        $scope.update = function(id)
        {
            var input = {
                id     : 10,
                name   : 'JoJo',
                content: 'Pikidily'
            };

            // Store the response
            taskService.update(input)
                .success(function (response) {
                    $scope.task  = response;
                    $scope.flash = 'Resource Updated! Refreshing task.';
                })
                .error(function (response) {
                    bootstrapService.addAlert('Unable to update task' + response.message, 'danger');
                });
        };


        /**
         * Remove the specified resource from storage
         *
         * @param id
         */
        $scope.destroy = function(id)
        {
            var input = $rootScope.$stateParams;

            taskService.delete({id: input.id}, function(data) {
                $scope.task = data;
                bootstrapService.addAlert('Unable to destroy task' + response.message, 'danger');
            });
        };


        /**
         * Show loading
         */
        $scope.showLoading = function()
        {
            $scope.appLoading = true;
        };


        /**
         * Hide loading
         */
        $scope.hideLoading = function()
        {
            $scope.appLoading = false;
        };



        /**
         * Set active task
         *
         * @param index
         */
        $scope.setActiveTask = function(index)
        {
            $scope.activeTaskId = index;
            $scope.task = $scope.tasks[index];
        };

    }
]);

//# sourceMappingURL=task-module.js.map