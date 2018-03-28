(function() {
    'use strict';

    angular.module('menue', [
        'ui.router',
        'user'
    ]).run(function($rootScope){
        $rootScope.lastUpdated = new Date();
    });
})();
