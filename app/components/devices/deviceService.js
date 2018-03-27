(function() {
    'use strict';

    angular.module('device').factory('DeviceService', ['$resource', '$filter', '$q', function($resource, $filter, $q) {

        var factory = {};

        factory.getAll = function(){

            var devices =  $resource('http://localhost:8080/device').query().$promise;
            var users = $resource('http://localhost:8080/user').query().$promise;
            var departments = $resource('http://localhost:8080/department').query().$promise;
            var resultArr = [];

            $q.all([users, devices, departments]).then(function(result) {

                var departments = result[2];
                var devices = result[1];
                var users = result[0];


                devices.map(function(item){

                    resultArr.push({
                        id: item.id,
                        name: item.name,
                        deviceStatus: item.deviceStatus,
                        department: ((item.departmentId !== 0) ? $filter('filter')(departments, {id: item.departmentId}, true)[0].name : 'none'),
                        user: ((item.assignedUserId !== 0) ? $filter('filter')(users, {id: item.assignedUserId}, true)[0].nameLast : 'none'),
                        admin: ((item.deviceAdministratorId !== 0) ? $filter('filter')(users, {id: item.deviceAdministratorId}, true)[0].nameLast : 'none')
                    });
                });
            });
            return resultArr
        }
        return factory;

    }]);
})();