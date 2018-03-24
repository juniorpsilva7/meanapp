
module.exports = function verificaAutenticacao(req, res, next){

    if (req.isAuthenticated()){
        var _idReq = req.params.id;
        var _idUser = req.user._id;
        if( _idReq ==_idUser){
            return next();
        } else {
            res.status('401').json('Não autorizado');
        }
    } else {
        res.status('401').json('Não autorizado');
    }
}