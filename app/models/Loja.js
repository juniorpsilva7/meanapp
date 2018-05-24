// app/models/loja.js

var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        cnpj: {
            type: String,
            required: true,
            index: {
                unique: true  //chave primaria nao pode ter duas lojas com mesmo cnpj
            }
        },
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
        },
        statusLoja:{
            type: String,
            enum: ['A', 'I', 'B', 'D'], // A=Ativo, I=Inativo, B=Bloqueado, D=Deletado
            required: true,
            default : 'A'
        },
        tipoContaLoja:{
            type: String,
            //enum: ['B', 'C'], // Loja e Serviços, Veículos, Supermercados, Comidas, Postos de Combustíveis, Internet e TV - definir letras para cada pacote
            //required: true,
            default : 'P'
        },
        ativoEm: {
            type: Date
            //default: Date.now
        },
        fimAtivo: {
            type: Date
            //default: Date.now
        },
        enderecoLoja:{
            type: String
        },
        bairroLoja:{
            type: String
        },
        cidadeLoja:{
            type: String,
            required: true,
            default : 'Cidade Teste'
        },
        ufLoja:{
            type: String
        },
        cepLoja:{
            type: String
        },
        telefoneLoja:{
            type: String
        }
    });

    return mongoose.model('Loja', schema);
};