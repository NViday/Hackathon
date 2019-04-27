//server 

//requiring all the dependencies 

//npm modules
let express = require('express'),
 passport = require('passport'),
 cors = require('cors'),
 bodyParser = require('body-parser'),
 path = require('path'),
 fs = require('fs'),
 jwt = require('express-jwt'),
 compression = require('compression'),
 express_winston= require('express-winston');

//custom modules 
let config = require("./src/config");
let logger = require("./src/utilities/logger");

//init app
let app = express();

//set app secret 
app.set('superSecret', config.secret_code);


//log
// init my winston middleware
// pass it my winston logger 
app.use(
        express_winston.logger({
                transports: [logger],
                meta: false,
                expressFormat : true,
                colorize: true,
        }),
);


// init bodyParser for POST info
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//init middleware
app.use(cors());
app.use(compression());
//app.use('/public', express.static(path.join(__dirname, './src/routes')));

app.use(passport.initialize());




      


//routes
var router = require('./src/routes/*').router;

app.use("api/v1/", router);
    

require('./utils/database');

// Release app
app.listen(config.server_port, (err) => {
  if (err) {

        logger.verbose("error is coming your way");
        
        logger.error(err);

        process.exit(1);
  };
  logger.verbose("we are live and running ");
});


module.exports = app; 