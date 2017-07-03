// config/express.js
var load = require('express-load');
var express = require('express');
// var home = require('../app/routes/home'); *** removido pois foi usado o express-load

module.exports = function(){
    var app = express();

    // variavel de ambiente
    app.set('port', 3000);

    // middleware
    app.use(express.static('./public'));

    // view engine
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    load('models', {cwd: 'app'}) // O parâmetro {cwd: 'app'} foi necessário para mudar o
        .then('controllers')     // diretório padrão, pois a função procura as pastas no diretório raiz
        .then('routes')          // e precisamos que ela considere a pasta app
        .into(app);

    return app;

}