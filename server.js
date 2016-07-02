// config
//
var configure = require('./configure');
var config = configure.getSync();
if (config === null)
	throw 'failed to load config';

var express = require('express');

var app = express();

function run(protocol, server, port) {

	var url = protocol + '://' + server + ':' + port;

	app.get('/', function (req, res) {
		res.send(url);
	});

	app.listen(port, function () {
		console.log('men');
		console.log(url);
	});
}

run(config.protocol, config.server, config.port);