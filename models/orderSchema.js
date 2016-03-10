var mongoose = require('mongoose');
var cartSchema = require('./cartSchema.js');


var orderSchema = mongoose.Schema({
    items: {type: Number},
    order : [cartSchema]
});

module.exports = {
    model: mongoose.model('Order', orderSchema),
    schema: orderSchema
};