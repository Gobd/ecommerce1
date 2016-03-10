var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
     title: {
         type: String,
         unique: true,
         required: true,
         index: true
     },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = {
    model: mongoose.model('Product', productSchema),
    schema: productSchema
};