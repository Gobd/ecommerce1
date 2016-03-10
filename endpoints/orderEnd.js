var mongoose = require('mongoose');
mongoose.Promise = require('./bluebird.js');
var product = require('../models/productSchema.js');
var productSchema = product.schema;
var cartSchema = require('../models/cartSchema.js');
var User = require('../models/userModel.js');
var order = require ('../models/orderSchema.js');
var Order = order.model;
var orderFul = require ('../models/orderFulSchema.js');
var Promise = require('./bluebird.js');
var join = Promise.join;


var options = {runValidators: true};

function saveUser(userToSave, req, res){
    userToSave.save(function(err, resp){
        return err ? res.status(500).json(err) : res.status(200).json(resp);
    })
}

//user id 56e09c7569ff7804eaf99974
//prod id 56e098bc30ffc7d7e9bc49c3

//new user
// post api/user
// {
//     "name" : "Brian",
//     "email" : "hey@a.com",
//     "password" : "passaasdas"
// }


//add product to cart
// post api/cart/userid
// {
//     "item" : "56e098bc30ffc7d7e9bc49c3",
//     "qty" : "1"
// }

//get user
// get api/user/id

// edit cart
// put /api/cart/userid
//localhost:8080/api/cart/56e09ec2d1834832ea16f151/?qty=5&itmId=56e098bc30ffc7d7e9bc49c3

module.exports = {
    createUser : function(req, res, next) {
        var sess = req.session;
        User.create(req.body, function(err, resp){
            sess.uid = String(resp._id);
            sess.save();
            return err ? res.status(500).json(err) : res.status(200).json(resp);
        })
    },
    addCart : function(req, res, next) {
        var id = req.params.user_id;
        User.findById(id, function(err, resp){
            if (err) {res.status(500).json(err)}
            var user = resp;
            var qty = req.body.qty;
            var foundItem = -1;
            user.cart.forEach(function(cartItem, idx){
                if(cartItem.item.toString() === req.body.item.toString()){
                    foundItem = idx;
                }
            });
            if(foundItem >= 0) {
                user.cart[foundItem].qty += parseInt(qty);
            } else {
                user.cart.push(req.body);
            }
            saveUser(user, req, res);
        })
    },
    editCart : function(req, res, next) {
        var id = req.params.user_id;
        User.findById(id, function(err, resp){
            if (err) {res.status(500).json(err)}
            var user = resp;
            var qty = parseInt(req.query.qty);
            var foundItem = -1;
            user.cart.forEach(function(cartItem, idx){
                if(cartItem.item.toString() === req.query.itmId.toString()){
                    foundItem = idx;
                }
            });
            if(foundItem >= 0) {
                if (qty === 0) {
                    user.cart.splice(foundItem, 1)
                } else {
                    user.cart[foundItem].qty = qty;
                }
            }
            saveUser(user, req, res);
        })
    },
    getUser : function(req, res, next){
        var sess = req.session;
        var id = '';
        var sent = false;
        console.log(sess.uid + 'from endpiint');
        if (sess.uid) {
            id = sess.uid;
        } else if (req.query.id) {
            id = req.query.id;
            sess.uid = String(id);
        } else {
            sent = true;
            res.status(500).json('not user' + sess.uid);
        }
        console.log(id);
        if (!sent){
            User
                .findById(id)
                .populate('cart.item')
                .exec(function(err, resp){
                    return err ? res.status(500).json(err) : res.status(200).json(resp);
                })
        }
    },
    postOrder: function(req, res, next) {
        var id = req.params.user_id;
        User.findById(id, function(err, resp){
            var user = resp;
            var order = {};
            var fulfill = {};
            fulfill['user_id'] = user._id;
            var cartInfo = [];
            user.cart.forEach(function(cartItem, idx){
                cartInfo.push({
                    item: cartItem.item,
                    qty: cartItem.qty
                });
                    order.items = idx + 1;
            });
            order.order = cartInfo;
            fulfill.order = cartInfo;
            user.cart = [];
            user.orders.push(order);
            var userPromise = user.save();
            var orderPromise = orderFul.create(fulfill);
            join(userPromise, orderPromise, function(user, order){
                return [user, order];
            }).then(function(resp){
                res.status(200).json(resp);
            });
        })

    },
    getOrder: function(req, res, next){
        var id = req.query.id;
        Order.find({user_id: id}, function(req, resp){
            err ? res.status(500).json(err) : res.status(200).json(resp)
        })
    }
};