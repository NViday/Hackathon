//hospital_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utilities/logger");
const Hospital = require("../schemas/hospital_schema");


//Create 
exports.hospital_create = (req, res) => 
{
    const newHospital= new Hospital(req.body);
    newHospital.save( 

        //callback function
        (err, hospital)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.log("a hospital profile was successfully created");
            res.status(200).json(hospital)
        }
    );    
       
};

//Read 

//retrieve a list of hospitals
exports.hospitals_all = (req, res) => 
{
    Hospital.find( {},

    //projections
    '_id  name address ratings',

        //{sort:  ["ratings._avg.rating", "descending"]},
        
        //callback function
        (err, hospital_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(hospital_list)
        }
    );    
};

exports.hospitals_search= (req, res) => 
{
    let search_keyword = req.body.keyword; 
    let address = req.body.address;
    Hospital.find(
        {
            $and : 
            [ 
                {
                    name: new RegExp('^'+search_keyword+'$', "i")
                },
                
                {
                    fullAddress : new RegExp('^'+address+'$', "i")
                },
        
            ],
        },

        
        //projections
        '_id  name address ratings',

        //option 
        {sort:  "textScore"},

        
        //callback function
        (err, hospital_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(hospital_list)
        }
        );   
};



//retrieve a hospital by id
exports.hospital_profile = (req, res) => 
{
    let id = req.params.id; 
    
    Hospital.findById(id,

    //callback function
    (err, hospital)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        res.status(200).json(hospital)
    }
    );  
};




//Update
exports.hospital_profile_update = (req, res) => 
{
    let updated_hospital= req.body;
    let id = req.params.id; 

    Hospital.findByIdAndUpdate( id, 
        
        //full / partial update 
        updated_hospital, 

        //options 
        {new : true, runValidators: true, upsert : true } ,

        //callback function
        (err, hospital)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.log("hospital "+ id + ": profile was successfully updated");
            res.status(200).json(hospital);
        }
    );
    
};



//Delete
exports.hospital_profile_delete = (req, res) => 
{
    let id = req.params.id; 
    Hospital.findByIdAndRemove( id, 
    
    //callback function
    (err, hospital)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        logger.error("hospital "+ id + ":  profile was successfully deleted");
        res.SendStatus(204)
    });

};