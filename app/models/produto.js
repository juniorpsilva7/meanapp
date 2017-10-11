// app/models/produto.js

var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true,         
        },
        prodLoja: {
            type: mongoose.Schema.ObjectId,
            ref: 'Loja',
            required: true
        }
    });

    return mongoose.model('Produto', schema);
};