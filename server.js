//server 


//requiring all the dependencies 
let express        = require('express');
let bodyParser     = require('body-parser');
let mongoose = require('mongoose');

let app            = express();


//telling the app to listen to HTTPS request 
const port = 8080;
app.listen(process.env.PORT || port, ()=> {
  console.log('We are live on ' + port);
});
