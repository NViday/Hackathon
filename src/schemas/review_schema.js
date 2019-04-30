
//review_schema


//requirements

//npm 
let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
let validator = require('validator');
let timestamps = require('mongoose-timestamp');
let mongooseStringQuery = require('mongoose-string-query');

//custom 


//constants

//Schema
var review_schema = new mongoose.Schema
({
    _id : { 
        type : mongoose.Schema.Types.ObjectId, 
        required : true, 
        auto: true, 
    },

    postedBy : 
    {
        type : mongoose.Schema.Types.ObjectId, 

        require : true
    },

    about : 
    {
        type : mongoose.Schema.Types.ObjectId, 
        
        require : true
    },

    rating: 
    {
        value : 
        {
            type : Number, 
            require : true 

        },

        tags:
        {
            type: String ,
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

//text index for search
review_schema.index({'$**': 'text'});

module.exports = mongoose.model('Review', review_schema, 'reviews');