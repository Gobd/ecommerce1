var mongoose = require('mongoose');
var cartSchema = require('./cartSchema.js');
var order = require('./orderSchema.js');
var orderSchema = order.schema;

var userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    cart: [cartSchema],
    orders: [orderSchema]
});

module.exports = mongoose.model('User', userSchema);