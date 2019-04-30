

//config

module.exports = {

    local_mongo : "mongodb+srv://dbAdmin:vv7HDfvAYkfnVKbi@cluster0-ydbjm.gcp.mongodb.net/alifedb",

    mongo_CS: process.env.MONGO_CONNECTION_STRING || local_mongo, 

    //real_email_key: process.env.REALEMAIL_API_KEY ,

    //till_sms_key : process.env.TILL_URL,

    api_info : process.env.API_ENDPOINT,

    secret_code : process.env.SECRET_CODE,

    google_clientID : process.env.GOOGLE_CLIENT_ID,

    google_clientID : process.env.GOOGLE_SECRET_CODE,
};