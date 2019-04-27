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
//let config = require("./src/config");
//let logger = require("./src/utilities/logger");

//init app
let app = express();

//set app secret 
//app.set('superSecret', config.secret_code);

/*
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
*/

// init bodyParser for POST info
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//init middleware
//app.use(cors());
//app.use(compression());
//app.use(passport.initialize());



    

//routes

app.use("/", require('./src/routes'));
app.use("/users", require('./src/routes/user_routes'));
app.use("/reviews", require('./src/routes/review_routes'));
app.use("/doctors", require('./src/routes/doctor_routes'));
app.use("/hospitals", require('./src/routes/hospital_routes'));
app.use("/diseases", require('./src/routes/disease_routes'));
//app.use("/login", require('./src/routes/user_routes'));
    

require('./utils/database');

// Release app
app.listen(process.env.PORT || 5000, (err) => {
  if (err) {

        console.log("error is coming your way");
        
        //logger.error(err);

        process.exit(1);
  };
  console.log("we are live and running ");
});


module.exports = app; 