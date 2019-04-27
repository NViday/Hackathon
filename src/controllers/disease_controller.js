//disease_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utilities/logger");
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

            logger.log("a disease profile was successfully created");
            res.status(200).json(disease)
        }
    );    
       
};

//Read 

//retrieve a list of diseases
exports.diseases_all = (req, res) => 
{
    disease.find(

        {sort:  ["name._current", "ascending"]},
        
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
    let search_keyword = req.body.keyword; 
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
                listOfFullSymptoms: new RegExp('^'+ keyword +'$', "i")

            },
        
            ],
        },


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




//retrieve a disease by id
exports.disease_get = (req, res) => 
{
    let id= req.params.id; 
    
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
exports.disease_update = (req, res) => 
{
    let updated_disease= req.body;
    let id = req.params.id; 

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

            logger.log("disease "+ id + ": profile was successfully updated");
            res.status(200).json(disease);
        }
    );
    
};



//Delete
exports.disease_delete = (req, res) => 
{
    let id = req.params.id; 
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