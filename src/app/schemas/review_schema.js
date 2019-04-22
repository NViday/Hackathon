
//review_schema


//requirements

//npm 
let mongoose = require('mongoose');
let validator = require('validator');
let timestamps = require('mongoose-timestamp');
let mongooseStringQuery = require('mongoose-string-query');

//custom 
//let helper = require('../utilities/helper.js');

//constants

//Schema
let review_schema = new mongoose.model 
({
    _id : { type : mongoose.Schema.Types.ObjectId },

    postedBy : 
    {
        type : mongoose.Schema.Types.ObjectId, 

        ref : 'User',

        require : true
    },

    rate: 
    {
        value : 
        {
            type : Number, 
            require : true 

        },

        tags:
        {
            type: string ,
            require : true
        },

    },

    title :
    {
        type : String, 

            require : true,

            validate : (value) => 
            {
                return validator.isEmail(value)
            } 
    },


    body : 
    {
        type : String, 


        require : true,

        validate : (value) => 
        {
            return validator.isEmail(value)
        } 
    },

    pictures_uri : 
    [
        {
            type: String,
            trim : true

        }
    ],

    createdOn : { type: Date, default: Date.now },

    updatedOn : {type: Date, default: Date.now}

});


//plugins
review_schema.plugin(timestamps);
review_schema.plugin(mongooseStringQuery);

module.exports = mongoose.model("Review", hospital_schema, "reviews")