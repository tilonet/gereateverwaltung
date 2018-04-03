(function() {
    'use strict';

    angular.module('device').factory('DeviceService', ['$resource', '$filter', '$q', '$rootScope', function($resource, $filter, $q, $rootScope) {

        var factory = {};
        var users = $resource('http://localhost:8080/user').query();
        var departments = $resource('http://localhost:8080/department').query();

        factory.getAll = function () {

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/device', {}, {
                query: {
                    method: 'GET',
                    isArray: true, // <- not returning an array
                    transformResponse: function (data) {

                        var items = angular.fromJson(data);

                        angular.forEach(items, function (item, idx) {

                            item.admin = "none";
                            item.department = "none";
                            item.user = "none";

                            var deviceadmin = $filter('filter')(users, {id: item.deviceAdministratorId}, true);
                            var deviceuser = $filter('filter')(users, {id: item.assignedUserId}, true);
                            var devicedepartment = $filter('filter')(departments, {id: item.departmentId}, true);

                            if (deviceadmin.length > 0){
                                item.admin = deviceadmin[0].nameFirst + " "+deviceadmin[0].nameLast;
                            }

                            if (typeof deviceuser[0] !== 'undefined') {
                                item.user = deviceuser[0].nameFirst + " "+deviceuser[0].nameLast;;
                            }

                            if(typeof devicedepartment[0] !== 'undefined'){
                                item.department = devicedepartment[0].name;
                            }
                        });

                        return items;
                    }
                }
            });
        }

        factory.getDevice = function(id) {

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/device/'+id).get();
        }

        factory.update = function(user){

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/device/:id', { id: '@_id' }, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            }).update({ id: user.id }, user);
        }

        factory.add = function(device) {

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/device', {}, {
                save:{method: 'POST'}
            }).save(device)
        }

        factory.delete = function(deviceid) {

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/device/:id', {id: '@id'}, {
                delete: {method: 'DELETE'}
            }).delete({ id: deviceid});
        }

        return factory;

    }]);
})();