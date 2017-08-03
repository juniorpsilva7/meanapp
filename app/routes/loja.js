// app/routes/lojas.js

var verificaAutenticacao = require('../utils/verificaAutenticacao');

module.exports = function(app){

    var controller = app.controllers.loja;

    // app.route('/lojas')
    //     .get(verificaAutenticacao, controller.listaLojas)
    //     .post(verificaAutenticacao, controller.salvaLoja);

    // app.route('/lojas/:id')
    //     .get(verificaAutenticacao, controller.obtemLoja)
    //     .delete(verificaAutenticacao, controller.removeLoja);


    app.route('/lojas')
        .get(controller.listaLojas)
        .post(controller.salvaLoja);

    app.route('/lojas/:id')
        .get(controller.obtemLoja)
        .delete(controller.removeLoja);

    //Não será mais necessario o códig abaixo pois usamos o app.route
    // app.get('/lojas', controller.listaLojas);
    // app.get('/lojas/:id', controller.obtemLoja);
    // app.delete('/lojas/:id', controller.removeLoja);
};