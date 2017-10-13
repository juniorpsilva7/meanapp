// app/controllers/loja.js

var sanitize = require('mongo-sanitize');
var multer = require('multer');

module.exports = function (app) {

    var Loja = app.models.Loja;

    var controller = {};
    
    var nomeFoto = '';
    var diretorioFotos = './public/images/lojas/';

    controller.listaLojas = function (req, res) {
        var userId = req.user._id;
        Loja.find({usuario:userId}).exec()
            .then(
            function (lojas) {
                res.json(lojas);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
            );
    };

    controller.obtemLoja = function (req, res) {
        var _id = req.params.id;
        Loja.findById(_id).exec()
            .then(
            function (loja) {
                if (!loja) throw new Error("Loja não encontrada");
                res.json(loja);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
            );
    };

    controller.removeLoja = function (req, res) {
        var _id = sanitize(req.params.id);
        Loja.remove({ "_id": _id }).exec()
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

    controller.uploadFotoLoja = function(req, res){
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

    controller.salvaLoja = function (req, res) {
        var _id = req.body._id;
        var userId = req.user._id;
        var pathFotoLoja = "/images/lojas/" + nomeFoto;

        var dados = {
            "nome" : req.body.nome,
            "email" : req.body.email,
            "usuario" : userId,
            "foto": pathFotoLoja
        };

        if (_id) {
            Loja.findByIdAndUpdate(_id, dados).exec()
                .then(function (loja) {
                    res.json(loja);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
                );
        } else {
            Loja.create(dados)
                .then(
                function (loja) {
                    res.status(201).json(loja);
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