

//auth

let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let auth_google = require('./auth_google'); 
let config = require('../config');

let logger = require("../utilities/logger");
const User = require("../schemas/user_schema");


//helper
function generate_token (user, device)
{
    if( !user || !device )
    {
        throw new Error ( "user or device not provided ");
    }
    let payload = 
    {
        iss: config.api_info,
        sub: user._id,
        email : user.email,
        device: device,
    };
    return jwt.sign( payload, config.secret_code, { expiresIn: '30d' });

}



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
                    message: 'failed authentification, try again'
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
                    res.status(500).send(err);
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
                                res.status(500).send(err);
                            };
                        }
                    );  
                };

                var token = generate_token(user_result, req.body.device).catch( error=>{

                    res.status(500).send({err: error, auth: false, message: 'failed registration/login with google, try again'});
    
                });
    
                res.status(200).send({ auth: true, token: token });
            }
            
            )

        }
        ).catch(err => 
            {
                logger.error(err);
                res.status(500).json(err);
            }
        );
});


router.post('/login', (req, res)=>{

    let username = req.body.username;
    let password = req.body.password;

    User.findOne({email: username},

        "_id email",
            
        (err, user_result) => 
        {
            if (err) 
            { 
                logger.error(err);
                res.status(500).json(err);
            }

            if (!user_result) 
            {
                res.status(500).send({
                    auth: false,
                    message: 'no user found'
                });
            }

            if (!user_result.validPassword(password)) 
            {
                res.status(500).send({
                    auth: false,
                    message: 'incorrect password'
                  });
            }

            var token = generate_token(user_result, req.body.device).catch( error=>{

                res.status(500).send({err: error, auth: false, message: 'failed login, try again'});

            });

            res.status(200).send({ auth: true, token: token });

        });

});


router.post('/register', (req, res)=>
{

    var new_user = new User(
        {
            names : {
                first: req.body.firstName,
                last : req.body.lastName,
            },
            email : req.body.email,
            password: req.body.password,
        },
    );

    new_user.save(
        
        (err, user) => 
        {
            if(err) 
            { 
                logger.error(err);
                res.status(500).send({
                    error : err,
                    auth: false,
                    message: 'failed registration, try again'
                  
                });;
            };

            var token = generate_token(user_result, req.body.device).catch( error=>{

                res.status(500).send({err: error, auth: false, message: 'failed registration, try again'});

            });
            res.status(200).send({ auth: true, token: token });
        }

    )


});




module.exports = router;





