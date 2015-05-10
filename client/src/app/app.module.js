(function () {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'ui.bootstrap',
        'ui.ace',
        'app.layout'
    ]).

    run(['$route', function($route)  {
        $route.reload();
    }]);

})();