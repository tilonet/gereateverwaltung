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

                            $scope.user = UserService.getUser($stateParams.id);
                            $scope.departments = DepartmentService.getAll();



                        }
                    }
                }
            });
    });
})();