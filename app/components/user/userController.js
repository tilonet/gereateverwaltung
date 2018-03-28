(function(){
    'use strict';

    angular.module('user').controller('UserController',  function($scope, UserService, DepartmentService, Notification){

        $scope.entries = UserService.getAll();
        $scope.departments = DepartmentService.getAll();

        $scope.edit = function(e){

            UserService.update($scope.user).$promise.then(function(){
                Notification.success('Benutzer erfolgreich bearbeitet');
            },function(error){
                Notification.error('Fehler aufgetreten');
            });
        }

        $scope.addNew = function(user){

            UserService.add(user).$promise.then(function(){
                Notification.success('Benutzer erfolgreich angelegt');
            },function(error){

                console.log(error);
                Notification.error('Fehler aufgetreten');
            });

        }

    });
})();