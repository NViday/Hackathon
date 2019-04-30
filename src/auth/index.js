

//auth
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let auth_google = require('./auth_google'); 
let config = require('../config');

let logger = require("../utilities/logger");
const User = require("../schemas/user_schema");


//error
let google_message = 'failed login with google, try again';
let login_message = 'failed login, try again';
let register_message = 'failed register, try again';
let token_failed = "token creation failed, try again";

//helper
function generate_token (user, device)
{
    if( !user || !device )
    {
        return null;
    }
    let payload = 
    {
        iss: config.api_info,
        sub: user._id,
        email : user.email,
        device: device,
    };
    jwt.sign( payload, config.secret_code, { expiresIn: '30d' }, (err, token )=>
    {
        if(err)
        {
            return null;
        }
        return token;
    });

};



router.post('/google', (res, req) =>
{
    let provider = 'google';
    const token = req.body.google_token;
    auth_google(token)
    .then( payload => 
        {
            if(!payload)
            {
                res.status(500).send({
                    error: "payload is empty",
                    auth: false,
                    message: google_message
                  });
            };

            const id = payload['sub'];

            //login or register user
            User.findOrCreate({'provider.name': provider ,'provider.id':id}, 
            
            "_id email",

            //callback function
            (err, found_user)=>
            {
                if(err) 
                { 
                    logger.error(err);
                    res.status(500).send({
                        error: err,
                        auth: false,
                        message: google_message
                      });
                };

                if(!found_user)
                {
                    var new_user = new User(
                        {
                            fullName : payload['name'],
                            email : payload['email'],
                            isEmailVerified : payload['email_verified'],
                            pictureURI : payload['picture'],
                            provider:
                            {
                                name: provider,
                                url : payload['iss'],
                                id: payload['sub'],
                            },
                        },
                    );

                    new_user.save( 
                        //callback function
                        (err)=>
                        {
                            if(err) 
                            { 
                               logger.error(err);
                               res.status(500).send({
                                    error: err,
                                    auth: false,
                                    message: google_message
                                });
                            };
                        }
                    );  
                };


                //generate token 

                var token = generate_token(found_user, req.body.device);
                
                if(!token){
                    res.status(500).send({
                         auth: false,
                         message: token_failed
                     });
                };

                res.status(200).send({ auth: true, token: token });
    
            })

        }
        ).catch(err => 
            {
                logger.error(err);
                res.status(500).send({
                     error: err,
                     auth: false,
                     message: google_message
                 });
            }
        );
});


router.post('/login', (req, res)=>{

    let username = req.body.username;
    let password = req.body.password;

    User.findOrCreate({email: username},

        "_id email",
            
        (err, user_result) => 
        {
            if (err ) 
            { 
                logger.error(err);
                res.status(500).send({
                     error: err,
                     auth: false,
                     message: login_message
                 });
            }

            if (!user_result) 
            {
                res.status(500).send({
                    error: "user not found",
                    auth: false,
                    message: login_message
                  });
            }

            if (!user_result.validPassword(password)) 
            {
                res.status(500).send({
                    error: "incorrect password",
                    auth: false,
                    message: login_message
                  });
            }

            var token = generate_token(user_result, req.body.device);

            if(!token){
    
                res.status(500).send(
                    { auth: false, message: token_failed});

            };

            res.status(200).send({ auth: true, token: token });

            

        });

});


router.post('/register', (req, res)=>
{
    let username = req.body.email;

    User.findOrCreate({email: username},

        "_id email",
            
        (err, found_user) => 
        {
            if (err) 
            { 
                logger.error(err);
                res.status(500).send({
                    error: err,
                    auth: false,
                    message: register_message
                  });
            }

            if(found_user)
            {
                res.status(500).send({
                    auth: false,
                    message: 'account exist already'
                });
            }

            if (!found_user) 
            {

                 var new_user = new User(
                {
                    names : 
                    {
                        first: req.body.firstName,
                        last : req.body.lastName,
                    },
                    email : username,
                    password: req.body.password,
                });

                new_user.save(
        
                (err, user) => 
                {
                    if(err) 
                    { 
                        logger.error(err);
                        res.status(500).send({
                        error : err,
                        auth: false,
                        message: register_message
                  
                        });;
                    };

                    var token = generate_token(user, req.body.device);

                    if(!token){
    
                        res.status(500).send({ auth: false, message:token_failed});
    
                    };
        
                    res.status(200).send({ auth: true, token: token });
                });
            };

        

            

        });

});




module.exports = router;





