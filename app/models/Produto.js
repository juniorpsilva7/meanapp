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
        },
        usuario: {
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario',
            required: true
        },
        fotos: {
            type: [String],
            required: true
        },
        preco: {
            type: Number,
            required: true,
            get: getPreco, 
            set: setPreco
        },
        isPromo:{
            type: Boolean,
            required: true,
            default : false
        },
        promoPreco: {
            type: Number,
            get: getPreco, 
            set: setPreco
        },
        statusProduto: {
            type: String,
            enum: ['A', 'I', 'B', 'D'], // A=Ativo, I=Inativo, B=Bloqueado, D=Deletado
            required: true,
            default : 'A'
        },
        //publicado: { // ver se vai precisar pois já tem o status Ativo e Inativo

        //},
        cidadesDispo: {
            type: [String],
            required: true,
            default: ['Cidade Teste']
        }
    });

    // necessario para os getters funcionar
    schema.set('toObject', { getters: true });
    schema.set('toJSON', { getters: true });

    function getPreco(val) {
        newVal = (val / 100).toFixed(2); // preco com duas casas decimais
        newVal = newVal.replace(".", ","); // trocar ponto por vírgula (formato Brasil)
        newVal = formatPreco(newVal); // colocar um ponto a cada 3 digitos nos inteiros (ex 1.300,99) e R$ no começo
        return newVal;
    }
    function setPreco(val) {    return val * 100; }

    function formatPreco( n ) {
        n = n.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return n;
    }

    return mongoose.model('Produto', schema);
};