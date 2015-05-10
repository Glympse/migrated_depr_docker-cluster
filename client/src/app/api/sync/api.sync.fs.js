(function() {
    'use strict';

    angular.module('app.api.sync').

    service('syncService', function ($http) {
        return {
            getList: function(base) {
                return $http.get(base + '/api/1/list');
            },

            getItem: function(base, name) {
                return $http.get(base + '/api/1/get?name=' + name);
            },

            updateItem: function(base, name, data) {
                return $http.post(base + '/api/1/update?name=' + name, data);
            }
        };
    });

})();
