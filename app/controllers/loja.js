// app/controllers/loja.js

module.exports = function(app){
    
    var Loja = app.models.loja;
    
    var controller = {};

    controller.listaLojas = function(req, res){
        Loja.find().exec()
            .then(
                function(lojas){
                    res.json(lojas);
                },
                function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );   
    };

    controller.obtemLoja = function(req, res){};

    controller.removeLoja = function(req, res){};

    controller.salvaLoja = function(req, res){};

    return controller;
};