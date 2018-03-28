(function() {
   'use strict';

    angular.module('user').factory('UserService', ['$resource','$q', '$filter', function($resource, $q, $filter) {

        var factory = {};

        factory.getAll = function() {

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
        }

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