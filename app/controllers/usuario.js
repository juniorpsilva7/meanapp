// app/controllers/usuario.js

var sanitize = require('mongo-sanitize');

module.exports = function (app) {

    var Usuario = app.models.Usuario;

    var controller = {};

    controller.obtemUsuario = function (req, res) {
        var _id = req.params.id;
        Usuario.findById(_id).exec()
            .then(
            function (usuario) {
                if (!usuario) throw new Error("Usuario não encontrado");
                res.json(usuario);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
        );
    };

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
            // "login": req.body.nome,
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

    controller.userExist = function (req, res){
        var email = sanitize(req.params.email);
        
        Usuario.findOne({
            'email': email
        }, function(err, usuario) {
            if (err) {
                res.status(500).json(err);
            }
            //No user was found... 
            if (!usuario) {
                res.status(200).end();
            } else {
                //found user. Return
                res.status(400).end();
            }
        });
        
    }

    return controller;
};