(function(){
  'use strict';

  var appGereateVerwaltung = angular.module('appGereateVerwaltung', [
      'ui.router',
      'ngResource',
      'menue',
      'user',
      'device',
      'department',
      'ui-notification'
  ]);

  appGereateVerwaltung.config(function($stateProvider, $urlRouterProvider, NotificationProvider){

      $urlRouterProvider.otherwise('/home');

      NotificationProvider.setOptions({
          delay: 10000,
          startTop: 20,
          startRight: 10,
          verticalSpacing: 20,
          horizontalSpacing: 20,
          positionX: 'left',
          positionY: 'bottom'
      });

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
