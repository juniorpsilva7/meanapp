// app/routes/auth.js

var passport = require('passport');

module.exports = function(app){
    
    var controller = app.controllers.usuario;

    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', 
            passport.authenticate('github', {
                successRedirect: '/#/lojas'
            }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}),
    function(req, res){
    });
    app.get('/auth/facebook/callback', 
            passport.authenticate('facebook', {
                successRedirect: '/#/lojas'
    }));

    app.post('/auth/local', passport.authenticate('local', { failureRedirect: '/error' }),
    function(req, res) {
    //   res.redirect('/success?username='+req.user.username);
    // res.send(req.user);
    res.render('index', {"usuarioLogado" : req.user.login});
    // console.log(req.user);
    // res.redirect('/#/lojas');
    });

    app.get('/logout', function(req, res){
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });

    app.route('/auth/newAccount')
        .post(controller.salvaUsuario);

    app.route('/auth/newAccount/:id')
        .delete(controller.removeUsuario);
}