var express = require('express');
var app = express();
var mongoose = require('mongoose');

var model = require('./models/Artikel');

mongoose.connect('mongodb://localhost:27017/artikel');

app.use(express.static(__dirname));



app.get('/', function (request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.get('/art', function(request, response){
	model.getModel.find(function(err, data){
		response.json(data);
	});
});

app.listen(4000);

