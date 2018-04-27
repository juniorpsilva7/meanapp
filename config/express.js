// config/express.js
var load = require('express-load');
var bodyParser = require('body-parser');
var express = require('express');
// var home = require('../app/routes/home'); *** removido pois foi usado o express-load
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
// https://github.com/evilpacket/helmet
var helmet = require('helmet');
var RateLimit = require('express-rate-limit');

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
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(helmet());
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
    //app.disable('x-powered-by'); foi setado para PHP5.5 para dificultar ataques
    

    load('models', {cwd: 'app'}) // O parâmetro {cwd: 'app'} foi necessário para mudar o
        .then('controllers')     // diretório padrão, pois a função procura as pastas no diretório raiz
        .then('routes')          // e precisamos que ela considere a pasta app
        .into(app);

    // se nenhuma rota atender, direciona para pagina 404
    app.get('*', function(req, res){
        res.status(404).render('404');
    });

    //Habilitando o Rate Limiter - Protect from Brute Force and DDOS Attacks
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
 
    var limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
    });
    
    //  apply to all requests
    app.use(limiter);
    //OR

    // only apply to requests that begin with /api/
    // app.use('/api/', apiLimiter);

    return app;

}