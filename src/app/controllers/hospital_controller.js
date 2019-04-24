//hospital_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utils/logger");
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

            logger.verbose("a hospital profile was successfully created");
            res.status(200).json(hospital)
        }
    );    
       
};

//Read 

//retrieve a list of hospitals
exports.hospitals_all = (req, res) => 
{
    hospital.find(

    //projections
    '_id  name address ratings',

        {sort:  ["ratings._avg.rating", "descending"]},
        
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
    let search_keyword = req.params.keyword; 
    let address = req.params.address;
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
    let id = req.params._id; 
    
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
    let id = req.params._id; 

    hospital.findByIdAndUpdate( id, 
        
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

            logger.verbose("hospital "+ id + ": profile was successfully updated");
            res.status(200).json(hospital);
        }
    );
    
};



//Delete
exports.hospital_profile_delete = (req, res) => 
{
    let id = req.params._id; 
    hospital.findByIdAndRemove( id, 
    
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