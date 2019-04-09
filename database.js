
let mongoose = require('mongoose');

let connectionString = ''; 




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
       }

  }

} 
