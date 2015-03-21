var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.disable('x-powered-by');

var port = Number(process.env.PORT || 3000);
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/artikel';

var model = require('./models/Artikel');

mongoose.connect(uristring);
var db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected to mongoDB.');
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function (request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.post('/create', function(request, response){
	/*console.log(request.body);*/
	var neuerWort = new model.getModel(request.body);
	neuerWort.save(function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log('Saved ', data );
		}
	});

 	response.send('POST request to homepage');
});

app.get('/art', function(request, response){
	model.getModel.find(function(err, data){
		response.json(data);
	});
});

app.listen(port, function () {
	console.log("Listening on port "+port+" ...");
});

