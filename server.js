var express = require('express');
var configure = require('./configure');

function run(config) {

	var app = express();

	var url = config.protocol + '://' + config.server + ':' + config.port; 

	app.get('/', function (req, res) {
		res.send('Hello World!');
	});

	app.listen(config.port, function () {
		console.log(url);
	});
}

function failedToLoadConfig(err) {
	console.log('failed to load config');
	console.log(err);
}

configure.load(run, failedToLoadConfig);