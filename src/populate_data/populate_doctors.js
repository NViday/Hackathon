



//populate_doctor
let logger = require("../utilities/logger");
let Doctor = require('../schemas/doctor_schema'); 

let Seattle = {

    name: "seattle",
    state: "wa",
    country:"usa"
};


let Ho = new Doctor({

    title:
    {
        _abbreviation : "dr.",
        _full : "doctor (MD) ",
    },

    name:
    {
        firstName: " Jane ",
        
        lastName: "Holns"
    },

    address:
    {
        city: Seattle.name,
        state: Seattle.state,
        country: Seattle.country,

    },

    hospital:"",

    ratings:
    {
        _avg:
        {
            raters: 50,
            rating : 4.5
        },

        _badges:
        {
            latin_x:
            {
                raters: 10,
                rating : 3.5
            },

            native_american :
            {
                raters: 5, 
                rating: 3,
            },

            back_women:
            {
                raters: 20, 
                rating: 2
            }, 
            person_of_color:
            {
                raters: 40, 
                rating: 3

            },
            
            women_of_color:
            {
                raters: 30,
                rating: 3.5
            }

        }
    }


})








