
var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');
var path = require('path');
var existsFile = require('exists-file');
var randomstring = require('randomstring');

var connections = require('../lib/connections.js');
var Items = connections.Items;


router.get('/items/', auth, function (req, res, next) {
    Items.find(function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

var multer = require('multer');
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '../public/images/'));
        },
        filename: function (req, file, cb) {
            cb(null, randomstring.generate(7) + '.png');
        }
    })
});

router.post('/items/', auth, upload.single('file'), function (req, res, next) {
    if (req.file === undefined) {
        err = new Error('You must upload a file.');
        err.status = 400;
        return next(err);
    }
    var item = new Items();

    item.title = req.body.title;
    item.price = Number(req.body.price);
    item.description = req.body.description;
    item.filename = req.file.filename;

    item.save(function (err) {
        if (err) return next(err);
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
    Items.findById(req.params.id, function (err, item) {
        if (err) next(err);
        Items.deleteOne({ _id: req.params.id }, function (err) {
            if (err) return next(err);
            res.json({ message: 'Successfully deleted' });
            var p = path.resolve(__dirname, '../public/images/', req.params.id);
            existsFile(p + item.filename, function (err, exists) {
                if (!err && exists) {
                    fs.unlink(p + item.filename, function () { });
                }
            });
        });
    });
});

module.exports = router;