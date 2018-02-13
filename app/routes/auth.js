// app/routes/auth.js

var passport = require('passport');

module.exports = function(app){
    
    var controller = app.controllers.usuario;

    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', 
            passport.authenticate('github', {
                successRedirect: '/#/lojas'
            }));
    app.get('/logout', function(req, res){
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}),
    function(req, res){
    });
    app.get('/auth/facebook/callback', 
            passport.authenticate('facebook', {
                successRedirect: '/#/lojas'
            }));

    app.route('/auth/newAccount')
        .post(controller.salvaUsuario);

    app.route('/auth/newAccount/:id')
        .delete(controller.removeUsuario);
}