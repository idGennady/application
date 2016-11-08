(function(){
    'use strict';

    angular.module('fruits')
        .factory('FruitService', [ '$resource',
            function($resource){

                return {
                    getAllFruits: $resource('/api/fruits', {}, {
                        query: { method: 'GET', params: {}, isArray: true }
                    }),
                    addFruit: $resource('/api/fruits/add', {}, {
                        query: { method: 'POST', params: {}, isArray: true }
                    }),
                    removeFruit: $resource('/api/fruits/remove', {}, {
                        query: { method: 'POST', params: {}, isArray: true }
                    }),
                    editFruit: $resource('/api/fruits/edit', {}, {
                        query: { method: 'POST', params: {}, isArray: true }
                    })
                };

            }
        ])
})();