(function() {
    'use strict';

    angular.module('app.hosts').

    controller('ContainerController', function($rootScope, $scope, $modal, $window, containersService, controlsService) {
        function init() {
        }

        $scope.start = function() {
            containersService.startContainer($scope.host, $scope.container).success(function(data) {
                $scope.$parent.refresh();
            });
        }

        $scope.stop = function() {
            containersService.stopContainer($scope.host, $scope.container).success(function(data) {
                $scope.$parent.refresh();
            });
        }

        $scope.kill = function() {
            containersService.killContainer($scope.host, $scope.container).success(function(data) {
                $scope.$parent.refresh();
            });
        }

        $scope.restart = function() {
            containersService.restartContainer($scope.host, $scope.container).success(function(data) {
                $scope.$parent.refresh();
            });
        }

        $scope.remove = function(force) {
            containersService.removeContainer($scope.host, $scope.container, force).success(function(data) {
                $scope.$parent.refresh();
            });
        }

        $scope.showLogs = function() {
            containersService.getContainerLogs($scope.host, $scope.container).success(function(data) {
                controlsService.showModal({
                    title: "Container Logs",
                    template: data,
                    size: "lg"
                });
            });
        }

        $scope.showInfo = function() {
            containersService.getContainerInfo($scope.host, $scope.container).success(function(data) {
                controlsService.showModal({
                    title: "Container Info",
                    template: data,
                    size: "lg"
                });
            });
        };

        $scope.launchTool = function(toolName, port) {
            $rootScope.currentTool[toolName] = {
                tool: toolName,
                host: $scope.$parent.host,
                container: $scope.container,
                port: port
            };

            $window.location.href = "#/" + toolName;
        };

        init();
    });

})();
