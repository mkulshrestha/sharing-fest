const AuthRouter = require('express').Router();
const passport = require('passport')

//Auth login 
AuthRouter.get('/login',(req,res) =>{
    
    res.render('login',{user:req.user});
});

//Auth logout 
AuthRouter.get('/logout',(req,res) =>{
    //handle with passport later
    req.logOut();
    res.redirect('/');
});

//Sign in with google
AuthRouter.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

//Redirect callback URI for google
AuthRouter.use('/google/redirect',passport.authenticate('google'),(req,res) =>{
    res.redirect('/profile/');
});

module.exports = AuthRouter;