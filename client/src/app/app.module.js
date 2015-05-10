(function () {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'ui.bootstrap',
        'ui.ace',
        'app.layout'
    ]).

    run(['$rootScope', '$route', function($rootScope, $route)  {
        $rootScope.currentTool = {};

        $route.reload();
    }]);

})();