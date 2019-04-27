//user_schema


//Requirements

//npm 
let validator = require('validator');
let mongoose = require('mongoose');
let bcrypt = require('mongoose-bcrypt');
let timestamps = require('mongoose-timestamp');
let mongooseStringQuery = require('mongoose-string-query');

//custom
let helper = require('../utilities/helper.js');


//Constants 
//let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");

//Schema
let user_schema = new mongoose.Schema
(
    {
        _id : { type : mongoose.Schema.Types.ObjectId },

        pictureURI: {type: String},

        email : 
        {
            type : String, 

            unique : true, 

            trim : true,

            lowercase : true,

            require : true,

            validate : (value) => 
            {
                return validator.isEmail(value)
            } 
        },

        isEmailVerified :
        {
            type : Boolean
        },
        phoneNumber : 
        { 
            type : String ,

            trim : true,

            validate : (value) => 
            {
                return validator.isMobilePhone(value)
            } 
        
        },

        isPhoneNumberVerified:
        {
            type : Boolean
        },
        password : 
        {
            type : String, 
        
            bcrypt : true
        },

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

                //require : true,

                validate : (value) => 
                {
                    return !validator.isEmpty(value)
                } 
            
            },

            zipcode : 
            { 
                
                type : Number, 

                //require : true,

                validate : (value) => 
                {
                    return  validator.isPostalCode
                } 
            
            },

            country : 
            { 
                type: String, 

                lowercase : true,

                trim : true,

                //require : true,

                validate : (value) => 
                {
                    return !validator.isEmpty(value)
                } 
        
            },

        },

        personal_info : 
        {
            birthday: 
            { 
                
                type : Date, 
            
            
            },

            gender : 
            { 
                type : String, 

                enum: ['M'] ['F'] ['N']
            },

            ethnicity : 
            { 
                type: String , 

                trim : true,

                lowercase : true,
            
                validate : (value) => 
                {
                    return !validator.isEmpty(value)
                } 
            },

            isPOC : {type : Boolean},

            isLGBTQ : {type : Boolean}, 

            isTranssexual : {type : Boolean},

            hasChildren : {type : Boolean}, 

            job: 
            {
                isDoctor : { type : Boolean},
                doctorID : { type : mongoose.Schema.Types.Mixed},
            },
        },

        medical_behavior : 
        {
            checkUpFrequency : 
            { type : 
                String, enum: ['NA'] ['Often'] ['Regularly']
            },

            isInsured : { type: Boolean}, 

            isExpecting : { type : Boolean },       
        },


        account_info: 
        {
            updatedOn : { type: Date },

            createdOn : { type: Date },

            isProfileCompleted: { type : Boolean ,  default: false},

            profileCompletionDate : {type: Date},

            isVerified: { type: Boolean, default: false},

            VerificationDate : { type: Date},

            isBanned : { type: Boolean, default: false},

            BannedOn: {type: Boolean},

            isOnTemporaryHold : {type: Boolean, default: false },

            OnHoldUntil : {type: Date},
        },

    
        provider :
        {
            name : {type : String, trim : true},

            id : { type : mongoose.Schema.Types.Mixed },

            profileURL :  {type : String },

            profile : {type : String },

            provider_token : {type : String },
        },
    }
  

);

//Virtual properties 
user_schema.virtual('fullName').get(()=> 
{
    return helper.capitalize(this.names.firstName) + ' ' + helper.capitalize(this.names.lastName)
}
);

user_schema.virtual('fullName').get((name)=> 
{
    let result = name.split(' ')

    this.names.firstName = result[0]

    this.names.lastName = result[1]
}
);

user_schema.virtual('fullAddress').get( ()=>
{
    return  this.address.city + " , " + this.address.state + " , "+ this.address.zipcode +" , " + this.address.country  
});

user_schema.virtual('fullAddress').set((full_address)=> 
{
    let result = full_address.split(' , ')

    this.address.city = result[0]

    this.address.state = result[1]

    this.address.zipcode = Number(result[2])

    this.address.country = result[3]
}
);


//Methods 
user_schema.methods.getCapitalizedAddress = ()=> 
{
    return helper.capitalize(this.address.street) + ' , ' + helper.capitalize(this.address.city) + ' , ' + helper.capitalize(this.address.state) +" - "+ this.address.zipcode + ' , ' + helper.capitalize(this.address.country)
};

user_schema.methods.getInitials = () => 
{
    return (this.names.firstName[0] + this.names.lastName[0]).toUppercase()

}

user_schema.methods.getCapitalizedFName = () =>
{
    return helper.capitalize(this.names.firstName)
} 

user_schema.methods.getCapitalizedLName = () =>
{
    return helper.capitalize(this.names.lastName)
}

user_schema.methods.comparePassword() = (candidatePassword, cb) => 
{
    bcrypt.compare( 
        CandidatePassword, 
        this.password, 
        (err, isMatch) => 
        {
            if(err) return cb(err);
            cb( null, isMatch);
        }
        )
}


//Hook : Pre  
/*

// welcome user
// send password recovery email 
// etc..

*/

//Hook : Post 

    //sendgrid send welcome email 
    // add user to mailing list.


//plugins 

user_schema.plugin(bcrypt);
user_schema.plugin(timestamps);
user_schema.plugin(mongooseStringQuery);


module.exports = mongoose.model('User', user_schema, 'users')