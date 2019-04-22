//hospital_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utils/logger");


const Hospital = mongoose.Model('Hospital');


//Create 
exports.post = (req, res) => 
{
    let data = Object.assign( {}, req.body, {hospital: req.hospital.sub} ) || {};

    Hospital.create(data)
        .then( hospital => 
            {
                res.json(hospital);
            }
            )
        .catch( err=> 
            {
                logger.error(err);
                res.status(500).send(err);
            }
            
            );
};


//Read 

//retrieve a list of all reviews


//retrieve a review by id

//Update 


//Delete

exports.delete = (req, res) => 
{
    Hospital.deleteOne( {_id: req.params.hospital })
        .then( () => {res.SendStatus(204)})
        .catch( err=> 
            {
                logger.error(err);
                res.status(422).send(err.errors);
            })

};




