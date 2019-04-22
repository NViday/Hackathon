//user_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utils/logger");


const User = mongoose.Model('User');


//Create : ( see register / login )


//Read 

//retrieve a list of all reviews


//retrieve a review by id

//Update 


//Delete

exports.delete = (req, res) => 
{
    User.deleteOne( {_id: req.params.user })
        .then( () => {res.SendStatus(204)})
        .catch( err=> 
            {
                logger.error(err);
                res.status(422).send(err.errors);
            })

};




