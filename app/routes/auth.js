// app/routes/auth.js

var passport = require('passport');

module.exports = function(app){
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', 
            passport.authenticate('github', {
                successRedirect: '/#/lojas'
            }));
    app.get('/logout', function(req, res){
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', 
            passport.authenticate('facebook', {
                successRedirect: '/#/lojas'
            }));
}