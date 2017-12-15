// app/models/Cidade.js

var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        sigla_uf: {
            type: String,
            required: true   
        },
        nome_uf: {
            type: String,
            required: true
        },
        cidades: {
            type: [{
                codigo_ibge : Number,
                nome_municipio : String
            }],
            // get: getCidade, 
            required: true
        }
    });

    // // necessario para os getters funcionar
    // schema.set('toObject', { getters: true });
    // schema.set('toJSON', { getters: true });

    // function getCidade(cidades) {
    //     var str = [];
    //     cidades.forEach(cidade => {
    //         cidade = JSON.parse(cidade);
    //         str.push(cidade);
    //     });
    //     return str;
    // }

    return mongoose.model('Cidade', schema);
};