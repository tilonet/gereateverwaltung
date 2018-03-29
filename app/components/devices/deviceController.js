(function(){
    'use strict';

    angular.module('device').controller('DeviceController',  function($scope, DeviceService, UserService, Notification){

        $scope.entries = DeviceService.getAll().query();
        $scope.deviceStatus = [{key: 'IN_POSSESSION', trans:'im Besitzt'},
                                {key: 'LOANED', trans: 'Verliehen'},
                                {key: 'FREE', trans: 'Verfügbar' }];

        $scope.adminset = false;


        $scope.edit = function(e){

            if( $scope.adminset === false) $scope.device.deviceAdministratorId = null;

            DeviceService.update($scope.device).$promise.then(function(){
                Notification.success('Gerät erfolgreich bearbeitet');
            },function(error){
                Notification.error('Fehler aufgetreten');
            });
        }

        $scope.addNew = function(device){

            if( $scope.adminset === false) device.deviceAdministratorId = null;

            DeviceService.add(device).$promise.then(function(){
                Notification.success('Gerät erfolgreich angelegt');
            },function(error){

                console.log(error);
                Notification.error('Fehler aufgetreten');
            });
        }

    });
})();