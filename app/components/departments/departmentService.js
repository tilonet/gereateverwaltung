(function() {
    'use strict';

    angular.module('department').factory('DepartmentService', ['$resource', '$rootScope', function($resource, $rootScope) {

        var factory = {};

        factory.getAll = function(){

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/department');
        }

        factory.getDepartment = function(id) {

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/department/'+id).get();
        }

        factory.add = function(department) {

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/department', {}, {
                save:{method: 'POST'}
            }).save(department)
        }

        factory.delete = function(departmentid) {

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/department/:id', {id: '@id'}, {
                delete: {method: 'DELETE'}
            }).delete({ id: departmentid});
        }

        factory.update = function(department){

            $rootScope.lastUpdated = new Date();
            return $resource('http://localhost:8080/department/:id', { id: '@_id' }, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            }).update({ id: department.id }, department);
        }

        return factory;
    }]);
})();