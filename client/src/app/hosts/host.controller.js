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
                size: "lg",
                ok: function(params) {
                    // Extract arguments
                    var paramsBlob = angular.fromJson(params);
                    var fromImage = paramsBlob["fromImage"];
                    var xRegistryAuth = paramsBlob["X-Registry-Auth"];

                    // Make API call to create an image.
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

            controlsService.showModal({
                title: "Create a Container",
                template: template,
                size: "lg",
                ok: function(params) {
                    // Extract the name.
                    var paramsBlob = angular.fromJson(params);
                    var name = paramsBlob["Name"];

                    // Make API call to create a container.
                    containersService.createContainer($scope.host, name, params).success(function(data) {
                        $scope.refresh();
                    });
                }
            });
        };

        $scope.refresh = function() {
            containersService.getList($scope.host).success(function(data) {
                $scope.containers = data;
            });
        };

        $scope.showInfo = function() {
            // Retrieve host info.
            containersService.getHostInfo($scope.host).success(function(data) {
                controlsService.showModal({
                    title: "Host Info",
                    template: data,
                    size: "lg"
                });
            });
        };

        $scope.showImages = function() {
            // Retrieve the list of images.
            containersService.getImagesList($scope.host).success(function(data) {
                controlsService.showModal({
                    title: "Images List",
                    template: data,
                    size: "lg"
                });
            });
        };

        init();
    }

})();
