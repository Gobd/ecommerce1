    var mongojs = require('mongojs');
    var db = mongojs('ecommerce');
    var col = db.collection('products');
    var objId = mongojs.ObjectId;

module.exports = {

    create: function (req, res) {
        col.insert(req.body, function (err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    index: function (req, res) {
        if (Object.keys(req.query).length === 0) {
            col.find(function (err, resp) {
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
                    req.query = {$or: [{name: reg}, {desc: reg}]};
            }
            col.find(req.query, function (err, resp) {
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
            col.find({_id: objId(id)}, function (err, resp) {
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
        col.update({_id: objId(id)},
            {$set: req.body},
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
        col.remove({'_id' : objId(id)}, function (err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        })
    }
};

