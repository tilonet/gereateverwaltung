(function(){
    'use strict';

    angular.module('device').controller('DeviceController',  function($scope, DeviceService){

        $scope.entries = DeviceService.getAll();

    });
})();