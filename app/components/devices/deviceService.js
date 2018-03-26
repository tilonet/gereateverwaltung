(function() {
    'use strict';

    angular.module('device').factory('DeviceService', ['$resource', function($resource) {

        var factory = {};

        factory.getAll = function(){
            return $resource('http://localhost:8080/device').query();
        }

        return factory;


    }]);
})();