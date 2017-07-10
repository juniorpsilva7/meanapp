// app/models/loja.js

var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true  //chave primaria nao pode ter duas lojas com mesmo email
            }            
        },
        afiliada: {
            type: mongoose.Schema.ObjectId,
            ref: 'Loja'
        }
    });

    return mongoose.model('Loja', schema);
};