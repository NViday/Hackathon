

//config

module.exports = {

    mongo_CS: process.env.MONGO_CONNECTION_STRING, 

    env: process.env.APP_ENV || 'development',

    server_port : process.env.PORT || 5000,

    //real_email_key: process.env.REALEMAIL_API_KEY ,

    //till_sms_key : process.env.TILL_URL,

    api_info : process.env.API_ENDPOINT,

    secret_code : process.env.SECRET_CODE,

    google_clientID : process.env.GOOGLE_CLIENT_ID,

    google_clientID : process.env.GOOGLE_SECRET_CODE,
};