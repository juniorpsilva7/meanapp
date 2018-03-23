
module.exports = function verificaAutenticacao(req, res, next){
    var _idReq = req.params.id;
    var _idUser = req.user._id;
    if (req.isAuthenticated() && _idReq==_idUser){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}