(function() {
    'use strict';

    angular.module('app.api.cluster')

    .service('hostsService', function ($http) {
        var service = {
            getList: getList
        };
        return service;

        function getList() {
            return $http.get('/api/1/hosts/list');
        }
    });

})();
