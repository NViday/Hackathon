

//requirements 

//npm 
let mongoose = require('mongoose');
let connectionString =  require('../config').mongo_CS

//custom
let logger = require('./logger.js')




class Database 
{
   constructor()
   {
     this._connect()

   } 
  _connect()
  {
    mongoose.connect(connectionString, {useNewUrlParser: true})
      .then(()=> 
       {
          logger.log('connection to db successful') 
       })
      .catch( err => 
       {
          logger.error(err) 
       })

  }

} 

module.exports = new Database()
