    var mongojs = require('mongojs');
    var db = mongojs('ecommerce');
    var col = db.collection('products');
    var objId = mongojs.ObjectId;

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function isEmpty(obj) {
        if (obj == null) return true;
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

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
        if (isEmpty(req.query)) {
            col.find(function (err, resp) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(resp);
                }
            })
        } else {
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