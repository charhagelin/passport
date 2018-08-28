const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret)
}

exports.signin = function(req, res, next) {
    //user has already had their email and password authed. just nedd to give a token
    res.send({ token: tokenForUser(req.user )})
}

exports.signup = function(req, res, next) {
   
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error: 'you must provide email and password '})
    }
    //see if a user with a given email exists 
    User.findOne({ email: email }, function(err, existingUser) {
        if(err) {
            return next(err);
        }
        if(existingUser) {
            return res.status(422).send({ err: 'email is in use' });
        }
     //if a user with email does exist, return error

    //if a user with email does NOT exist, create and save user records

        const user = new User({
            email: email,
            password: password
        });
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.json({ token: tokenForUser(user) });
        });
    });
   
    //res to teq that user was created
}