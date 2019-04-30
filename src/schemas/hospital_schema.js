
//hospital_schema

//requirements
let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
let validator = require('validator');
let timestamps = require('mongoose-timestamp');
let mongooseStringQuery = require('mongoose-string-query');


//constants
let helper = require('../utilities/helper.js');

//schema
let hospital_schema = new mongoose.Schema
({

    _id :{ 
        type : mongoose.Schema.Types.ObjectId, 
        index : true, 
        required : true, 
        auto: true, 
    },
    name : 
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

    website_URL : 
    {
        type: String, 

        trim : true,

        //require : true,
    },


    createdOn : { type: Date, default: Date.now },

    updatedOn : {type: Date, default: Date.now}

});

//virtual
hospital_schema.virtual('fullAddress').get( ()=>
{
    return this.address.street + " , " + this.address.city + " , " + this.address.state + " , " + this.address.country  
});

hospital_schema.virtual('fullAddress').set((full_address)=> 
{
    let result = full_address.split(' , ')

    this.address.city = result[0]

    this.address.state = result[1]

    this.address.zipcode = Number(result[2])

    this.address.country = result[3]
}
);


//methods
hospital_schema.methods.getCapitalizedAddress = ()=> 
{
    return helper.capitalize(this.address.street) + ' , ' + helper.capitalize(this.address.city) + ' , ' + helper.capitalize(this.address.state) +" - "+ this.address.zipcode + ' , ' + helper.capitalize(this.address.country)
};


//plugins
hospital_schema.plugin(timestamps);
hospital_schema.plugin(mongooseStringQuery);


module.exports = mongoose.model("Hospital", hospital_schema, "hospitals")

