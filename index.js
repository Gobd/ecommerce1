var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 8080;
var app = express();
var end = require('./endpoints.js');

app.use(express.static(__dirname + '/index'));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());


app.post('/products', end.create);
app.get('/products', end.index);
app.get('/products/:id', end.get);
app.put('/products/:id', end.update);
app.delete('/products/:id', end.delete);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});