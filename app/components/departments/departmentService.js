(function() {
    'use strict';

    angular.module('department').factory('DepartmentService', ['$resource', function($resource) {

        var factory = {};

        factory.getAll = function(){
            return $resource('http://localhost:8080/department').query();
        }

        return factory;


    }]);
})();