var path = require('path');
var fs = require('fs');

var DEFAULT = Object.freeze({
	NODE_ENV : 'dev',
	SUB_FOLDER : 'config/env',
	FILE_NAME : 'settings.json',
	ENCODING : 'utf8',
	REFRESH_FAILURE_LIMIT : 10
});

var environment = (process.env.NODE_ENV || DEFAULT.NODE_ENV); 

var configFilePath = path.join(process.cwd(), DEFAULT.SUB_FOLDER, environment, DEFAULT.FILE_NAME);

var config = null;

var refreshFailCount = 0;
function refreshSync() {

	if (refreshFailCount >= DEFAULT.REFRESH_FAILURE_LIMIT) {
		throw 'config refresh failure limit exceeded';
	}

	try {
		var jsonString = fs.readFileSync(configFilePath, DEFAULT.ENCODING).toString(); 
		config = JSON.parse(jsonString);
		return config;
	}
	catch (e) { 
		refreshFailCount = refreshFailCount + 1;
		return config;  
	}
}


function getSync() { return config || refreshSync(); }

exports.getSync = getSync;
exports.refreshSync = refreshSync;