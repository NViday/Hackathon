
//hospital_schema

//requirements
let mongoose = require('mongoose');
let validator = require('validator');
let timestamps = require('mongoose-timestamp');
let mongooseStringQuery = require('mongoose-string-query');


//constants
//let helper = require('../utilities/helper.js');

//schema
let hospital_schema = new mongoose.model
({

    Name : 
    {
        type : String ,
        require : true,
    },

    address : 
    {

        street : 
        {
            type: String, 

            lowercase : true,

            trim : true,

            require : true,

            validate : (value) => 
            {
                return !validator.isEmpty(value)
            } 
        },

        city : 
        {
            type: String, 

            lowercase : true,

            trim : true,

            require : true,

            validate : (value) => 
            {
                return !validator.isEmpty(value)
            } 
        },

        state : 
        { 
            type: String, 

            lowercase : true,

            trim : true,

            require : true,

            validate : (value) => 
            {
                return !validator.isEmpty(value)
            } 
        
        },

        zipcode : 
        { 
            
            type : Number, 

            require : true,

            validate : (value) => 
            {
                return  validator.isPostalCode
            } 
        
        },

    },

    medical_profileURL : 
    {
        type: String, 

        trim : true,

        require : true,
    },

    ratings: 
    {
        _avg : 
        {
            raters : 
            {
                type : Number, 
                require : true 
            },

            rating: 
            {
                //5

                type : Number, 
                require : true 

            }
        },

        _badges :  
        {
            latin_x : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            },

            native_american : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }

            },

            black_women : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }

            }, 

            black_men : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }

            }, 

            person_of_color : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            },

            women_of_color : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            },

            caucasian : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }

            },

            lgtbq : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            }, 

            lgtbq_of_color : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            },

            transsexual : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }

            }, 

            transsexual_of_color : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }

            }, 

            men : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            },
            
            women : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            },

            not_insured:
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }
            },

            not_applicable : 
            {
                raters : 
                 {
                    type : Number, 
                    require : true 
                },

                rating: 
                {
                    type : Number, 
                    require : true 

                }

            }

        }

    },
    reviews: 
    [
        { 
            type : mongoose.Schema.Types.ObjectId , 

            ref = 'Review'

        },

    ],

    createdOn : { type: Date, default: Date.now },

    updatedOn : {type: Date, default: Date.now}

});

//plugins
hospital_schema.plugin(timestamps);
hospital_schema.plugin(mongooseStringQuery);

module.exports = mongoose.model("Hospital", hospital_schema, "hospitals")

