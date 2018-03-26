(function(){
    'use strict';

    angular.module('menue').config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('user',{
                name: 'user',
                url: '/user',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        template: 'user'
                    }
                }
            });
        $stateProvider
            .state('departmends',{
                name: 'departmends',
                url: '/departmends',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        template: 'departmends'
                    }
                }
            });
        $stateProvider
            .state('devices',{
                name: 'devices',
                url: '/devices',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content@': {
                        template: 'devices'
                    }
                }
            });

    });

})();