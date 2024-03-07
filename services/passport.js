const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys'); 
const mongoose = require('mongoose');
const User = mongoose.model('users');

//Stored in session
//allowing users to maintain their authentication status throughout the session after logging in.
passport.serializeUser((user, done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null, user);
    })

});
//Config Google strategy with Passport.
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    //The redirected URL after completing the Google login process.
    callbackURL: '/auth/google/callback'
}, (accessToken,  refreshToken, profile, done) => {
    //Callback function, receive the accessToken returned from Google.
    User.findOne ({googleId: profile.id}).then(existingUser=>{
        if(existingUser){
            done(null, existingUser);
        }else{
            new User({googleId: profile.id }).save().then(user=> done(null, uesr));
        }
     });
}));