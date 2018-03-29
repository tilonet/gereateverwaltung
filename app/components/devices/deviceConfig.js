(function(){
    'use strict';

    angular.module('device').config(function($stateProvider){
        $stateProvider
            .state('editDevice',{
                name: 'editDevice',
                url: '/editDevice/:id',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/devices/deviceUpdateForm.html',
                        controller: function($stateParams, UserService, $scope, DepartmentService, DeviceService){

                            $scope.departments = DepartmentService.getAll().query();
                            $scope.users = UserService.getAll().query();

                            if($stateParams.id !== 'undefined'){
                                $scope.device = DeviceService.getDevice($stateParams.id);
                                $scope.deviceexist = true;
                            }
                            else{
                                $scope.deviceexist = false;
                                $scope.device = {};
                            }
                        }
                    }
                }
            });

        $stateProvider
            .state('addDevice',{
                name: 'addDevice',
                url: '/addDevice',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/devices/deviceUpdateForm.html',
                        controller: function($scope, DepartmentService, UserService){

                            $scope.departments = DepartmentService.getAll();
                            $scope.users = UserService.getAll();
                            $scope.deviceexist = false;
                            $scope.device = {};
                        }
                    }
                }
            });

        $stateProvider
            .state('deleteDevice',{
                name: 'deleteDevice',
                url: '/deleteDevice/:id',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        templateUrl: 'components/devices/device.html',
                        controller: function($stateParams, DeviceService, Notification, $state){

                            DeviceService.delete($stateParams.id).$promise.then(function(){
                                Notification.success('Gerät erfolgreich gelöscht');
                                $state.go('devices');
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