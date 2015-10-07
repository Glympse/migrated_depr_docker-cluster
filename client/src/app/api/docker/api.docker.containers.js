(function() {
    'use strict';

    angular.module('app.api.docker')

    .service('containersService', function ($http) {
        var service = {
            getList: getList,
            getContainerLogs: getContainerLogs,
            getContainerInfo: getContainerInfo,
            getHostInfo: getHostInfo,
            getImagesList: getImagesList,
            createImage: createImage,
            createContainer: createContainer,
            startContainer: startContainer,
            stopContainer: stopContainer,
            killContainer: killContainer,
            restartContainer: restartContainer,
            removeContainer: removeContainer
        };
        return service;

        function getBaseUrl(host) {
            var baseUrl
                = host.docker.protocol + "://"
                + host.network.private_ip + ":"
                + host.docker.port + "/";
            return baseUrl;
        }

        function getList(host) {
            var url
                = getBaseUrl(host)
                + "containers/json?all=true";
            return $http.get(url);
        }

        function getContainerLogs(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&tail=100";
            return $http.get(url);
        }

        function getContainerInfo(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/json";
            return $http.get(url);
        }

        function createContainer(host, name, params) {
            var url
                = getBaseUrl(host)
                + "containers/create"
                + "?name=" + name;
            return $http.post(url, params);
        }

        function startContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/start";
            return $http.post(url);
        }

        function stopContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/stop";
            return $http.post(url);
        }

        function killContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/kill";
            return $http.post(url);
        }

        function restartContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/restart";
            return $http.post(url);
        }

        function removeContainer(host, container, force) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "?force=" + force;
            return $http.delete(url);
        }

        // NEXT: Move to app.api.docker.generalService
        function getHostInfo(host) {
            var url
                = getBaseUrl(host)
                + "info";
            return $http.get(url);
        }

        // NEXT: Move to app.api.docker.imagesService
        function getImagesList(host) {
            var url
                = getBaseUrl(host)
                + "images/json?all=true";
            return $http.get(url);
        }

        // NEXT: Move to app.api.docker.imagesService
        function createImage(host, fromImage, xRegistryAuth) {
            var url
                = getBaseUrl(host)
                + "images/create?fromImage=" + fromImage;
            var req = {
                method: "POST",
                url: url,
                headers: {},
                transformResponse: function(value) {
                    var json = "[" + value.trim().replace(/\n/g, ",").replace(/}{/g, "},{") + "]";
                    var result = JSON.parse(json);
                    return result;
                }
            };
            if ( xRegistryAuth ) {
                req.headers["X-Registry-Auth"] = xRegistryAuth;
            }
            return $http(req);
        }
    });

})();
