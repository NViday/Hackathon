//populate_doctor
let logger = require("../utilities/logger");
let Review = require('../schemas/review_schema'); 


let doctor_id= ["5cc8a924ba16aa0004a6cafc", "5cc8a924ba16aa0004a6cafd"];

let doctors =[1,2];

function generateReview()
{
    doctors.forEach((entry)=>
    {
        let newReview = new Review({

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

        tags:"black woman queer",

    },

    title : " my review",


    body : "my review is ...!",


        });

        newReview.save(
            (err, user) =>
            {
                if(err)
                {
                    logger.error("saving "+ "failed. err "+ err);
                }
                logger.error("saving "+ "successful");
            }
        );
    });
};



module.exports = generateDoctor;
