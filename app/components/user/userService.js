(function() {
   'use strict';

    angular.module('user').factory('UserService', ['$resource', function($resource) {

        var factory = {};

        factory.getAll = function(){
            return $resource('http://localhost:8080/user').query();
        }

        return factory;


    }]);
})();