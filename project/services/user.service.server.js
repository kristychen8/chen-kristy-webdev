var app = require('../../express');
var UserModelProject = require('../model/user/user.model.server.js');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    // clientID     : process.env.GOOGLE_CLIENT_ID,
    // clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL  : process.env.GOOGLE_CALLBACK_URL
    // profileFields : ['id', 'displayName', 'emails']
    clientID     : "501400882181-56bcgt28k2ms0hrjk0ravvfm4hbe46vb.apps.googleusercontent.com",
    clientSecret : "BxLTOqnG-3udzGeXIK7tOAsg",
    callbackURL  : "/auth/google/callback"
};

passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/movietag/user', createUser);
app.get('/api/movietag/user', findUser);
app.get('/api/movietag/user/:userId', findUserById);
app.put('/api/movietag/user/:userId', updateUser);
app.delete('/api/movietag/user/:userId', deleteUser);

app.post  ('/api/movietag/login', passport.authenticate('local'), login);
app.get   ('/api/movietag/checkLoggedIn', checkLoggedIn);
app.post  ('/api/movietag/logout', logout);
app.post  ('/api/movietag/register', register);
app.get ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

// var users = [
//     {_id: "123", username: "alice", password: "alice", email: "alice@wonderland.com", firstName: "Alice", lastName: "Wonder"},
//     {_id: "234", username: "bob", password: "bob", email: "bob@marley.com", firstName: "Bob", lastName: "Marley"},
//     {_id: "345", username: "charly", password: "charly", email: "charly@garcia.com", firstName: "Charly", lastName: "Garcia"},
//     {_id: "456", username: "jannunzi", password: "jannunzi", email: "jose@annunzi.com", firstName: "Jose", lastName: "Annunzi"}
// ];

function localStrategy(username, password, done) {
    UserModelProject
        .findUserByUsername(username)
        .then(
            function(user) {
                if (user.password) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
                else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    UserModelProject
        .findUserByGoogleId(profile.id)
        .then(function (user) {
            console.log(user);
                if(user){
                    return done(null, user);
                }else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return UserModelProject.createUser(newGoogleUser);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            }
        );
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    UserModelProject
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    UserModelProject
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function createUser(req, res) {
    var user = req.body;
    UserModelProject
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if (username && password) {
        UserModelProject
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            });
    }
    else if (username) {
        UserModelProject
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            });
    }
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    UserModelProject
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function updateUser(req, res) {
    var user = req.body;
    UserModelProject
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    UserModelProject
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}


