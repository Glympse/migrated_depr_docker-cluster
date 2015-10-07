(function() {
    'use strict';

    angular.module('app.api.docker').

    service('containersService', function ($http) {
        function getBaseUrl(host) {
            var baseUrl
                = host.docker.protocol + "://"
                + host.network.private_ip + ":"
                + host.docker.port + "/";
            return baseUrl;
        };

        return {
            /**
             * Misc
             */

            getHostInfo: function(host) {
                var url
                    = getBaseUrl(host)
                    + "info";
                return $http.get(url);
            },

            /**
             * Images
             */

            getImagesList: function(host) {
                var url
                    = getBaseUrl(host)
                    + "images/json?all=true";
                return $http.get(url);
            },

            createImage: function(host, fromImage, xRegistryAuth) {
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
            },

            /**
             * Containers
             */

            getList: function(host) {
                var url
                    = getBaseUrl(host)
                    + "containers/json?all=true";
                return $http.get(url);
            },

            getContainerLogs: function(host, container) {
                var url
                    = getBaseUrl(host)
                    + "containers/" + container.Id
                    + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&tail=100";
                return $http.get(url);
            },

            getContainerInfo: function(host, container) {
                var url
                    = getBaseUrl(host)
                    + "containers/" + container.Id
                    + "/json";
                return $http.get(url);
            },

            createContainer: function(host, name, params) {
                var url
                    = getBaseUrl(host)
                    + "containers/create"
                    + "?name=" + name;
                return $http.post(url, params);
            },

            startContainer: function(host, container) {
                var url
                    = getBaseUrl(host)
                    + "containers/" + container.Id
                    + "/start";
                return $http.post(url);
            },

            stopContainer: function(host, container) {
                var url
                    = getBaseUrl(host)
                    + "containers/" + container.Id
                    + "/stop";
                return $http.post(url);
            },

            killContainer: function(host, container) {
                var url
                    = getBaseUrl(host)
                    + "containers/" + container.Id
                    + "/kill";
                return $http.post(url);
            },

            restartContainer: function(host, container) {
                var url
                    = getBaseUrl(host)
                    + "containers/" + container.Id
                    + "/restart";
                return $http.post(url);
            },

            removeContainer: function(host, container, force) {
                var url
                    = getBaseUrl(host)
                    + "containers/" + container.Id
                    + "?force=" + force;
                return $http.delete(url);
            }
        };
    });

})();
