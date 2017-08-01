// app/controllers/produto.js

var sanitize = require('mongo-sanitize');

module.exports = function (app) {

    var Produto = app.models.Produto;

    var controller = {};

    controller.listaProdutos = function (req, res) {
        Produto.find().populate('prodLoja').exec()
            .then(
            function (produtos) {
                res.json(produtos);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
            );
    };

    controller.obtemProduto = function (req, res) {
        var _id = req.params.id;
        Produto.findById(_id).exec()
            .then(
            function (produto) {
                if (!produto) throw new Error("Produto não encontrado");
                res.json(produto);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
            );
    };

    controller.removeProduto = function (req, res) {
        var _id = sanitize(req.params.id);
        Produto.remove({ "_id": _id }).exec()
            .then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                return console.error(erro);
            }
            );
    };

    controller.salvaProduto = function (req, res) {
        var _id = req.body._id;

        var dados = {
            "nome" : req.body.nome,
            "descricao" : req.body.descricao,
            "prodLoja" : req.body.prodLoja || null
        };

        if (_id) {
            Produto.findByIdAndUpdate(_id, dados).exec()
                .then(function (produto) {
                    res.json(produto);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
                );
        } else {
            Produto.create(dados)
                .then(
                function (produto) {
                    res.status(201).json(produto);
                },
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                }
                );
        }
    };

    return controller;
};