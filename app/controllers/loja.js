// app/controllers/loja.js

var sanitize = require('mongo-sanitize');
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' }).single('foto');

module.exports = function (app) {

    var Loja = app.models.Loja;

    var controller = {};

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
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('foto');

    controller.uploadFotoLoja = function(req, res){
        console.log('1');
        upload(req,res,function(err){
            console.log('12');
            if(err){
                console.log(err);
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            console.log('123');
            res.json({error_code:0,err_desc:null});
        });
    };
    // ================= UPLOAD IMAGE API

    controller.salvaLoja = function (req, res) {
        var _id = req.body._id;
        var userId = req.user._id;
        //var nomeFoto = req.body.foto.name;
        var nomeFoto = 'TesteNomeFoto.jpg';

        var dados = {
            "nome" : req.body.nome,
            "email" : req.body.email,
            "usuario" : userId,
            "foto": nomeFoto
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