//doctor_controller


//requirements

//npm
let mongoose = require('mongoose')
let async = require('async');
let validator = require('validator');

//custom 
let logger = require("../utils/logger");
const Doctor = require("../schemas/doctor_schema");


//Create 
exports.doctor_create = (req, res) => 
{
    const newDoctor= new Doctor(req.body);
    newDoctor.save( newDoctor, 

        //callback function
        (err, doctor)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.verbose("a doctor profile was successfully created");
            res.status(200).json(doctor)
        }
    );    
       
};

//Read 

//retrieve a list of doctors
exports.doctors_all = (req, res) => 
{
    Doctor.find(

        '_id  title specialities names address',
        
        //callback function
        (err, doctor_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            res.status(200).json(doctor_list)
        }
    );    
};

exports.doctors_named= (req, res) => 
{
    let fullName = req.params.fullName; 

    Doctor.find({"fullName" : fullName },
 
    '_id  title specialities names address',
        
    //callback function
    (err, doctor_list)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        res.status(200).json(doctor_list)
    }
    );   
};

exports.doctors_specialized_in= (req, res) => 
{
     let fullName = req.params.fullName; 
    
    Doctor.find({"fullName" : fullName },
 
    '_id  title specialities names address',
        
    //callback function
    (err, doctor_list)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        logger.verbose("a doctor profile was successfully created");
        res.status(200).json(doctor_list)
    }
    );  
};

exports.doctors_work_at= (req, res) => 
{
    let hospitalID = req.params.hospital; 
    
    Doctor.find({ hospital : hospitalID },
 
        '_id  title specialities names address',
        
        //callback function
        (err, doctor_list)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.verbose("a doctor profile was successfully created");
            res.status(200).json(doctor_list)
        }
    );  
};

exports.doctors_located_at= (req, res) => 
{
    let fullName = req.params.fullName; 
    Doctor.find({"fullName" : fullName }, 
    '_id  title specialities names address',
    
    //callback function
    (err, doctor) => 
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };
        res.status(200).json(doctors);
    }); 
       
        
    
};

//retrieve a doctor by id
exports.doctor_profile = (req, res) => 
{
    let id= req.params._id; 
    
    Doctor.findById(id,
        
    //callback function
    (err, doctor)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        res.status(200).json(doctor)
    }
    );  
};




//Update
exports.doctor_profile_update = (req, res) => 
{
    let updated_doctor= req.body;
    let id = req.params._id; 

    Doctor.findByIdAndUpdate( id, 
        
        //full / partial update 
        updated_doctor, 

        //options 
        {new : true, runValidators: true, upsert : true } ,

        //callback function
        (err, doctor)=>
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send(err);
            };

            logger.verbose("doctor "+ doctor._id + ": profile was successfully updated");
            res.status(200).json(doctor);
        }
    );
    
};



//Delete
exports.doctor_profile_delete = (req, res) => 
{
    let id = req.params._id; 
    Doctor.findByIdAndRemove( id, 
    
    //callback function
    (err, doctor)=>
    {
        if(err) 
        { 
            logger.error(err);
            res.status(500).send(err);
        };

        logger.error("doctor "+ doctor._id + ":  profile was successfully deleted");
        res.SendStatus(204)
    });

};