(function() {
    'use strict';

    angular.module('department').factory('DepartmentService', ['$resource', function($resource) {

        var factory = {};

        factory.getAll = function(){
            return $resource('http://localhost:8080/department').query();
        }

        factory.getDepartment = function(id) {
            return $resource('http://localhost:8080/department/'+id).get();
        }

        factory.add = function(department) {

            return $resource('http://localhost:8080/department', {}, {
                save:{method: 'POST'}
            }).save(department)
        }

        factory.delete = function(departmentid) {

            return $resource('http://localhost:8080/department/:id', {id: '@id'}, {
                delete: {method: 'DELETE'}
            }).delete({ id: departmentid});
        }

        factory.update = function(department){
            return $resource('http://localhost:8080/department/:id', { id: '@_id' }, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            }).update({ id: department.id }, department);

        }

        return factory;
    }]);
})();