// app/routes/index.js

module.exports = function(app){
    app.get('/', function(req, res){
        var login = '';
        var nome = '';
        var usuarioId = '';
        if(req.user){
            login = req.user.login;
            nome = req.user.nome
            usuarioId = req.user._id;
        }
        res.render('index', {"usuarioLogado" : nome, "usuarioId" : usuarioId});
    });
};