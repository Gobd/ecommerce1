var product = require('../models/productSchema.js');
var Product = product.model;
var mongoose = require('mongoose');
var options = {runValidators: true};

module.exports = {

    create: function (req, res) {
        Product.create(req.body, function (err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    index: function (req, res) {
        if (Object.keys(req.query).length === 0) {
            Product.find(function (err, resp) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(resp);
                }
            })
        } else {
                for (var key in req.query) {
                    if (req.query[key].length < 1) {
                        delete req.query[key];
                    }
                }
            if (Object.keys(req.query).length === 1 &&  req.query.regex) {
                    var reg = new RegExp('\\w*(' + req.query.regex + ')\\w*', "ig");
                    req.query = {$or: [{title: reg}, {desc: reg}]};
            }
            Product.find(req.query, function (err, resp) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(resp);
                }
            })
        }
    },

    get: function (req, res) {
        var id = req.params.id;
        Product.findById(id, function (err, resp) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(resp);
                }
            })
    },

    update: function (req, res) {
        var id = req.params.id;
        for (var key in req.body) {
            if (req.body[key].length < 1) {
                delete req.body[key];
            }
        }
        Product.findByIdAndUpdate(id,
            req.body,
            options,
            function (err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        })
    },

    delete: function (req, res) {
        var id = req.params.id;
        Product.findByIdAndRemove(id, function (err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        })
    }
};

