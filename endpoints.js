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
        col.find(function (err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
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
        col.update({_id: objId(id)},
            {
                name: req.body.name
            },
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