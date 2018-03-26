(function(){
    'use strict';

    angular.module('department').controller('DepartmentController',  function($scope, DepartmentService){

        $scope.entries = DepartmentService.getAll();

    });
})();