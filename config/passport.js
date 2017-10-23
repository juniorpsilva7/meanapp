// config/passport.js

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
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
    }));

    passport.use(new FacebookStrategy({
        clientID: '291215501365629',
        clientSecret: '58c7085e7a1354a825fec342b5899b08',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        enableProof: true,
        profileFields: ['id', 'emails', 'name'] //This
    }, function(acessToken, refreshToken, profile, done){

        Usuario.findOrCreate(
            { "login" : profile.emails[0].value },
            { "nome" : profile.emails[0].value },
            function(erro, usuario){
                if(erro){
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );

    }));

    passport.serializeUser(function(usuario, done){
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done){
        Usuario.findById(id).exec()
        .then(function(usuario){
            done(null, usuario);
        });
    });
};