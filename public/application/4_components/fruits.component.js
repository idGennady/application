(function(){
    'use strict';

    angular.module('fruits').
        component('fruits', {
            templateUrl : 'application/templates/fruits.template.html',
            controller  : ['FruitService', '$location',

                function FruitsController(FruitService, $location){

                    var self = this;

                    // all variables
                    self.fruit        = "";
                    self.calorie      = "";
                    self.fruitInfo    = "";
                    self.calorieInfo  = "";
                    self.calorieSum   = "";
                    self.information  = false;
                    self.error        = false;
                    self.errorMessage = "";
                    self.selectFruits = [];
                    self.allCalories  = 0;
                    self.fruits       = [];


                    // ajax query get all fruits
                    FruitService.getAllFruits.query().$promise.then(function (success) {
                        self.fruits = success;
                    }, function (error){
                        $location.path('/error');
                    });


                    // get information after click button "Добавить"
                    self.getInformation = function(){

                        // check variables
                        if(self.calorie && self.fruit && angular.isNumber(Number(self.calorie))){
                            // if variables true
                            // find and push needed fruit
                            angular.forEach(self.fruits, function(value){
                                if(value.name === self.fruit){
                                    self.selectFruits.push({
                                        fruit : self.fruit,
                                        gram  : self.calorie,
                                        calorie : (self.calorie * value.calorie) / 100
                                    });
                                    self.allCalories += (self.calorie * value.calorie) / 100;
                                    return;
                                }
                            });

                            // clear variable and open information block
                            self.fruit        = null;
                            self.calorie      = null;
                            self.information  = true;
                        } else {
                            // if variables false
                            // add error message, clear variables and open modal error
                            self.errorMessage = "Заполните все поля!";
                            self.error        = true;
                            self.fruit        = null;
                            self.calorie      = null;
                        }
                    };

                    // close modal window
                    self.close = function(){
                        if(self.error){
                            self.errorMessage = "";
                            self.error        = !self.error;
                        }
                    };


                    // remove all items for information block
                    self.clearSelectFruits = function(){
                        self.selectFruits = [];
                        self.information  = false;
                        self.allCalories  = 0;
                    };

                    // remove select item on information block
                    self.removeFruit = function(fruit){
                        self.allCalories -= fruit.calorie;
                        angular.forEach(self.selectFruits, function(value, key){
                            if(value.$$hashKey === fruit.$$hashKey){
                                self.selectFruits.splice(key, 1);
                                return;
                            }
                        });

                        // if not have element close information block
                        if(!self.selectFruits.length){
                            self.information = false;
                        }
                    };


                }
            ]
        })

})();