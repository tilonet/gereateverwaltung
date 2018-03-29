(function() {
   'use strict';

    angular.module('user').factory('UserService', ['$resource','$q', '$filter', 'DeviceService', 'DepartmentService', function($resource, $q, $filter, DeviceService, DepartmentService) {

        var factory = {};
        var devices  = DeviceService.getAll().query();
        var departments = DepartmentService.getAll().query();

        factory.getAll = function() {

            return $resource('http://localhost:8080/user', {id: '@id'}, {
                query: {
                    method: 'GET',
                    isArray: true, // <- not returning an array
                    transformResponse: function (data) {

                        var items = angular.fromJson(data);

                        angular.forEach(items, function (item, idx) {

                            item.userdevices = [];
                            item.department = "";

                            var admindevice = $filter('filter')(devices, {deviceAdministratorId: item.id}, true);
                            var userdevice = $filter('filter')(devices, {assignedUserId: item.id}, true);
                            var userdepartment = $filter('filter')(departments, {id: item.departmentId}, true);

                            if (typeof admindevice[0] !== 'undefined') {
                                item.userdevices.push({device: admindevice[0].name, typ: "Administrator"});
                            }

                            if (typeof userdevice[0] !== 'undefined') {
                                item.userdevices.push({device: userdevice[0].name, typ: "Benutzer"});
                            }

                            if(typeof userdepartment[0] !== 'undefined'){
                                item.department = userdepartment[0].name;
                            }

                        });

                        return items;
                    }
                }
            });
        }




    /*    factory.getAll = function() {

            var users = $resource('http://localhost:8080/user').query().$promise;
            var departments = $resource('http://localhost:8080/department').query().$promise;

            var resultArr = [];

            $q.all([users, departments]).then(function(result){
                var departments = result[1];
                var users = result[0];

                users.map(function(item){

                    resultArr.push({
                        id:         item.id,
                        nameFirst:  item.nameFirst,
                        nameLast:   item.nameLast,
                        email:      item.email,
                        department: $filter('filter')(departments, {id: item.departmentId}, true)[0].name,
                        departmentId: item.departmentId
                    });
                });

            });
            return resultArr;
        }*/

        factory.getUser = function(id) {
            return $resource('http://localhost:8080/user/'+id).get();
        }

        factory.update = function(user){
            return $resource('http://localhost:8080/user/:id', { id: '@_id' }, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            }).update({ id: user.id }, user);

        }

        factory.add = function(user) {

            return $resource('http://localhost:8080/user', {}, {
                save:{method: 'POST'}
            }).save(user)
        }

        factory.delete = function(userid) {

            return $resource('http://localhost:8080/user/:id', {id: '@id'}, {
                delete: {method: 'DELETE'}
            }).delete({ id: userid});
        }

        return factory;
    }]);
})();