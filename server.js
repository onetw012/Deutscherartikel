var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	port = Number(process.env.PORT || 3000),
	uristring =
		process.env.MONGOLAB_URI ||
		process.env.MONGOHQ_URL ||
		'mongodb://localhost/artikel',
	model = require('./app/models/Artikel'),
	db;

mongoose.connect(uristring);
db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected to mongoDB.');
});
app.disable('x-powered-by');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', function (request, response) {
	response.send({art: 'der'});
});

app.get('/', function (request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.get('/art', function(request, response){
	model.find(function(err, data){
		if (err) {
			response.send(err);
		} else {
			response.send(data);
		}		
	});
});

app.post('/create', function(request, response){
	/*console.log(request.body);*/
	var neuerWort = new model(request.body);
	neuerWort.save(function (err, data) {
		if (err) {
			response.send(err);
		} else {
			console.log('Saved ', data );
			response.send('Saved' + data);
		}
	});
 	
});


app.listen(port, function () {
	console.log("Listening on port "+port+" ...");
});

