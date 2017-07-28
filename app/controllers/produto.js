// app/controllers/loja.js

var sanitize = require('mongo-sanitize');

module.exports = function (app) {

    var Produto = app.models.produto;

    var controller = {};

    controller.listaProdutos = function (req, res) {
        Produto.find().populate('afiliada').exec()
            .then(
            function (lojas) {
                res.json(lojas);
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
            function (loja) {
                if (!loja) throw new Error("Produto não encontrado");
                res.json(loja);
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
            "email" : req.body.email,
            "afiliada" : req.body.afiliada || null
        };

        if (_id) {
            Produto.findByIdAndUpdate(_id, dados).exec()
                .then(function (loja) {
                    res.json(loja);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
                );
        } else {
            Produto.create(dados)
                .then(
                function (loja) {
                    res.status(201).json(loja);
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