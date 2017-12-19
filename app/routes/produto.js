// app/routes/produtos.js

var verificaAutenticacao = require('../utils/verificaAutenticacao');

module.exports = function (app) {

    var controller = app.controllers.produto;

    app.route('/produtos')
        .get(verificaAutenticacao, controller.listaProdutos)
        .post(verificaAutenticacao, controller.salvaProduto);

    app.route('/produtos/:id')
        .get(verificaAutenticacao, controller.obtemProduto)
        .delete(verificaAutenticacao, controller.removeProduto);

    app.route('/produtos/uploadFotoProduto')
        .post(verificaAutenticacao, controller.uploadFotoProduto);

    //Route para Index sem login
    app.route('/produtosIndex')
        .get(controller.listaProdutosIndex);

    app.route('/produtosIndex/:id')
        .get(controller.obtemProduto);

    // app.route('/produtos')
    //     .get(controller.listaProdutos)
    //     .post(controller.salvaProduto);

    // app.route('/produtos/:id')
    //     .get(controller.obtemProduto)
    //     .delete(controller.removeProduto);
};