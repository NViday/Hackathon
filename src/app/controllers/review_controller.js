//review_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utils/logger");
const Review = require("../schemas/review_schema");


//Create 
exports.review_create = (req, res) => 
{
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

            logger.verbose("a review was successfully created");
            res.status(200).json(review)
        }
    );    
       
};

//Read 

//retrieve a list of reviews
exports.reviews_all = (req, res) => 
{
    review.find(

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
};

exports.reviews_search= (req, res) => 
{
    let search_keyword = req.params.keyword; 
    
    review.find(
        
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





//retrieve a review by id
exports.review_get = (req, res) => 
{
    let id= req.params._id; 
    
    review.findById(id,
        
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
    let updated_review= req.body;
    let id = req.params._id; 

    review.findByIdAndUpdate( id, 
        
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

            logger.verbose("review "+ id + ": was successfully updated");
            res.status(200).json(review);
        }
    );
    
};



//Delete
exports.review_delete = (req, res) => 
{
    let id = req.params._id; 
    review.findByIdAndRemove( id, 
    
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

};