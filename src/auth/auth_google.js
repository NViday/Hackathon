
//auth_google

let config = require( '../config' );

const { OAuth2Client } = require( 'google-auth-library' );



var client = new OAuth2Client( config.google_clientID, config.google_secret, '' );


async function verify_google_token(token){
    
    if(! token)
    {
        throw new Error ( "token not provided");
    }

    //verify and decode token
    ticket = await client.verifyIdToken( { idToken: token, audience: config.google_clientID } );

    if(! ticket)
    {
        throw new Error("google token verification failed");
    }
    
    var payload = decoded_token.getPayload();

    return payload;
    
}


module.exports = verify_google_token;