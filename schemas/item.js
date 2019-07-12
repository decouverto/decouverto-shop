
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    filename: String
});
