(function() {
    'use strict';

    angular.module('app.controls').

    service('controlsService', function ($modal) {
        return {
            showModal: function(config) {
                var editorConfig = {
                    templateUrl: config.templateUrl ? config.templateUrl : '/app/controls/modal.json.html',
                    controller: config.controller ? config.controller : 'JsonController',
                    size: config.size ? config.size : "m",
                    resolve: {
                        title: function() {
                            return config.title ? config.title : "Config";
                        },
                        content: function () {
                            return angular.toJson(config.template, true);
                        }
                    }
                };

                var editor = $modal.open(editorConfig);
                editor.result.then(function(data) {
                    if ( config.ok ) {
                        var blob = angular.fromJson(data);
                        config.ok(blob);
                    }
                }, function () {});
            }
        };
    });

})();
