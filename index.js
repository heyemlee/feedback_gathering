const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys'); 
const app = express();

//Config Google strategy with Passport.
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    //The redirected URL after completing the Google login process.
    callbackURL: '/auth/google/callback'
}, accessToken => {
    //Callback function, receive the accessToken returned from Google.
    console.log(accessToken );
}));

//Create authentication route.  
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 3000;
app.listen(PORT);