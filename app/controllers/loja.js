// app/controllers/loja.js

var sanitize = require('mongo-sanitize');

module.exports = function (app) {

    var Loja = app.models.Loja;

    var controller = {};

    controller.listaLojas = function (req, res) {
        Loja.find().populate('afiliada').exec()
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

    controller.obtemLoja = function (req, res) {
        var _id = req.params.id;
        Loja.findById(_id).exec()
            .then(
            function (loja) {
                if (!loja) throw new Error("Loja não encontrada");
                res.json(loja);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
            );
    };

    controller.removeLoja = function (req, res) {
        var _id = sanitize(req.params.id);
        Loja.remove({ "_id": _id }).exec()
            .then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                return console.error(erro);
            }
            );
    };

    controller.salvaLoja = function (req, res) {
        var _id = req.body._id;

        var dados = {
            "nome" : req.body.nome,
            "email" : req.body.email,
            "afiliada" : req.body.afiliada || null
        };

        if (_id) {
            Loja.findByIdAndUpdate(_id, dados).exec()
                .then(function (loja) {
                    res.json(loja);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
                );
        } else {
            Loja.create(dados)
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