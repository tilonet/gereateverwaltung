(function(){
    'use strict';

    angular.module('department').config(function($stateProvider){
        $stateProvider
            .state('editDepartment',{
                name: 'editDepartment',
                url: '/editDepartment/:id',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/departments/departmentUpdateForm.html',
                        controller: function($stateParams, $scope, DepartmentService){

                            $scope.departments = DepartmentService.getAll();

                            if($stateParams.id !== 'undefined'){
                                $scope.department = DepartmentService.getDepartment($stateParams.id);
                                $scope.departmentexist = true;
                            }
                            else{
                                $scope.departmentexist = false;
                                $scope.department = {};
                            }
                        }
                    }
                }
            });

        $stateProvider
            .state('addDepartment',{
                name: 'addDepartment',
                url: '/addDepartment',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/departments/departmentUpdateForm.html',
                        controller: function($scope){

                            $scope.departmentexist = false;
                            $scope.department = {};
                        }
                    }
                }
            });

        $stateProvider
            .state('deleteDepartment',{
                name: 'deleteDepartment',
                url: '/deleteDepartment/:id',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/departments/department.html',
                        controller: function($stateParams, DepartmentService, Notification, $state){

                            DepartmentService.delete($stateParams.id).$promise.then(function(){
                                Notification.success('Abteilung erfolgreich gelöscht');
                                $state.go('departments');
                            },function(error){

                                console.log(error);
                                Notification.error('Fehler aufgetreten');
                            });
                        }
                    }
                }
            });
    });
})();