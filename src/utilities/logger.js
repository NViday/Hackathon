
//logger


let winston = require('winston');
require('winston-papertrail').Papertrail;

let config = require('../config');

let logger;

if (config.env == 'test' || config.env == 'local' || config.env == 'development') {
	logger = console;
} else {
	const papertrailTransport = new winston.transports.Papertrail({
		host: config.logger.host,
		port: config.logger.port,
		colorize: true,
		handleExceptions : true 
	});

	logger = new winston.Logger({
		transports: [papertrailTransport],
	});
}

module.exports = logger;