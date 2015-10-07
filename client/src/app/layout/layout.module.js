(function() {
    'use strict';

    angular.module('app.layout', [
        'app.hosts',
        'app.sync'
    ]).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HostsController',
            templateUrl: '/app/hosts/hosts.html'
        })
        .otherwise({redirectTo: '/'});
    }]);

})();
