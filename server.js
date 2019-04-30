//server 

//requiring all the dependencies 

//npm modules
let express = require('express'),
 cors = require('cors'),
 bodyParser = require('body-parser'),
 compression = require('compression');

//custom modules 
let logger = require("./src/utilities/logger");

//init app
let app = express();


//init middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());



//init db 
require("./src/utilities/database");

//models
require("./src/schemas/user_schema");
require("./src/schemas/review_schema");
require("./src/schemas/hospital_schema");
require("./src/schemas/doctor_schema");
require("./src/schemas/disease_schema");


//populate_data

populateHospital = require("./src/populate_data/populate_hospitals");

populateHospital();

//routes
app.use('/auth', require('./src/auth'))
app.use("/", require('./src/routes'));
app.use("/users", require('./src/routes/user_routes'));
app.use("/reviews", require('./src/routes/review_routes'));
app.use("/doctors", require('./src/routes/doctor_routes'));
app.use("/hospitals", require('./src/routes/hospital_routes'));
app.use("/diseases", require('./src/routes/disease_routes'));

//Catch errors   
process.on('unhandledRejection', (reason, p)=>{

  logger.error(reason, 'rejection at', p);
})
.on('uncaughtException', (reason) => {
  // handle the error safely
    logger.error(reason);

    process.exit(1);
})

// Release app
app.listen(process.env.PORT || 5000, (err) => {
  if (err) {

        logger.log("error is coming your way");
        
        logger.error(err);

        process.exit(1);
  };
  logger.log("we are live and running ");
});


module.exports = app; 