(function(){
    'use strict';

    angular.module('user').controller('UserController',  function($scope, UserService){

        $scope.entries = UserService.getAll();

    });
})();