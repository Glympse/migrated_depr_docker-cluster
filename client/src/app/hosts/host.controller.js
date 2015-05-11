(function() {
    'use strict';

    angular
        .module('app.hosts')
        .controller('HostController', HostController);

    function HostController($scope, $modal, containersService) {
        function init() {
            $scope.containers = [];
            $scope.refresh();
        }

        $scope.createImage = function() {
            var template = {
                "fromImage": "",
            };

            var editor = $modal.open({
                templateUrl: '/app/controls/modal.json.html',
                controller: 'JsonController',
                size: "lg",
                resolve: {
                    title: function() {
                        return "Create an Image";
                    },
                    content: function () {
                        return angular.toJson(template, true);
                    }
                }
            });

            editor.result.then(function (params) {

                // Extract arguments
                var paramsBlob = angular.fromJson(params);
                var fromImage = paramsBlob["fromImage"];

                containersService.createImage($scope.host, fromImage).success(function(data) {
                    $scope.refresh();
                });

            }, function () {});

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
