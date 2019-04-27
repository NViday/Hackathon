
//doctor_schema


//requirements

//npm
let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
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

        country : 
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
        //require : true,
    },
    
    hospital : 
    {
            type : mongoose.Schema.Types.ObjectId ,

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


                not_insured : 
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


                doctor : 
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

                unknown : 
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

doctor_schema.virtual('fullAddress').get( ()=>
{
    return  this.address.city + " , " + this.address.state + " , " + this.address.country  
});

doctor_schema.virtual('fullAddress').set((full_address)=> 
{
    let result = full_address.split(' , ');

    this.address.city = result[0];

    this.address.state = result[1];

    this.address.country = result[1];
}
);


//Methods

doctor_schema.methods.getCapitalizedAddress = ()=> 
{
    return helper.capitalize(this.address.City) + ' , ' + helper.capitalize(this.address.state) + ' , ' + helper.capitalize(this.address.country)
};

doctor_schema.methods.getCapitalizedFullName = ()=> 
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

//text index for search
doctor_schema.index({'$**': 'text'});


module.exports = mongoose.model("Doctor", doctor_schema, "doctors" )