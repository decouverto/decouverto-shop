var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:27017/decouverto-shop', { useNewUrlParser: true });

var Items = connection.model('Items', require('../schemas/item.js'));

module.exports = {Items};