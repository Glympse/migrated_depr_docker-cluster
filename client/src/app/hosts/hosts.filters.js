(function() {
    'use strict';

    angular.module('app.hosts').

    filter('dockerImageName', function() {
        return function(name) {
            var slashIndex = name.indexOf('/');
            if ( -1 == slashIndex ) {
                return name;
            }
            var dotIndex = name.indexOf('.');
            if ( -1 == dotIndex ) {
                return name;
            }
            return name.substring(slashIndex + 1);
        }
    });

})();
