//user_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utilities/logger");
const User = require("../schemas/user_schema");


//Create 
exports.user_create = (req, res) => 
{
    const newUser= new User(req.body);
    newUser.save(

        //callback function
        (err, user)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.info("a user profile was successfully created");
            res.status(200).json(user)
        }
    );    
       
};

//Read 


//retrieve a user by id
exports.user_get = (req, res) => 
{
    let id= req.params.id; 
    
    User.findById(id,
        
    //callback function
    (err, user)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        res.status(200).json(user)
    }
    );  
};




//Update
exports.user_update = (req, res) => 
{
    let updated_user= req.body;
    let id = req.params.id; 

    User.findByIdAndUpdate( id, 
        
        //full / partial update 
        updated_user, 

        //options 
        {new : true, runValidators: true, upsert : true } ,

        //callback function
        (err, user)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.verbose("user "+ id + ": profile was successfully updated");
            res.status(200).json(user);
        }
    );
    
};



//Delete
exports.user_delete = (req, res) => 
{
    let updated_user = req.body;
    let id = req.params.id; 
    User.findByIdAndUpdate( id, 
    
        updated_user,
    
        //callback function
        (err, user)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.error("user "+ id + ":  profile was successfully deleted");
            res.SendStatus(204)
        }
    );

};