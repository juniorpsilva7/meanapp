// app/routes/lojas.js

module.exports = function(app){
    var controller = app.controllers.loja;
    app.get('/lojas', controller.listaLojas);
    app.get('/lojas/:id', controller.obtemLoja);
}