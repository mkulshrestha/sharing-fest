const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//Set up engine
app.set('view engine','ejs');
mongoose.Promises = module.Promises;
app.use(express.static('public'));
//Connect to database
mongoose.connect(keys.mondgoDb.dbURL,{useUnifiedTopology: true,
    useNewUrlParser: true},(err)=>{
        if(err) throw err;
        console.log('Connection with database established');
});

app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000,
    keys : [keys.session.cookieKey]
}));

//initialize Passport
app.use(passport.initialize());
app.use(passport.session());
//Auth  routes
app.use('/auth',authRoutes);

//profile routes
app.use('/profile',profileRoutes);


//setup home route
app.use('/',(req,res) => {
    console.log(req.url);
    res.render('home',{user:req.user});
});


app.listen(3000, () => {
    console.log('Now listening to 3000');
});