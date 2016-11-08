(function(){
    'use strict';

    angular.module('fruitsSettings').
    component('fruitsSettings', {
        templateUrl : 'application/templates/fruits-settings.template.html',
        controller  : ['FruitService', '$location', '$scope',
            function FruitsController(FruitService, $location, $scope){

                var self = this;

                // all variables
                self.newFruit           = "";
                self.newDescription     = "";
                self.newCalorie         = "";
                self.limitFruit         = 5;
                self.limitPages         = 3;
                self.allPages           = [];
                self.removeFruitClone   = "";
                self.message            = "";
                self.oldFruit           = "";
                self.pagination         = false;
                self.openModal          = false;
                self.confirmationRemove = false;
                self.modalRemove        = false;
                self.edit               = false;
                self.currentPage        = 0;


                // ajax query get all fruits
                getAllFruit();

                // open modal window for add or edit fruit
                self.openModalAdd = function(){
                    if(!self.openModal){
                        self.newFruit = "";
                        self.newDescription = "";
                        self.newCalorie = "";
                        self.openModal = !self.openModal;
                    }
                };

                // close modal window for add or edit fruit
                self.closeModalAdd = function(){
                    if(self.openModal){
                        self.openModal = !self.openModal;
                    }
                };

                // submit fruit on server
                self.submitAddFruit = function(){
                    // check validation variables
                    if(validate()){

                        var data = {};

                        // if add fruit
                        if(!self.edit) {

                            data = {
                                name        : self.newFruit,
                                description : self.newDescription,
                                calorie     : self.newCalorie
                            };

                            // post data in server
                            FruitService.addFruit.query(data).$promise.then(function (success) {
                                // open modal add message success and clear variables
                                self.openModal = !self.openModal;
                                self.message = "Продукт успешно добавлен";
                                self.newFruit = "";
                                self.newDescription = "";
                                self.newCalorie = "";
                            }, function (error) {
                                // open modal add message error and clear variables
                                self.openModal = !self.openModal;
                                self.message = "Произошла ошибка";
                                self.newFruit = "";
                                self.newDescription = "";
                                self.newCalorie = "";
                            });
                        } else { // if edit fruit

                            data = {
                                name        : self.newFruit,
                                description : self.newDescription,
                                calorie     : self.newCalorie,
                                id          : self.id
                            };

                            // post data in server
                            FruitService.editFruit.query(data).$promise.then(function (success) {
                                // open modal add message success and clear variables
                                self.openModal = !self.openModal;
                                self.message = "Продукт успешно изменен";
                                self.newFruit = "";
                                self.newDescription = "";
                                self.newCalorie = "";
                                self.oldFruit = "";
                                self.edit = !self.edit;
                            }, function (error) {
                                // open modal add message error and clear variables
                                self.openModal = !self.openModal;
                                self.message = "Произошла ошибка";
                                self.newFruit = "";
                                self.newDescription = "";
                                self.newCalorie = "";
                                self.oldFruit = "";
                                self.edit = !self.edit;
                            });
                        }
                    }
                };

                // check end open edit form
                self.openEditFruit = function (fruit) {
                    if(!self.openModal){
                        self.edit = !self.edit;
                        self.oldFruit = fruit.name;
                        self.newFruit = fruit.name;
                        self.newDescription = fruit.description;
                        self.newCalorie = fruit.calorie;
                        self.openModal = !self.openModal;
                        self.id = fruit.id;
                    }
                };

                // open confirmation modal for remove fruit
                self.removeFruit = function (fruit) {
                    if(!self.modalRemove){
                        self.removeFruitClone = fruit;
                        self.modalRemove = !self.modalRemove;
                    }
                };

                // if remove confirmation true
                self.removeFruitConfirmation = function (fruit) {

                    fruit = {
                        id : fruit
                    };
                    // post data in server
                    FruitService.removeFruit.query(fruit).$promise.then(function (success) {
                        // if success response in server
                        // reset some parameters and reload fruits
                        self.currentPage = 0;
                        self.pagination = false;
                        getAllFruit();
                        if(self.modalRemove){
                            self.modalRemove = !self.modalRemove;
                        }
                    }, function (error){
                        // if error response in server
                        $location.path('/error');
                    });
                };

                // if remove confirmation false
                self.closeModalRemove = function () {
                    if(self.modalRemove){
                        self.modalRemove = !self.modalRemove;
                    }
                };

                // reload fruits for ajax query
                self.reloadAllFruits = function () {
                    getAllFruit();
                    self.message = false;
                };

                // of the number do array
                self.allPagesFunc = function (count) {
                    return new Array(count);
                };

                // pagination click needed page
                self.goToPage = function (page) {

                    if(page == 1 || page < 1){
                        self.currentPage = 0;
                    }
                    if(page > 1){
                        self.currentPage = page - 1;
                    }

                    getAllFruit();
                };

                // pagination go to first page
                self.firstPage = function () {
                    self.currentPage = 0;
                    getAllFruit();
                };

                // pagination go to last page
                self.lastPage = function () {
                    self.currentPage = self.allPages - 1;
                    getAllFruit();
                };

                // validation variables
                function validate(){
                    var error = [];
                    clearBorder();

                    if(!self.newFruit.length){
                        error.push(document.querySelector('input[name=fruit]'));
                    }
                    if(!self.newDescription.length){
                        error.push(document.querySelector('textarea[name=description]'));
                    }
                    if(!self.newCalorie.length){
                        error.push(document.querySelector('input[name=calorie]'));
                    }

                    if(error.length){
                        angular.forEach(error, function(value){
                            value.style.border = '2px solid red';
                        });
                        return false;
                    } else { return true; }
                }

                // clear border for add and edit form
                function clearBorder(){
                    document.querySelector('input[name=fruit]').style.border          = "2px solid #cccccc";
                    document.querySelector('textarea[name=description]').style.border = "2px solid #cccccc";
                    document.querySelector('input[name=calorie]').style.border        = "2px solid #cccccc";
                }

                // get all fruits for ajax query
                function getAllFruit() {
                    FruitService.getAllFruits.query().$promise.then(function (success) {
                        // if success response server set parameters
                        if(success.length > self.limitFruit){
                            if(!self.pagination){
                                self.pagination  = !self.pagination;
                            }
                            self.allPages    = Math.ceil(success.length / self.limitFruit);
                        }

                        var begin = self.currentPage * self.limitFruit;
                        self.fruits = success.splice(begin, begin + self.limitFruit);

                    }, function (error){
                        // if error response server
                        $location.path('/error');
                    });
                }

            }
        ]
    })

})();