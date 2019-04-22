let winston = require('winston');
let winston_papertrail = require('winston-papertrail');

let config = require('../../config');

let logger;

if (config.env == 'test' || config.env == 'local' || config.env == 'development') {
	logger = console;
} else {
	const papertrailTransport = new winston.transports.Papertrail({
		host: config.logger.host,
		port: config.logger.port,
	});

	logger = new winston.Logger({
		transports: [papertrailTransport],
	});
}

module.exports = logger;