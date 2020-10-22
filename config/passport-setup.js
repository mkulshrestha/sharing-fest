const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    });
});

//Use startegy
passport.use(
    new GoogleStrategy({
        //Options for google start
        callbackURL: 'auth/google/redirect',
        clientID : keys.Google.clientId,
        clientSecret : keys.Google.clientSecret
    }
    , (accessToken, refreshToken, profile, done) =>{
        //passport callback function
        User.findOne({
            googleId : profile.id
        }).then((currentUser)=>{
            if(currentUser){
                //User already exists\
                console.log('Current User: ',currentUser);
                done(null,currentUser);
            }else{
                //Create new user as it doesn't exists
                User.create({
                    username : profile.displayName ,
                    googleId : profile.id,
                    thumbnail: profile._json.picture
                }).then((newUser)=>{
                    console.log('New User Created: '+newUser);
                    done(null,newUser);               
                });
            }
        });
        
    }
));