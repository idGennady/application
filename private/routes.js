var controllers = require('./controllers');
var path = require('path');

exports.routes = function(app){

    app.get('/', function(req, res) {
        res.sendFile(path.resolve(__dirname + './../public/index.html'));
    });

    app.get('/api/fruits', function(req, res) {
        // check ajax request
        if(req.headers.accept.indexOf('application/json') > -1 ){
            controllers.getAllFruits(req, res);
        } else { res.redirect('/') }
    });

    app.post('/api/fruits/:operation', function(req, res) {

        // check ajax request
        if(req.headers.accept.indexOf('application/json') > -1 ){
            switch (req.params.operation){
                case 'add'    : controllers.addFruit(req, res); break;
                case 'remove' : controllers.removeFruit(req, res); break;
                case 'edit'   : controllers.editFruit(req, res); break;

                default: res.status(404).send() ;break;
            }
        } else { res.redirect('/') }

    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });

};