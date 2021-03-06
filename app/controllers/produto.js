// app/controllers/produto.js

var sanitize = require('mongo-sanitize');
var multer = require('multer');
var fs = require('fs');

module.exports = function (app) {

    var Produto = app.models.Produto;

    var controller = {};

    var nomeFoto = '';
    var strPathFoto = [];
    var diretorioFotos = './public/images/produtos/';

    controller.listaProdutos = function (req, res) {
        var userId = req.user._id;
        Produto.find({ usuario: userId }).populate('prodLoja').exec()
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

    controller.listaProdutosIndex = function (req, res) {
        Produto.find().exec()
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

        var pathProdutoFotoDel;        

        Produto.findOne({ _id: _id }, function (err, produto) {
            pathProdutoFotoDel = produto.fotos; //string de fotos
            removeFotoProduto(pathProdutoFotoDel);
        });

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
            var storageNomeFoto = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
            strPathFoto[strPathFoto.length] = "/images/produtos/" + storageNomeFoto;
            //strPathFoto[i] = "/images/produtos/" + storageNomeFoto;
            cb(null, storageNomeFoto);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).array('files', 3);

    // ================= UPLOAD IMAGE API

    controller.uploadFotoProduto = function (req, res) {
        strPathFoto = [];
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null });
        });
    };

    controller.salvaProduto = function (req, res) {
        var _id = req.body._id;
        var userId = req.user._id;
        //var pathFotoLoja = "/images/produtos/";// + nomeFoto;
        //console.log(pathFotoLoja);

        var dados = {
            "nome": req.body.nome,
            "descricao": req.body.descricao,
            "prodLoja": req.body.prodLoja,
            "usuario": userId,
            "fotos": strPathFoto,
            "preco": req.body.preco
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

    //**************************** HELP FUNCTIONS **************************** 
    //========================================================================

    function removeFotoProduto(pathLojaFotoDel) {
        //console.log('... TESTE 2 ' + JSON.stringify(pathProdutoFotoDel));
        pathLojaFotoDel.forEach(foto => {
            fs.unlink("./public" + foto, (err) => {
                if (err) {
                    console.log("failed to delete local image:" + err);
                } else {
                    console.log('successfully deleted local image');
                }
            });            
        });

    }

    //***************************** END HELPSET  ***************************** 
    //========================================================================

    return controller;
};