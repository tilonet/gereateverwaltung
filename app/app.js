(function(){
  'use strict';

  var appGereateVerwaltung = angular.module('appGereateVerwaltung', [
      'ui.router',
      'ngResource',
      'menue',
      'user',
      'device',
      'department'
  ]);

  appGereateVerwaltung.config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home',{
                url: '/home',
                views: {
                    'menue': {
                        templateUrl: 'components/menue/menue.html',
                    },
                    'content': {
                        template: 'HOME'
                    }
                }
            })
    });

})();
