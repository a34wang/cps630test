var User = require('../models/user');


module.exports= function(router){

    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.businessFollowing = ["apple", "google", "alibaba"];
        console.log(user.businessFollowing);
        
        if(req.body.username ==null|| req.body.username == ''||req.body.password == null || req. body.password == ''){
            
             res.json({success:false,message:'Please enter your username and password'});
    
        }
        else {
        user.save( function(err){if(err){
            res.json({success:false,message:'User name already exitst'});


        }
        else { res.json({success:true,message:'User registered'});
    }});
        }
       
    });
    
    router.post('/news', (req,res) => {
        res.json({stuff: req.session.user});
    });

    router.post('/authenticate', function(req,res) {
        User.findOne({username: req.body.username}).select('businessFollowing email username password').exec(function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Could not Authenticate User'});
            } else if (user)  {
                if(req.body.password) {   
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({ success: false, message: 'Could not validate Password' });
                    } else {                
                        res.json({ success: true, message: 'User Authenticate', user: user});
                        
                    }
                } else {
                    res.json({ success: false, message: 'No password provided' });
                }
            }
        });
    });
return router;
}



