const router = require('express').Router();

const authCheck = (req,res,next)=>{
    if(!req.user){
        //Not logged in
        res.redirect('/auth/login');
    }else{
        //Logged in
        next();
    }
};

router.get('/',authCheck ,(req,res)=>{
    res.render('profile',{user:req.user})
});

module.exports = router;