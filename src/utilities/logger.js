
//logger


let winston = require('winston');

//to expose the winston papertrail transport 
let transport = require('winston-transport')
require('winston-papertrail').Papertrail;

let config = require('../config');



var logger;

if (config.env == 'test' || config.env == 'local' || config.env == 'development') {
	logger = console;
} else {

	//init papertrail 
	const papertrailTransport = new transports.Papertrail({
		host: config.logger.host,
		port: config.logger.port,
		colorize: true,
		handleExceptions : true 
	});

	papertrailTransport.on('error', (err)=> {});


	//create logger
	logger = winston.createLogger({
	
		transports: [papertrailTransport],
		
	});
}

module.exports = logger;