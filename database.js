
let mongoose = require('mongoose');

let connectionString = 'mongodb+srv://dbAdmin:vv7HDfvAYkfnVKbi@cluster0-ydbjm.gcp.mongodb.net/alifedb'; 



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
          console.log('Database connection successful') 
       })
      .catch( err => 
       {
          console.error('Database connection error!') 
       })

  }

} 

module.exports = new Database()
