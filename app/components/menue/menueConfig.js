(function(){
    'use strict';

    angular.module('menue').config(function($stateProvider) {

        $stateProvider
            .state('user',{
                name: 'user',
                url: '/user',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/user/user.html',
                        controller: 'UserController'
                    }
                }
            });
        $stateProvider
            .state('departments',{
                name: 'departments',
                url: '/departments',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/departments/department.html',
                        controller: 'DepartmentController'
                    }
                }
            });
        $stateProvider
            .state('devices',{
                name: 'devices',
                url: '/devices',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/devices/device.html',
                        controller: 'DeviceController'
                    }
                }
            });
    });

})();