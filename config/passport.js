// config/passport.js

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;
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
        var nome = "";
        nome = profile.name.givenName +  " " + profile.name.familyName;
        console.log(profile._json);

        // Usuario.findOrCreate(
        //     { "login" : profile.emails[0].value },
        //     { "email" : profile.emails[0].value },
        //     { "nome" : nome },
        //     function(erro, usuario){
        //         if(erro){
        //             console.log(erro);
        //             return done(erro);
        //         }
        //         return done(null, usuario);
        //     }
        // );

        Usuario.findOne({
            'email': profile.emails[0].value
        }, function(err, usuario) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!usuario) {
                usuario = new Usuario({
                    nome: profile._json.first_name + " " + profile._json.last_name,
                    login: profile.emails[0].value,
                    email: profile.emails[0].value,
                    provider: 'facebook',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    facebook: profile._json
                });
                usuario.save(function(err) {
                    if (err) console.log(err);
                    return done(err, usuario);
                });
            } else {
                //found user. Return
                return done(err, usuario);
            }
        });

    }));

    passport.use(new LocalStrategy(
        function(username, senha, done) {
            console.log(username);
            console.log(senha);
            Usuario.findOne({
              email: username
            }, function(err, usuario) {
              console.log(usuario);
              if (err) {
                return done(err);
              }
      
              if (!usuario) {
                return done(null, false);
              }
      
              if (usuario.senha != senha) {
                console.log("senha diferente");
                return done(null, false);
              }
              console.log("OK!!!");
              return done(null, usuario);
            });
        }
      ));


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