//user_schema


//Requirements
let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcrypt');
let helper = require('./helper.js');


//Constants 
//let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
let SALT_WORK_FACTOR = 10;

//Schema
let user_schema = new mongoose.Schema
(
    {
        _id : { type : mongoose.Schema.Types.ObjectId },

        email : 
        {
            type : String, 

            unique : true, 

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

            require : true,

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
        
        },

        names : 
        {
            firstName: 
            { 
                type: String, 

                lowercase : true,

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

        personal_info : 
        {
            age : 
            { 
                
                type : Number, 

                validate : (value) => 
                {
                    return  value > 0 
                } 
            
            
            },

            gender : 
            { 
                type : String, 

                enum: ['M'] ['F'] ['N']
            },

            ethnicity : 
            { 
                type: String , 

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


        reviews: 
        [
            { 
                type : mongoose.Schema.Types.ObjectId , 

                ref = 'Review'

            },

        ],
        


        account_info: 
        {
            updatedOn : { type: Date , default: Date.now},
            createdOn : { type: Date ,  default: Date.now},

            isProfileCompleted: { type : Boolean ,  default: false},

            profileCompletionDate : {type: Date},

            isVerified: { type: Boolean, default: false},

            VerificationDate : { type: Date},

            isBanned : { type: Boolean, default: false},

            BannedOn: {type: Boolean},

            isOnTemporaryHold : {type: Boolean, default: false },

            OnHoldUntil : {type: Date},
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


//Methods 

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

//hashing password 
user_schema.methods.pre('save', (next) => 
    {

        

        // no hashing when password is empty or not changed
        if( !this.isModified('password')) return next();

        //generate a salt

        bcrypt.genSalt(SALT_WORK_FACTOR , 
            (err, salt) => 
            {
                if(err) return next(err)
                //hash password
                bcrypt.hash( this.password, salt, 
                     (err, hash) => 
                     {

                        if(err) return next(err)


                         //override clear text with hashed one

                        this.password = hash

                        next();
                     });

        });
            
});


//Hook : Post 

    //sendgrid send welcome email 
    // add user to mailing list.




module.exports = mongoose.model('User', user_schema, 'users')