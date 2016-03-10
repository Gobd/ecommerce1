var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 8080;
var app = express();
var mongoose = require('mongoose');
var prodEnd = require('./endpoints/prodEnd.js');
var orderEnd = require('./endpoints/orderEnd.js');
mongoose.connect('mongodb://localhost/ecommerce');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB!');
});

app.use(express.static(__dirname + '/index'));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.post('/products', prodEnd.create);
app.get('/products', prodEnd.index);
app.get('/products/:id', prodEnd.get);
app.put('/products/:id', prodEnd.update);
app.delete('/products/:id', prodEnd.delete);

app.post('/api/user/', orderEnd.createUser);
app.get('/api/user/:id', orderEnd.getUser);

app.post('/api/order/:user_id', orderEnd.postOrder);
app.get('/api/order', orderEnd.getOrder);

app.post('/api/cart/:user_id', orderEnd.addCart);
app.put('/api/cart/:user_id', orderEnd.editCart);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

module.exports = app;