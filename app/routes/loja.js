// app/routes/lojas.js

function verificaAutenticacao(req, res, next){
    if (req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function(app){

    var controller = app.controllers.loja;

    app.route('/lojas')
        .get(verificaAutenticacao, controller.listaLojas)
        .post(verificaAutenticacao, controller.salvaLoja);

    app.route('/lojas/:id')
        .get(verificaAutenticacao, controller.obtemLoja)
        .delete(verificaAutenticacao, controller.removeLoja);

    //Não será mais necessario o códig abaixo pois usamos o app.route
    // app.get('/lojas', controller.listaLojas);
    // app.get('/lojas/:id', controller.obtemLoja);
    // app.delete('/lojas/:id', controller.removeLoja);
};