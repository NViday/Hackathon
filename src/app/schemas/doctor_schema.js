
//doctor_schema


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
let doctor_schema = new mongoose.Schema
({

    _id :{ type : mongoose.Schema.Types.ObjectId },
    
    title : 
    {
        _abbreviation : 
        {
            type : String,

            require : true, 

            enum : ['Dr'] ['N'] ['OBGYN'] ['Other']
        },

        _full: 

        {
            type : String, 
            require : true , 

            trim : true,

            validate : (value) => 
            {
                return !validator.isEmpty(value)
            } 
        }, 
    },

    specialities:
    [
        {
            type : String, 

        }
    ],


    names : 
    {
        firstName: 
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
  
        lastName: 
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
    },

    address : 
    {

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

      
    },

    medical_profileURL : 
    {
        type: String, 
        trim : true,
        require : true,
    },
    
    hospital : 
    {
            type : mongoose.Schema.Types.ObjectId ,

            ref: "Hospital",

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




//Virtual properties 
doctor_schema.virtual('fullName').get(()=> 
{
    return this.names.firstName + ' ' + this.names.lastName
}
);

doctor_schema.virtual('fullName').set((name)=> 
{
    let result = name.split(' ')

    this.names.firstName = result[0]

    this.names.lastName = result[1]
}
);



//Methods 
doctor_schema.methods.getFullName = ()=> 
{
    return helper.capitalize(this.names.firstName) + ' ' + helper.capitalize(this.names.lastName)
};

doctor_schema.methods.getInitials = () => 
{
    return (this.names.firstName[0] + this.names.lastName[0]).toUppercase()

};

doctor_schema.methods.getCapitalizedFName = () =>
{
    return helper.capitalize(this.names.firstName)
};

doctor_schema.methods.getCapitalizedLName = () =>
{
    return helper.capitalize(this.names.lastName)
};

//plugins 


doctor_schema.plugin(timestamps);
doctor_schema.plugin(mongooseStringQuery);



module.exports = mongoose.model("Doctor", doctor_schema, "doctors" )