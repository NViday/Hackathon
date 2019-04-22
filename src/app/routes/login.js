//login 
let passport = require('../utilities/auth/passport')


//local 
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);



//Twitter
//go to twitter
app.get('/auth/twitter', passport.authenticate('twitter'));

//back from twitter
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));


//Google 
//go to google 
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// back from Google
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');});



//Facebook 
//go to facebook
app.get('/auth/facebook', passport.authenticate('facebook'));

//back from facebook
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));