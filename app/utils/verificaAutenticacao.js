
module.exports = function verificaAutenticacao(req, res, next){
    if (req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}