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

            postedBy : "5cc824fa1f1dec00040eed80",

    about : doctor_id[entry],

    rating: 
    {
        value : 5,

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



module.exports = generateReview;
