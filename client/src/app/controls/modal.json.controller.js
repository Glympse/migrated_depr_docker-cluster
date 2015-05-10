(function() {
    'use strict';

    angular
        .module('app.controls')
        .controller('JsonController', JsonController);

    function JsonController($scope, $modalInstance, title, content) {
        $scope.title = title;

        $scope.aceLoaded = function(editor) {
            $scope.editor = editor;
            $scope.editor.$blockScrolling = Infinity;
            // $scope.editor.setReadOnly(true);
            $scope.editor.setValue(content);
            $scope.editor.session.selection.clearSelection();
        };

        $scope.ok = function() {
            $modalInstance.close($scope.editor.getValue());
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }

})();
