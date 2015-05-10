(function() {
    'use strict';

    angular.module('app.sync').

    controller('SyncController', function($rootScope, $scope, syncService) {

        function clear() {
            var template = [{
                "id": 1,
                "title": "/",
                "nodes": [],
            }];

            $scope.data = angular.copy(template);
            $scope.current = angular.copy(template);
            if ( $scope.editor ) {
                $scope.editor.setValue("");
            }
        }

        function init() {
            $scope.base = "";
            clear();

            if ( $rootScope.currentTool["sync"] ) {
                $scope.base
                    = "http://"
                    + $rootScope.currentTool.sync.host.network.public_ip + ":"
                    + $rootScope.currentTool.sync.port.PublicPort;

                $scope.connect();
            }
        }

        $scope.aceLoaded = function(editor) {
            $scope.editor = editor;
            $scope.editor.$blockScrolling = Infinity;
        }

        $scope.connect = function() {
            clear();
            syncService.getList($scope.base).success(function(data) {
                $scope.data[0].nodes = [];
                angular.forEach(data.body, function(value, key) {
                    $scope.data[0].nodes.push({
                        "id": value.name,
                        "title": value.name
                    });
                });
            });
        };

        $scope.selected = function(node) {
            $scope.current = [ node ];
            syncService.getItem($scope.base, node.id).success(function(data) {
                $scope.editor.setValue(data);
                $scope.editor.session.selection.clearSelection();
            });
        };

        $scope.update = function() {
            var node = $scope.current[0];
            var data = $scope.editor.getValue(data);
            syncService.updateItem($scope.base, node.id, data).success(function(data) {
            });
        };

        init();
    });

})();
