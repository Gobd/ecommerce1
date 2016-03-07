var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');
var port = 8080;
var app = express();
var db = mongjs('ecommerce');
var col = db.collection('products');
var ObjId = mongojs.ObjectId;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, function() {
    console.log('Listening on port ' + port);
});