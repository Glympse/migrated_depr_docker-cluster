(function() {
    'use strict';

    angular.module('app.layout', [
        'app.hosts',
        'app.sync'
    ]).

    config(['$routeProvider', function($routeProvider) {
        // NEXT: Show hosts at root as well for now.
        $routeProvider.when('/', {
            controller: 'HostsController',
            templateUrl: '/app/hosts/hosts.html'
        })
        .otherwise({redirectTo: '/'});
    }]);

})();
