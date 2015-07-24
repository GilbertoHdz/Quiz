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
			res.render('quizes/index', {quizes: quizes });
		}
	).catch(function (error) {
		next(error);
	});
};

// Get /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz});
};

// Get /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado });
};