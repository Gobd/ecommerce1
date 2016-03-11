var mongoose = require('mongoose');
var cartSchema = require('./cartSchema.js');
var order = require('./orderSchema.js');
var orderSchema = order.schema;

var userSchema = mongoose.Schema({
    name: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    cart: [cartSchema],
    orders: [orderSchema]
});

module.exports = mongoose.model('User', userSchema);