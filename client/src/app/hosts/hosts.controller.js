(function() {
    'use strict';

    angular
        .module('app.hosts')
        .controller('HostsController', HostsController);

    function HostsController($scope, hostsService) {
        hostsService.getList().success(function(data) {
            $scope.hosts = data.body;
        });
    }

})();
