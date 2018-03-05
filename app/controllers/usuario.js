// app/controllers/usuario.js

var sanitize = require('mongo-sanitize');

module.exports = function (app) {

    var Usuario = app.models.Usuario;

    var controller = {};

    controller.removeUsuario = function (req, res) {
        var _id = sanitize(req.params.id);
        Usuario.remove({ "_id": _id }).exec()
            .then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                return console.error(erro);
            }
            );
    };

    controller.salvaUsuario = function (req, res) {
        var _id = req.body._id;
        
        var dados = {
            "login": req.body.nome,
            "nome": req.body.nome,
            "email": req.body.email,
            "senha": req.body.senha
        };

        if (_id) {
            Usuario.findByIdAndUpdate(_id, dados).exec()
                .then(function (usuario) {

                    res.json(usuario);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
                );
        } else {
            Usuario.create(dados)
                .then(
                function (usuario) {
                    res.status(201).json(usuario);
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