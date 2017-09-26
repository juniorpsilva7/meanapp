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
        usuario: {
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario'
        },
        foto: {
            type: String,
            //required: true
        }
    });

    return mongoose.model('Loja', schema);
};