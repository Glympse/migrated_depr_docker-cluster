(function() {
    'use strict';

    angular
        .module('app.hosts')
        .controller('HostsController', HostsController);

    function HostsController($scope, hostsService) {
        $scope.layout_horizontal = true;

        hostsService.getList().success(function(data) {
            $scope.hosts = data.body;
        });
    }

})();
