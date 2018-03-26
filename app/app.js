(function(){
  'use strict';

  var appGereateVerwaltung = angular.module('appGereateVerwaltung', ['ui.router', 'content', 'menue']);

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
                        templateUrl: 'components/content/content.html'
                    }
                }
            })
    });

})();
