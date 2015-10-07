(function() {
    'use strict';

    angular
        .module('app.hosts')
        .controller('HostController', HostController);

    function HostController($scope, $modal, containersService, controlsService) {
        function init() {
            $scope.containers = [];
            $scope.refresh();
        }

        $scope.createImage = function() {
            var template = {
                "fromImage": "",
                "X-Registry-Auth": ""
            };

            controlsService.showModal({
                title: "Create an Image",
                template: template,
                ok: function(params) {
                    // Extract arguments
                    var paramsBlob = angular.fromJson(params);
                    var fromImage = paramsBlob["fromImage"];
                    var xRegistryAuth = paramsBlob["X-Registry-Auth"];

                    containersService.createImage($scope.host, fromImage, xRegistryAuth).success(function(data) {
                        controlsService.showModal({
                            title: "Image Created",
                            template: data
                        });
                        $scope.refresh();
                    });
                }
            });
        }

        $scope.createContainer = function() {

            var template = {};

            var creator = $modal.open({
                templateUrl: '/app/controls/modal.json.html',
                controller: 'JsonController',
                size: "lg",
                resolve: {
                    title: function() {
                        return "Create a Container";
                    },
                    content: function () {
                        return angular.toJson(template, true);
                    }
                }
            });

            creator.result.then(function (params) {
                // Extract the name.
                var paramsBlob = angular.fromJson(params);
                var name = paramsBlob["Name"];

                containersService.createContainer($scope.host, name, params).success(function(data) {
                    $scope.refresh();
                });

            }, function () {});

        };

        $scope.refresh = function() {
            containersService.getList($scope.host).success(function(data) {
                $scope.containers = data;
            });
        };

        $scope.showInfo = function() {

            containersService.getHostInfo($scope.host).success(function(data) {

                var modalInstance = $modal.open({
                    templateUrl: '/app/controls/modal.json.html',
                    controller: 'JsonController',
                    size: "lg",
                    resolve: {
                        title: function() {
                            return "Host Info";
                        },
                        content: function () {
                            return angular.toJson(data, true);
                        }
                    }
                });

            });

        };

        $scope.showImages = function() {

            containersService.getImagesList($scope.host).success(function(data) {

                var modalInstance = $modal.open({
                    templateUrl: '/app/controls/modal.json.html',
                    controller: 'JsonController',
                    size: "lg",
                    resolve: {
                        title: function() {
                            return "Images List";
                        },
                        content: function () {
                            return angular.toJson(data, true);
                        }
                    }
                });

            });

        };

        init();
    }

})();
