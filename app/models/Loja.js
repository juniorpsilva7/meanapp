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
            ref: 'Usuario',
            required: true
        },
        foto: {
            type: String,
            required: true
        },
        DBFotoUpdate: { //usado para quando for trocar imagem, deletar a imagem antiga do banco
            type: String // será sempre igual ao campo foto, diferente só quando trocar
        }
    });

    return mongoose.model('Loja', schema);
};