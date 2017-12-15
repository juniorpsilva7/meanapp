// app/controllers/cidade.js

var sanitize = require('mongo-sanitize');

module.exports = function (app) {

    var Cidade = app.models.Cidade;

    var controller = {};

    controller.listaCidades = function (req, res) {
        Cidade.find({}).exec()
            .then(
            function (cidades) {
                res.json(cidades);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
            );
    };

    
    return controller;
};