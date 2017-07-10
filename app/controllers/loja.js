// app/controllers/loja.js

module.exports = function (app) {

    var Loja = app.models.loja;

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
        var _id = req.params.id;
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
        
        //testando por undefined
        req.body.afiliada = req.body.afiliada || null;

        if (_id) {
            Loja.findByIdAndUpdate(_id, req.body).exec()
                .then(function (loja) {
                    res.json(loja);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
                );
        } else {
            Loja.create(req.body)
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