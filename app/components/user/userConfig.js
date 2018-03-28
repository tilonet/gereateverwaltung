(function(){
    'use strict';

    angular.module('user').config(function($stateProvider){
        $stateProvider
            .state('editUser',{
                name: 'editUser',
                url: '/editUser/:id',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/user/userUpdateForm.html',
                        controller: function($stateParams, UserService, $scope, DepartmentService){

                            $scope.departments = DepartmentService.getAll();

                            if($stateParams.id !== 'undefined'){
                                $scope.user = UserService.getUser($stateParams.id);
                                $scope.userexist = true;
                            }
                            else{
                                $scope.userexist = false;
                                $scope.user = [];
                            }
                        }
                    }
                }
            });

        $stateProvider
            .state('addUser',{
                name: 'addUser',
                url: '/addUser',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/user/userUpdateForm.html',
                        controller: function($scope, DepartmentService){

                            $scope.departments = DepartmentService.getAll();
                            $scope.userexist = false;
                            $scope.user = {};

                        }
                    }
                }
            });

        $stateProvider
            .state('deleteUser',{
                name: 'deleteUser',
                url: '/deleteUser/:id',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/user/user.html',
                        controller: function($stateParams, UserService, Notification, $state){

                            UserService.delete($stateParams.id).$promise.then(function(){
                                Notification.success('Benutzer erfolgreich gelöscht');
                                $state.go('user');
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