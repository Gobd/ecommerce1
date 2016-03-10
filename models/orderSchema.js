var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var orderSchema = mongoose.Schema({
    _id: {type: ObjectId, ref: 'User'},
    order : [{
        item: {type: ObjectId, ref: 'Product'},
        qty: {type: Number}
    }]
});

module.exports = {
    model: mongoose.model('Order', orderSchema),
    schema: orderSchema
};