
//logger


//logger.js


let winston = require('winston');

// papertrail transport 
let { Papertrail } = require('winston-papertrail');

let config = require('../config');

let logger;

if (config.env == 'test' || config.env == 'local' || config.env == 'development') {
	logger = console;
} else {


	//create logger
	logger = winston.createLogger();

	//init papertrail 
	const papertrailTransport = new Papertrail(
		{
			level : 'error',
			host: config.logger.host,
			port: config.logger.port,
		}
	);

	logger.add(papertrailTransport)


	
}

module.exports = logger;