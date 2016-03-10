var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cartSchema = require('./cartSchema.js');
var order = require('./orderSchema.js');
var orderSchema = order.schema;

var userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    cart: [cartSchema],
    orders: String
});

module.exports = mongoose.model('User', userSchema);