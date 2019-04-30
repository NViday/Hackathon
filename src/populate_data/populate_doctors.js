



//populate_doctor
let logger = require("../utilities/logger");
let Doctor = require('../schemas/doctor_schema'); 

let Seattle = {

    name: "seattle",
    state: "wa",
    country:"usa"
};


let Holns = new Doctor({

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

    hospital:"5cc8a2e2a729120004651ce9",

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
            },

            caucassian:
            {
                raters: 10,
                rating: 3.5
            },

            men:
            {
                raters: 15,
                rating: 3.5
            },

            women:
            {
                raters: 35,
                rating: 3.5
            },

        }
    }


});


let Chi = new Doctor({

    title:
    {
        _abbreviation : "dr.",
        _full : "doctor (MD) ",
    },

    name:
    {
        firstName: " Chi ",
        
        lastName: "Hok"
    },

    address:
    {
        city: Seattle.name,
        state: Seattle.state,
        country: Seattle.country,

    },

    hospital:"5cc8a2e2a729120004651ce5",

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
                raters: 5,
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
            },

            caucassian:
            {
                raters: 10,
                rating: 3.5
            },

            men:
            {
                raters: 15,
                rating: 3.5
            },

            women:
            {
                raters: 35,
                rating: 3.5
            },

            transsexual : 
                {
                    raters : 20,

                    rating: 2,

                }, 

                transsexual_of_color : 
                {
                    raters : 18,

                    rating: 3.5,

                }, 

        }
    }


});








