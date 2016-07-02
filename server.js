var path = require('path');

var environment = (process.env.NODE_ENV || 'dev'); 

// config
//
var configFolderPath = path.join(process.cwd(), 'config/env', environment);
var configure = require('./configure')(configFolderPath);
var config = configure.getConfig();
if (config === null)
	throw 'failed to load config';

var tlsOptions = configure.getTlsOptions();

// logging
//
var log4js = require('log4js');
var log = log4js.getLogger('server');

// server
//
var
	http = require('http'),
	https = require('https');

var express = require('express');

var app = express();

var router = require('./app/router');

function runServer(host, port, tls) {

	tls = tls || false;

    var protocol = tls 
    	? 'https' 
    	: 'http';

    var app = express();

    var server = tls ? 
        https.createServer(tlsOptions, app) : 
        http.createServer(app);

    var url = protocol + '://' + host + ':' + port.toString();

    app.use('/', router.getRouter());

    // bindRoutes(app, url);

    server.listen(port, function () {
        log.info('---------------------------------------');
        log.info('NEM.fx - nodejs expressjs mongodb');
        log.info('@ ' + url);
        log.info('---------------------------------------');
    });
}

runServer(config.host, config.port, config.tls);