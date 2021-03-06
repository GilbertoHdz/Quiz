
// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function (req, res, next) {
	if (req.session.user) {
		next();
	} else{
		res.redirect('/login');
	};
};

exports.checkSession = function(req,res,next){
	var now = Date.now();
	var diff=0;
	var last;

	if(req.session.user){
		last = new Date(req.session.user.last);
		diff = now - last;

		if(diff > 60000 ){
			res.redirect('/logout');
		}else{
			next();
		}
	}else{
		res.redirect('/login');
	}
};

// Get /login   -- Formulario de login
exports.new = function (req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};


// POST /login  --  Crear la session
exports.create = function (req, res) {
	
	var login	 = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function (error, user) {
		
		if (error) {
			req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
			res.redirect('/login');
			return;
		};

		// Crear req.session.user y guardar campos id u username
		// La sesión se define por la existencia de: req.session.user
		req.session.user = {id: user.id, username: user.username};

		res.redirect(req.session.redir.toString()); // redireccion a path anterior a login
	});

};


// DELETE /logout  -- Destrui session
exports.destroy = function (req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};


