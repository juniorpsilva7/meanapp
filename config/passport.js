// config/passport.js

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function(){

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'af01bf2954bf20386707',
        clientSecret: '62a2bd72c7def8bfc292a7231c95a2e15835890a',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, function(acessToken, refreshToken, profile, done){

        Usuario.findOrCreate(
            { "login" : profile.username },
            { "nome" : profile.username },
            function(erro, usuario){
                if(erro){
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }
    ));
};