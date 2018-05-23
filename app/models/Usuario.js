// app/models/Usuario.js

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function(){
    var schema = mongoose.Schema({
        // login: {
        //     type: String,
        //     required: true,
        //     index: {
        //         unique: true
        //     }
        // },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        nome: {
            type: String,
            required: true
        },
        inclusao: {
            type: Date,
            default: Date.now
        },
        senha: {
            type: String
        },
        tipoUser:{
            type: String,
            enum: ['B', 'C'], // B=Basico, C=Comercial
            required: true,
            default : 'B'
        },
        emailValidado:{
            type: Boolean,
            required: true,
            default : false
        },
        statusUser:{
            type: String,
            enum: ['A', 'I', 'B', 'D'], // A=Ativo, I=Inativo, B=Bloqueado, D=Deletado
            required: true,
            default : 'A'
        },
        instritoEmails:{
            type: Boolean,
            required: true,
            default : true
        },
        enderecoUser:{
            type: String
        },
        bairroUser:{
            type: String
        },
        cidadeUser:{
            type: String,
            required: true,
            default : 'Cidade Teste'
        },
        ufUser:{
            type: String
        },
        cepUser:{
            type: String
        },
        telefoneUser:{
            type: String
        },
        cpfUser:{
            type: String
        },
        fotoUser: {
            type: String
        }
    });
    schema.plugin(findOrCreate);
    return mongoose.model('Usuario', schema);
};