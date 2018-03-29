(function(){
    'use strict';

    angular.module('department').controller('DepartmentController',  function($scope, DepartmentService, Notification){

        $scope.entries = DepartmentService.getAll().query();

        $scope.edit = function(e){

            DepartmentService.update($scope.department).$promise.then(function(){
                Notification.success('Abteilung erfolgreich bearbeitet');
            },function(error){
                Notification.error('Fehler aufgetreten');
            });
        }

        $scope.addNew = function(department){

            DepartmentService.add(department).$promise.then(function(){
                Notification.success('Abteilung erfolgreich angelegt');
            },function(error){

                console.log(error);
                Notification.error('Fehler aufgetreten');
            });
        }
    });
})();