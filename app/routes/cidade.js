// app/routes/cidades.js

module.exports = function(app){

    var controller = app.controllers.cidade;

    app.route('/cidades')
        .get(controller.listaCidades);


    // app.route('/cidades/:id')
    //     .get(controller.obtemCidade);
};