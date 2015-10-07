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
                            if ( ( typeof config.template ) == "string" ) {
                                return config.template;
                            } else {
                                return JSON.stringify(config.template, null, "  ");
                            }
                        }
                    }
                };

                var editor = $modal.open(editorConfig);
                editor.result.then(function(data) {
                    if ( config.ok ) {
                        var blob = JSON.parse(data);
                        config.ok(blob);
                    }
                }, function () {});
            }
        };
    });

})();
