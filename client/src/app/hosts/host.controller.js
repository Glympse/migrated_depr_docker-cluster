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

        $scope.createContainer = function() {

            var template = {
                "Name": "",
                // "Hostname": "",
                // "Domainname": "",
                "User": "",
                // "Memory": 0,
                // "MemorySwap": 0,
                // "CpuShares": 512,
                // "Cpuset": "0,1",
                "AttachStdin": false,
                "AttachStdout": true,
                "AttachStderr": true,
                "Tty": false,
                "OpenStdin": false,
                "StdinOnce": false,
                "Env": [],
                // "Cmd": [
                //     "date"
                // ],
                "Entrypoint": "",
                "Image": "google/cadvisor:latest",
                "Volumes": {
                //    "/tmp": {}
                },
                "WorkingDir": "",
                "NetworkDisabled": false,
                // "MacAddress": "12:34:56:78:9a:bc",
                // "ExposedPorts": {
                //     "22/tcp": {}
                // },
                // "SecurityOpts": [""],
                "HostConfig": {
                    "Binds": [
                        "/:/rootfs:ro",
                        "/var/run:/var/run:rw",
                        "/sys:/sys:ro",
                        "/var/lib/docker/:/var/lib/docker:ro"
                    ],
                    "Links": [
                    //    "redis3:redis"
                    ],
                    // "LxcConf": {"lxc.utsname":"docker"},
                    "PortBindings": {
                        "8080/tcp": [{ "HostPort": "8080" }]
                    },
                    "PublishAllPorts": false,
                    "Privileged": false,
                    "ReadonlyRootfs": false,
                    // "Dns": ["8.8.8.8"],
                    // "DnsSearch": [""],
                    // "ExtraHosts": null,
                    // "VolumesFrom": ["parent", "other:ro"],
                    // "CapAdd": ["NET_ADMIN"],
                    // "CapDrop": ["MKNOD"],
                    "RestartPolicy": {
                        "Name": "always",
                        // "MaximumRetryCount": 0
                    },
                    "NetworkMode": "bridge",
                    // "Devices": []
                }
            };

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

                // NEXT: Ask for/generate real name.
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
