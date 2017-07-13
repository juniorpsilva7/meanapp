// config/express.js
var load = require('express-load');
var bodyParser = require('body-parser');
var express = require('express');
// var home = require('../app/routes/home'); *** removido pois foi usado o express-load
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(){
    var app = express();

    // variavel de ambiente
    app.set('port', 3000);

    // middlewares
    app.use(express.static('./public'));

    // view engine
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    
    // novs middlewares
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());


    app.use(cookieParser());
    app.use(session(
        {   secret: 'homem avestruz',
            resave: true,
            saveUninitialize: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    load('models', {cwd: 'app'}) // O parâmetro {cwd: 'app'} foi necessário para mudar o
        .then('controllers')     // diretório padrão, pois a função procura as pastas no diretório raiz
        .then('routes')          // e precisamos que ela considere a pasta app
        .into(app);

    return app;

}