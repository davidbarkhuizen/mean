var fs = require('fs');

var environment = process.env.ENVIRONMENT;

var configFilePath = 'config/env/' + environment + '/settings.json';

function load(onSuccess, onError) {

	fs.readFile(configFilePath, 'utf8', function (err, data) {
	
		if (err) onError(err);
		try { onSuccess(JSON.parse(data)); }
		catch (e) { return onError(e);  }
	});
}

exports.load = load;