var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var cartSchema = require('./cartSchema.js');

var orderFulSchema = mongoose.Schema({
    user_id : {type: ObjectId, ref: 'User'},
    fulfilled: {type: Boolean, default: false},
    order : [cartSchema]
},
    {timestamps: true}
);

module.exports = mongoose.model('orderFul', orderFulSchema);