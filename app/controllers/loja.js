// app/controllers/loja.js

var lojas = [
    {_id: 1, nome:'Loja Exemplo 1',
     email: 'loja1@loja1.com.br'},
     {_id: 2, nome:'Loja Exemplo 2',
     email: 'loja2@loja2.com.br'},
     {_id: 3, nome:'Loja Exemplo 3',
     email: 'loja3@loja3.com.br'},
];

module.exports = function(){
    var controller = {};

    controller.listaLojas = function(req, res){
        res.json(lojas);
    };

    controller.obtemLoja = function(req, res){
        var idLoja = req.params.id;
        var loja = lojas.filter(function(loja){
            return loja._id == idLoja;
        })[0];
        loja ? res.json(loja) : res.status(404).send('Loja não encontrada');
    };

    return controller;
};