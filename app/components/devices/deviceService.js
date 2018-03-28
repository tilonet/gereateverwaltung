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
                        department: ((item.departmentId !== null) ? $filter('filter')(departments, {id: item.departmentId}, true)[0].name : 'none'),
                        user: ((item.assignedUserId !== null) ? $filter('filter')(users, {id: item.assignedUserId}, true)[0].nameLast : 'none'),
                        admin: ((item.deviceAdministratorId !== null) ? $filter('filter')(users, {id: item.deviceAdministratorId}, true)[0].nameLast : 'none')
                    });
                });
            });

            return resultArr
        }

        factory.getDevice = function(id) {
            return $resource('http://localhost:8080/device/'+id).get();
        }

        factory.update = function(user){
            return $resource('http://localhost:8080/device/:id', { id: '@_id' }, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            }).update({ id: user.id }, user);

        }

        factory.add = function(device) {

            return $resource('http://localhost:8080/device', {}, {
                save:{method: 'POST'}
            }).save(device)
        }

        factory.delete = function(deviceid) {

            return $resource('http://localhost:8080/device/:id', {id: '@id'}, {
                delete: {method: 'DELETE'}
            }).delete({ id: deviceid});
        }

        return factory;

    }]);
})();