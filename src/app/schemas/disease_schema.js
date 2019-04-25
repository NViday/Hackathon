//disease_schema


//requirements

//npm
let mongoose = require('mongoose');
let validator = require('validator');
let timestamps = require('mongoose-timestamp');
let mongooseStringQuery = require('mongoose-string-query');

//custom
let helper = require('../utilities/helper.js');

//constants


//schema
let disease_schema = new mongoose.Schema
({

    _id :{ type : mongoose.Schema.Types.ObjectId },

    name:
    {
        _scientific: 
        {
            type : String,
            trim : true,
            //require : true,
        },

        _current:
        {
            type : String,
            trim : true,
            require : true,

        },
    },
    
    description :
    {
        type : String,
        trim : true,
        require : true, 
    },

    categories:
    [
        {
            type : String,
            trim : true,
            require : true, 
        }
    ],

    symptoms: 
    [
       
        {
            type : String, 

        }
    ],
        

    tests:
    [
        {
            type : String, 

        }

    ],

    createdOn : { type: Date, default: Date.now },

    updatedOn : {type: Date, default: Date.now}
    


});


disease_schema.virtual('listOfSymptoms').get( () => 
{

});

//plugins 
disease_schema.plugin(timestamps);
disease_schema.plugin(mongooseStringQuery);

//text index for search
disease_schema.index({'$**': 'text'});


module.exports = mongoose.model("Disease", disease_schema, "diseases" )