//disease_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utils/logger");
const Disease = require("../schemas/disease_schema");


//Create 
exports.disease_create = (req, res) => 
{
    const newDisease= new Disease(req.body);
    newDisease.save(
        //callback function
        (err, disease)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.verbose("a disease profile was successfully created");
            res.status(200).json(disease)
        }
    );    
       
};

//Read 

//retrieve a list of diseases
exports.diseases_all = (req, res) => 
{
    disease.find(


        {sort:  ["name._current", "descending"]},
        
        //callback function
        (err, disease_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(disease_list)
        }
    );    
};

exports.diseases_search= (req, res) => 
{
    let search_keyword = req.params.keyword; 
    disease.find(
        {
            $and : 
            [ 
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
            {
                fullAddress : new RegExp('^'+address+'$', "i")

            },
        
            ],
        },

        //projection
        '_id  title specialities names ratings',

        //option 
        {sort:  "textScore"},

        
        //callback function
        (err, disease_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(disease_list)
        }
        );   
};


exports.diseases_work_at= (req, res) => 
{
    let hospitalID = req.params.hospital; 
    
    disease.find({ hospital : hospitalID },
 
        '_id  title specialities names ratings',

        {sort:  ["ratings._avg.rating", "descending"]},
        //callback function
        (err, disease_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            
            res.status(200).json(disease_list)
        }
    );  
};


//retrieve a disease by id
exports.disease_profile = (req, res) => 
{
    let id= req.params._id; 
    
    disease.findById(id,
        
    //callback function
    (err, disease)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        res.status(200).json(disease)
    }
    );  
};




//Update
exports.disease_profile_update = (req, res) => 
{
    let updated_disease= req.body;
    let id = req.params._id; 

    disease.findByIdAndUpdate( id, 
        
        //full / partial update 
        updated_disease, 

        //options 
        {new : true, runValidators: true, upsert : true } ,

        //callback function
        (err, disease)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.verbose("disease "+ id + ": profile was successfully updated");
            res.status(200).json(disease);
        }
    );
    
};



//Delete
exports.disease_profile_delete = (req, res) => 
{
    let id = req.params._id; 
    disease.findByIdAndRemove( id, 
    
    //callback function
    (err, disease)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        logger.error("disease "+ id + ":  profile was successfully deleted");
        res.SendStatus(204)
    });

};