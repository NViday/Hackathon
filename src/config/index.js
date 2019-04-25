

//keys

module.exports = {
    mongo_CS: process.env.MONGO_CONNECTION_STRING, 

    env: process.env.NODE_ENV || 'development',

    server_port : process.env.PORT || 5000,

    logger: {
        host: process.env.LOGGER_HOST, // Papertrail Logging Host
        port: process.env.LOGGER_PORT, // Papertrail Logging Port
    },

    real_email_key: process.env.REALEMAIL_API_KEY ,

    till_sms_key : process.env.TILL_URL,

    secret_code : " la vie ",
};