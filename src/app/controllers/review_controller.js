//review_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utils/logger");


const Review = mongoose.Model('Review');


//Create 
exports.post = (req, res) => 
{
    let data = Object.assign( {}, req.body, {review: req.review.sub} ) || {};

    Review.create(data)
        .then( review => 
            {
                res.json(review);
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
    Review.deleteOne( {_id: req.params.review })
        .then( () => {res.SendStatus(204)})
        .catch( err=> 
            {
                logger.error(err);
                res.status(422).send(err.errors);
            })

};




