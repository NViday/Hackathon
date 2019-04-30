//review_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utilities/logger");
const Review = require("../schemas/review_schema");
const User = require("../schemas/user_schema");
const Doctor = require("../schemas/doctor_schema")

//Create 
exports.review_create = (req, res) => 
{
    let user_id = req.params.id;

    User.findById( user_id,
        
        //callback function
        (err, user)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            if(!user)
            {
                logger.error('unrecognized user '+ user_id);
                res.SendStatus('401');
            };

            //save review 
            const newReview= new Review(req.body);

            newReview.save(

            //callback function
            (err, review)=>
            {
                if(err) 
                { 
                    logger.error(err);
                    res.status(500).send(err);
                };

                logger.log("a review was successfully created");
                res.status(200).json(review)
            }
         ); 
        }
    );  

    
    
       
};

//Read 

//retrieve a list of reviews
exports.reviews_all = (req, res) => 
{
    Review.find( {},

        "_id postedBy title rating",

        //{sort:  ["createdOn", "descending"]},
        
        //callback function
        (err, review_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(review_list)
        }
    );    
};

//retrieve a list of reviews
exports.reviews_search= (req, res) => 
{
    let search_keyword = req.body.keyword; 
    
    Review.find(
        
        {
            $text: 
            {
                    $search: search_keyword, 
                    $caseSensitive : false, 
            },
        },
                
        { 
            score: {meta: "textScore"}
        },
            
        "_id postedBy title rating",

        //option 
        {sort:  "textScore"},

        
        //callback function
        (err, review_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(review_list)
        }
        );   
};

exports.reviews_doctor_all = (req, res) => 
{
    let doctor_id = req.params.id;

    Doctor.findById( doctor_id,
        
        //callback function
        (err, doctor)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            if(!doctor)
            {
                logger.error('unrecognized user '+ doctor_id);
                res.SendStatus('401');
            };

            //find reviews about the doctor
            Review.find( {about:  doctor_id},

                "_id title rating",
        
                {sort:  ["createdOn", "descending"]},
                
                //callback function
                (err, review_list)=>
                {
                    if(err) 
                    { 
                        logger.error(err);
                        res.status(500).send(err);
                    };
        
                    res.status(200).json(review_list)
                }
            ); 



        }
    );
     
};


//retrieve reviews for user
exports.review_user_all = (req, res) => 
{
    let user_id = req.params.id;

    User.findById( user_id,
        
        //callback function
        (err, user)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            if(!user)
            {
                logger.error('unrecognized user '+ user_id);
                res.SendStatus('401');
            };
    
            // find users' reviews
            Review.find({postedBy: user_id},

            "_id title rating",

            {sort:  ["createdOn", "descending"]},
        
            //callback function
            (err, review)=>
            {
                if(err) 
                { 
                    logger.error(err);
                    res.status(500).send(err);
                };

                res.status(200).json(review)
            });
        }
    );
};


exports.review_get = (req, res) => 
{
    let id = req.params.id;
    
    Review.findById(id,

        //callback function
        (err, review)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(review)
        }
    );
};

//Update
exports.review_update = (req, res) => 
{
    let user_id = req.params.userId;

    User.findById( user_id,
        
        //callback function
        (err, user)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            if(!user)
            {
                logger.error('unrecognized user '+ user_id);
                res.SendStatus('401');
            };

            let updated_review= req.body;
            let review_id = req.params.reviewId; 

            review.findOneAndUpdate( {_id: review_id, postedBy: user_id}, 
        
            //full / partial update 
            updated_review, 

            //options 
            {new : true, runValidators: true, upsert : true } ,

            //callback function
            (err, review)=>
            {
                if(err) 
                { 
                    logger.error(err);
                    res.status(500).send(err);
                };

                logger.log("review "+ id + ": was successfully updated");
                res.status(200).json(review);
            }
            );
        }
    );
};


//Delete
exports.review_delete = (req, res) => 
{
    let user_id = req.params.userId;

    User.findById( user_id,
        
        //callback function
        (err, user)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            if(!user)
            {
                logger.error('unrecognized user '+ user_id);
                res.SendStatus('401');
            };

            let id = req.params.reviewId; 
            review.findOneAndRemove( {_id: id, postedBy: user_id} , 
            //callback function
            (err, review)=>
            {
                if(err) 
                { 
                    logger.error(err);
                    res.status(500).send(err);
                };

                logger.error("review "+ id + ":  was successfully deleted");
                res.SendStatus(204)
            });
        }
    );

};