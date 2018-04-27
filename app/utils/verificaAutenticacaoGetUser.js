
module.exports = function verificaAutenticacao(req, res, next){

    if (req.isAuthenticated()){
        var _idReq = req.params.id; // id do user a ser pesquisado
        var _idUser = req.user._id; // id do user q enviou a req
        if( _idReq ==_idUser){ // ele só poderá obter as informaçoes do usuario se for ele mesmo
            return next();
        } else {
            res.status('401').json('Não autorizado');
        }
    } else {
        res.status('401').json('Não autorizado');
    }
}