
var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');

var connections = require('../lib/connections.js');
var Items = connections.Items;


router.get('/items/', auth, function (req, res, next) {
    Items.find(function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

router.post('/items/', auth, function (req, res, next) {
    var item = new Items();

    item.title = req.body.title;
    item.price = Number(req.body.price);
    item.description = req.body.description;

    item.save(function (err) {
        if (err) return next(err);

        // TODO: add upload file

        res.json(item);
    });
});

router.get('/items/:id', auth, function (req, res, next) {
    Items.findById(req.params.id, function (err, item) {
        if (err) next(err);
        res.json(item);
    });
});

router.put('/items/:id', auth, function (req, res, next) {
    Items.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        item.title = req.body.title;
        item.price = Number(req.body.price);
        item.description = req.body.description;

        item.save(function (err) {
            if (err) return next(err);
            res.json(item);
        });
    });
})

router.delete('/items/:id', auth, function (req, res, next) {
    Items.deleteOne({ _id: req.params.id }, function (err, item) {
        if (err) return next(err);
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;