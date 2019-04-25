//passport


let config = require("../config");
let mongoose = require('mongoose');
let passport = require('passport'),
    local_strategy = require('passport-local').Strategy, 
    facebook_strategy = require ('passport-facebook').Strategy, 
    twitter_strategy = require('passport-twitter').Strategy, 
    google_strategy  = require('passport-google-oauth').Strategy;

const User= mongoose.model('User');



//Local

passport.use(new local_strategy
    ( 
        {

            usernameField: 'email',
            passwordField: 'password'

    
        },
        (username, password, done) => 
        {
            User.findOne({email: username},
            
                (err, user_result) => 
                {
                    if (err) { return done(err);}

                    if (!user_result) 
                    {
                        return done(null, false, { message: 'No user with such username' });
                      
                    }

                    if (!user_result.validPassword(password)) 
                    {
                        return done(null, false, { message: 'Incorrect password.' });
                    }

                    return done(null, user_result);

                });
                

        }
));



//Google 
passport.use(new google_strategy
    (
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.TWITTER_CONSUMER_SECRET,
            callbackURL: "http://www.(heroku something).com/auth/google/callback",

            profileFields : ["id", "name", "picture.type(large)", "emails", ]
        },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate( { "provider.id" : profile.id }, function(err, user_result) {
        if (err) { logger.error(err); return done(err); }

        if(!user_result)
        {

          user_result = new User 
          (
              {
                  pictureURI : profile.photos[0].value,
                  email : profile.emails[0].value,
                  isEmailVerified : true,
                  fullName: profile.displayName, 
                  personal_info : 
                  {
                      birthday : new Date(profile.birthday),
                  },
                  provider:
                  {
                      name : "facebook",
                      id : profile.id,
                      profileURL = profile.profileUrl,
                      profile : profile._json,
                  },
              }
          );

          user_result.save((err)=>
          {
              if(err) { logger.error(err); return done(err);}
          })

        }

        done(null, user_result);
      });
  }
    )
);


// Twitter 
passport.use(new twitter_strategy
    (
        {
            consumerKey: config.TWITTER_CONSUMER_KEY,
            consumerSecret: config.TWITTER_CONSUMER_SECRET,
            callbackURL: "http://www.(heroku something).com/auth/twitter/callback",

            profileFields : ["id", "name", "picture.type(large)", "emails",  ]
        },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate( { "provider.id" : profile.id }, function(err, user_result) {
        if (err) { logger.error(err); return done(err); }

        if(!user_result)
        {

          user_result = new User 
          (
              {
                  pictureURI : profile.photos[0].value,
                  email : profile.emails[0].value,
                  isEmailVerified : true,
                  fullName: profile.displayName, 
                  personal_info : 
                  {
                      birthday : new Date(profile.birthday),
                  },
                  provider:
                  {
                      name : "facebook",
                      id : profile.id,
                      profileURL = profile.profileUrl,
                      profile : profile._json,
                  },
              }
          );

          user_result.save((err)=>
          {
              if(err) { logger.error(err); return done(err);}
          })

        }

        done(null, user_result);
      });
  }
    )
);



//Facebook 

passport.use(new facebook_strategy
    (
        {
            clientID : config.FACEBOOK_APP_ID, 

            clientSecret : config.FACEBOOK_APP_SECRET,

            callbackURL: "http://www.(heroku something).com/auth/facebook/callback",

            profileFields : ["id", "name", "picture.type(large)", "emails"]
        },

        (accessToken, refreshToken, profile, done)=> {
            User.findOrCreate( { "provider.id" : profile.id }, function(err, user_result) {
              if (err) { logger.error(err); return done(err); }

              if(!user_result)
              {

                user_result = new User 
                (
                    {
                        pictureURI : profile.photos[0].value,
                        email : profile.emails[0].value,
                        isEmailVerified : true,
                        fullName: profile.displayName, 
                        personal_info : 
                        {
                            birthday : new Date(profile.birthday),
                        },
                        provider:
                        {
                            name : "facebook",
                            id : profile.id,
                            profileURL = profile.profileUrl,
                            profile : profile._json,
                        },
                    }
                );

                user_result.save((err)=>
                {
                    if(err) { logger.error(err); return done(err);}
                })

              }

              done(null, user_result);
            });
          }
    )
    
    );



    //sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });