var model = require('./models');

exports.getAllFruits = function (req, res) {

    model.getAllFruits(function (data) {
        if(data){
            res.status(200).send(data);
        } else { res.status(404).send() }
    });

};

exports.addFruit = function (req, res) {

    model.getAllFruits(function (dataAll) {
        if(dataAll){

            var obj = {
                id          : makeid(),
                name        : req.body.name,
                description : req.body.description,
                calorie     : req.body.calorie
            };

            dataAll.push(obj);

            model.addFruit(dataAll, function (data) {
                if(data){
                    res.status(200).send()
                } else { res.status(404).send() }
            })
        } else { res.status(404).send() }
    })

};

exports.removeFruit = function (req, res) {

    model.getAllFruits(function (dataAll) {
        if(dataAll){
            dataAll.forEach(function (value, key) {
                if(value.id === req.body.id){
                    dataAll.splice(key, 1);
                }
            });

            model.addFruit(dataAll, function (data) {
                if(data){
                    res.status(200).send()
                } else { res.status(404).send() }
            });

        } else { res.status(404).send() }
    });

};

exports.editFruit = function (req, res) {

    model.getAllFruits(function (dataAll) {
        if(dataAll){

            dataAll.forEach(function (value, key) {
                if(value.id === req.body.id){
                    dataAll.splice(key, 1);
                }
            });

            var obj = {
                id          : makeid(),
                name        : req.body.name,
                description : req.body.description,
                calorie     : req.body.calorie
            };

            dataAll.push(obj);

            model.addFruit(dataAll, function (data) {
                if(data){
                    res.status(200).send()
                } else { res.status(404).send() }
            });

        } else { res.status(404).send() }
    });

};

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}