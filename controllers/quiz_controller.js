var models = require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function (quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else { 
				next(new Error('No existe QuizId=' + quizId)); 
			}
		}
	).catch(function (error){ 
		next(error);
	});
};

// Get /quizes
exports.index = function(req, res){
	var searchName = req.query.search || "";
	searchName = searchName.split(" ").join("%");
	console.log(searchName);
	searchName = "%" + searchName.toLowerCase() + "%";
	console.log(searchName);

	models.Quiz.findAll({
		where: ["lower(pregunta) like ?", searchName], order:'pregunta ASC'
	}).then(
		function (quizes){
<<<<<<< HEAD
			res.render('quizes/index.ejs', {quizes: quizes, errors: [] });
=======
			res.render('quizes/index', {quizes: quizes });
>>>>>>> 16d73c920927c7c32bb0da081b8a0fb6b7ce2689
		}
	).catch(function (error) {
		next(error);
	});
};

// Get /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz, errors: [] });
};

// Get /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};


// Get /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: 'Tema'}
	);

	res.render('quizes/new', {quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );

	quiz
	.validate()
	.then(function (err) {
		if (err) {
			res.render('quizes/new', { quiz: quiz, errors: err.errors });
		} else{
			quiz // Save: guarda en DB campos pregunta y respuesta quiz
			.save( {fields: ["pregunta", "respuesta", "tema"]} )
			.then( function(){ res.redirec('/quizes')})
		}; //res.redirect: Redireccion HTTP a la lista de preguntas
	});
};


// GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz; //Auto load de la instancia de quiz

	res.render('quizes/edit', {quiz: quiz, errors: []});
}


// PUT /quizes/:id
exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz
	.validate()
	.then(function (err) {
		if (err) {
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		} else{
			req.quiz 	// Save: guarda campos pregunta y respuesta en DB
			.save( {fields: ["pregunta", "respuesta", "tema"]} )
			.then( function() { res.redirect('/quizes'); });
		};	// Redireccion HTTP a lista de preguntas (URL relativo)
	});
};


// DELETE: /quizes/:id

exports.destroy = function (req, res) {
	req.quiz.destroy().then(function () {
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
}


