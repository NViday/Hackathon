
//review_schema


//requirements
let mongoose = require('mongoose');
let validator = require('validator');
let helper = require('./helper.js');

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

            unique : true, 

            require : true,

            validate : (value) => 
            {
                return validator.isEmail(value)
            } 
    },


    body : 
    {
        type : String, 

        unique : true, 

        require : true,

        validate : (value) => 
        {
            return validator.isEmail(value)
        } 
    },

    pictures_uri : 
    [
        {
            type: String

        }
    ],

});





module.exports = mongoose.model("Review", hospital_schema, "reviews")