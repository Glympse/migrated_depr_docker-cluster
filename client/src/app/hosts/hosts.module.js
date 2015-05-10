(function() {
    'use strict';

    angular.module('app.hosts', [
        'app.api.cluster',
        'app.api.docker',
        'app.controls'
    ]).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/hosts', {
            controller: 'HostsController',
            templateUrl: '/app/hosts/hosts.html'
        });
    }]);

})();
