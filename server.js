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
//app.use(cors());
//app.use(compression());
//app.use('/public', express.static(path.join(__dirname, './src/routes')));

//app.use(passport.initialize());




      


//routes
var router = require('./src/routes/*').router;

app.use("api/v1/", router);
    
//require('./src/routes/user_routes.js')(app);

//no auth on following routes
/*
app.use(
  jwt({ secret: config.jwt.secret }).unless({
          path: [
                  '/',
                  '/auth/register',
                  '/auth/login',
                  '/auth/forgot-password',
                  '/auth/reset-password',
                ],
  }), 

);

*/
/*
// throw an error for unauthorized access 
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
          res.status(401).send('unauthorized access');
  }
}
);
*/


// Release app
app.listen(config.server_port, (err) => {
  if (err) {
          logger.error(err);
          process.exit(1);
  };

  // require the database library (which instantiates a connection to mongodb)
  require('./utils/database');

  /*
  // loop through all routes and dynamically require them – passing api
  fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
          require('./src/routes/' + file)(api);
  });

// output the status of the api in the terminal
logger.info(`API is now running on port ${config.server_port} in ${config.env} mode`);
*/
});


module.exports = app; 