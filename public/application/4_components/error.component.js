(function(){
    'use strict';

    angular.module('error').
    component('error', {
        templateUrl : 'application/templates/error.template.html',
        controller  : function ErrorController(){
            var self = this;

            self.error = "Not found";
        }
    })

})();