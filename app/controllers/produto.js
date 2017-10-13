// app/controllers/produto.js

var sanitize = require('mongo-sanitize');
var multer = require('multer');

module.exports = function (app) {

    var Produto = app.models.Produto;

    var controller = {};

    var nomeFoto = '';
    var diretorioFotos = './public/images/produtos/';

    controller.listaProdutos = function (req, res) {
        Produto.find().populate('prodLoja').exec()
            .then(
            function (produtos) {
                res.json(produtos);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
            );
    };

    controller.obtemProduto = function (req, res) {
        var _id = req.params.id;
        Produto.findById(_id).exec()
            .then(
            function (produto) {
                if (!produto) throw new Error("Produto não encontrado");
                res.json(produto);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
            );
    };

    controller.removeProduto = function (req, res) {
        var _id = sanitize(req.params.id);
        Produto.remove({ "_id": _id }).exec()
            .then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                return console.error(erro);
            }
            );
    };

    // ================= UPLOAD IMAGE API
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, diretorioFotos);
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            var storageNomeFoto = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            nomeFoto = storageNomeFoto;
            cb(null, storageNomeFoto);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    controller.uploadFotoProduto = function(req, res){
        upload(req,res,function(err){
            if(err){
                console.log(err);
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            res.json({error_code:0,err_desc:null});
        });
    };
    // ================= UPLOAD IMAGE API

    controller.salvaProduto = function (req, res) {
        var _id = req.body._id;
        console.log(req.body.prodLoja);
        var pathFotoLoja = "/images/produtos/" + nomeFoto;

        var dados = {
            "nome" : req.body.nome,
            "descricao" : req.body.descricao,
            "prodLoja" : req.body.prodLoja || null,
            "foto": pathFotoLoja
        };

        if (_id) {
            Produto.findByIdAndUpdate(_id, dados).exec()
                .then(function (produto) {
                    res.json(produto);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
                );
        } else {
            Produto.create(dados)
                .then(
                function (produto) {
                    res.status(201).json(produto);
                },
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                }
                );
        }
    };

    return controller;
};