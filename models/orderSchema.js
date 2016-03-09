var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var product = require('./productSchema.js');
var productSchema = product.schema;

var orderSchema = mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    products: [{
        item: productSchema,
        quantity: {type: Number}
    }]
});

module.exports = mongoose.model('Order', orderSchema);
//yes export model