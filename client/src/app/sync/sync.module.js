(function() {
    'use strict';

    angular.module('app.sync', [
        'ui.tree',
        'app.api.sync'
    ]).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sync', {
            controller: 'SyncController',
            templateUrl: '/app/sync/sync.html'
        });
    }]);

})();
