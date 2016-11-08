var fs = require('fs');

exports.getAllFruits = function (callback) {
    fs.readFile('./private/_fruits.json', function (err, data) {
        if(err) { callback(false) }
        else { callback(JSON.parse(data)) }
    });
};

exports.addFruit = function (data, callback) {
    fs.writeFile('./private/_fruits.json', JSON.stringify(data), 'utf8',  function (err) {
        if(err) { callback(false) }
        else { callback(true) }
    });
};