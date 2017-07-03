// app/controller/home.js

module.exports = function(){
    var controller = {};
    controller.index = function(req, res){
        res.render('index', {nome: 'meanApp1'});
    };
    return controller;
}