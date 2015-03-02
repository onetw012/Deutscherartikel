var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var model = require('./models/Artikel');

mongoose.connect('mongodb://localhost:27017/artikel');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function (request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.post('/:name', function(request, response){
	console.log(request.body);
	/*model.getModel.insert(request)*/
});

app.get('/art', function(request, response){
	model.getModel.find(function(err, data){
		response.json(data);
	});
});

app.listen(4000);

