var express = require('express');

var router = express.Router();

/*
router.get('/', function(req, res) {
    res.send('NEM.fx');  
});
*/

module.exports =  {
	getRouter: function(){ return router; }
};
