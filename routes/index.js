var express = require('express');
var router = express.Router();

var connections = require('../lib/connections.js');
var Items = connections.Items;

/* GET home page */
router.get('/', function (req, res) {
    Items.find().exec(function (err, items) {
        if (err) {
            res.locals.items = [];
        } else {
            res.locals.items = items;
        }
        res.render('index');
    });
    
});

module.exports = router;
