var path = require('path');
var fs = require('fs');
var log4js = require('log4js');

var DEFAULT = Object.freeze({
	NODE_ENV : 'dev',
	SUB_FOLDER : 'config/env',
	ENCODING : 'utf8',
	FILE_NAME : 'settings.json',
	LOG4JS_FILE_NAME : 'log4js.json',
	LOG4JS_RELOAD_SECS : 60
});

// JSON config
//
function loadConfig(folderPath) {
	var configFilePath = path.join(folderPath, DEFAULT.FILE_NAME);
	console.log('loading config @ ' + configFilePath);
	var jsonString = fs.readFileSync(configFilePath, DEFAULT.ENCODING).toString(); 
	config = JSON.parse(jsonString);
	return config;
}

var logger;

// log4js
//
function configureLog4js(folderPath) {
	var logConfigFilePath = path.join(folderPath, DEFAULT.LOG4JS_FILE_NAME);
	console.log('loading log4js config @ ' + logConfigFilePath);
	log4js.configure(logConfigFilePath, { reloadSecs: DEFAULT.LOG4JS_RELOAD_SECS }); 	
	logger = log4js.getLogger('configure');
}

function getTlsOptionsSync(config, folderPath) {

    var options = { passphrase: config.tlsCertPassPhrase };

    logger.info('determining TLS certificate format...');

    // prefer PEM
    //
    try { 

    	var pemKeyFilePath = path.join(folderPath, config.tlsPemKey);
        var pemKey  = fs.readFileSync(pemKeyFilePath, DEFAULT.ENCODING);

        var pemCertFilePath = path.join(folderPath, config.tlsPemCert);
        var pemCert = fs.readFileSync(pemCertFilePath, DEFAULT.ENCODING);

        logger.info('PEM')
    
        options.key = pemKey;
        options.cert = pemCert;
    }
    catch (e) { // but settle for PFX

    	var pfxFilePath = path.join(folderPath, config.tlsPfx);
        var pfx = fs.readFileSync(pfxFilePath, DEFAULT.ENCODING);

        logger.info('PFX')

        options.pfx = pfx;
    }

    return options;
}

module.exports = function(configFolderPath) {

	var config = loadConfig(configFolderPath);
	configureLog4js(configFolderPath);

	var tlsOptions = getTlsOptionsSync(config, configFolderPath);

	return {
		getConfig: function(){ return config; },
		getTlsOptions: function() { return tlsOptions; }
	};
};