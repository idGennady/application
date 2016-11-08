var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser')
    ;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// include routers
var routes = require('./private/routes');

routes.routes(app);

// run server
app.listen(3000, function (err) {
    err ? console.log('Error run server') : console.log('Server run on port 3000!');
});