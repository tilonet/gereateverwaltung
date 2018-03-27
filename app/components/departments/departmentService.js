(function() {
    'use strict';

    angular.module('department').factory('DepartmentService', ['$resource', function($resource) {

        var factory = {};

        factory.getAll = function(){
            console.log( $resource('http://localhost:8080/department').query());
            return $resource('http://localhost:8080/department').query();
        }


        return factory;


    }]);
})();