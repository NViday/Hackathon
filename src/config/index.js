

//keys

module.exports = {
    mongo_CS: process.env.MONGO_CONNECTION_STRING, 
    env: process.env.NODE_ENV || 'development',
    logger: {
        host: process.env.LOGGER_HOST, // Papertrail Logging Host
        port: process.env.LOGGER_PORT, // Papertrail Logging Port
    },

    REAL_EMAIL_Key : process.env.REALEMAIL_API_KEY ,

    TILL_SMS_URL : process.env.TILL_URL,

    SECRET_CODE: " la vie ",
};