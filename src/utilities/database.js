

//requirements 

//npm 
let mongoose = require('mongoose');

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
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true})
      .then(()=> 
       {
          logger.log('connection to db successful') ;
       })
      .catch( err => 
       {
          logger.error(err) ;
       })

  }

} 

module.exports = new Database()
