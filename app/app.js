'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  $httpProvider.interceptors.push('timestampMarker');
}])
.factory('timestampMarker',["$rootScope", function($rootScope) {
  var timestampMarker = {
    request: function(config) {
      $rootScope.loading = true;
      config.requestTimestamp = new Date().getTime();
      console.log(config.requestTimestamp);
      return config;
    },
    response: function(response) {
     //$rootScope.loading = false;
      response.config.responseTimestamp = new Date().getTime();

     console.log(response.config.responseTimestamp);
     //   $rootScope.loading = false;

      return response;


    }

  };
  return timestampMarker;
}]);