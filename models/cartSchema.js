var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var cartSchema = mongoose.Schema({
        item: {type: ObjectId, ref: 'Product'},
        qty: {type: Number}
});

module.exports = cartSchema;