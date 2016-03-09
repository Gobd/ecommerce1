var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var cartSchema = require('./cartSchema.js');

var userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    cart: [cartSchema],
    orders: []
});

module.exports = mongoose.model('User', userSchema);