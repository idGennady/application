(function(){
    'use strict';

    angular.module('application')
        .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {

                //$locationProvider.hashPrefix('!');

                $routeProvider.
                when('/', {
                    template: '<homepage></homepage>'
                }).
                when('/fruits', {
                    template: '<fruits></fruits>'
                }).
                when('/fruits/settings', {
                    template: '<fruits-settings></fruits-settings>'
                }).
                when('/error', {
                    template: '<error></error>'
                }).
                otherwise('/');

                $locationProvider.html5Mode(true);

            }
        ]);
})();