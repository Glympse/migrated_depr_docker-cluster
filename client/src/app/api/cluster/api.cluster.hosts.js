(function() {
    'use strict';

    angular.module('app.api.cluster').

    service('hostsService', function ($http) {
        return {
            getList: function getList() {
                return $http.get("/api/1/hosts/list");
            }
        }
    });

})();
