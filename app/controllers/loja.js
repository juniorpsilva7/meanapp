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
    var ID_LOJA_INC = 3;
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

    controller.removeLoja = function(req, res){
        var idLoja = req.params.id;
        lojas = lojas.filter(function(loja){
            return loja._id != idLoja;
        });
        res.status(204).end();
    };

    controller.salvaLoja = function(req, res){

        var loja = req.body;
        loja = loja._id ? atualiza(loja) : adiciona(loja);
        res.json(loja);
    };

    function adiciona(lojaNova){
        lojaNova._id = ++ID_LOJA_INC;
        lojas.push(lojaNova);
        return lojaNova;
    }

    function atualiza(lojaAlterar){
        lojas = lojas.map(function(loja){
            if(loja._id == lojaAlterar._id){ 
                loja = lojaAlterar; 
            }
            return loja;
        });
        return lojaAlterar;
    }

    return controller;
};