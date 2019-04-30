
//populate_hospital
let logger = require("../utilities/logger");
let Hospital = require('../schemas/hospital_schema'); 

let Seattle = {

    name: "seattle",
    state: "wa",
    country:"usa"
};


var hUW = new Hospital({
    name: "UW Medicine ",
    address:
    {
        street:" (various location)",
        city: Seattle.name,
        state: Seattle.state,
        country:Seattle.country,
        zipcode: 98105

    },

    website: "www.uwmedicine.org", 

});


var hSeaCenter = new Hospital(
    {
        name: "Northwest Women's Healthcare",
        address:
        {
            street:"1101 Madison St #1150",
            city: Seattle.name,
            state: Seattle.state,
            country:Seattle.country,
            zipcode: 98104
    
        },
    
        website: "n/a", 
    }
);

var hSwedish = new Hospital(
    {
        name: "Swedish First Hill Campus",
        address:
        {
            street: " 714 Broadway",
            city: Seattle.name,
            state: Seattle.state,
            country:Seattle.country,
            zipcode: 98122

        },

        website: "www.swedish.org/locations/first-hill-campus", 

    }

);



var hVM = new Hospital({
    name: "Virginia Mason Hospital" ,
    address:
    {
        street:"1100 9th Ave",
        city: Seattle.name,
        state: Seattle.state,
        country:Seattle.country,
        zipcode: 98101,

    },

    website: "www.virginiamason.org", 

});

var hMC = new Hospital(
    {
        name: "Harborview Medical Center",
        address:
        {
            street:"325 9th Ave",
            city: Seattle.name,
            state: Seattle.state,
            country:Seattle.country,
            zipcode: 98104,

        },

        website: "www.uwmedicine.org/locations/harborview-medical-center", 
    }
);

var hospitals = [hVM, hMC, hSeaCenter, hSwedish, hUW];

function generateHospital()
{
    hospitals.forEach((entry)=>
{

    entry.save(
        (err, user) =>
        {
            if(err)
            {
                logger.error("saving "+entry.name + "failed. err "+ err);
            }
            logger.error("saving "+entry.name + "successful");
        }
    )
});
};



module.exports = generateHospital;