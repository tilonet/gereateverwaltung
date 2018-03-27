(function(){
    'use strict';

    angular.module('user').controller('UserController',  function($scope, UserService, DepartmentService){

        $scope.entries = UserService.getAll();
        $scope.departments = DepartmentService.getAll();

        $scope.submit = function(e){

            UserService.update($scope.user);
        }
    });
})();