

exports.question = function(req, res){
	console.log('question');
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

exports.answer = function(req, res){
	console.log('answer');
	console.log('answer');
	if (req.query.respuesta == 'Roma') {
		res.render('quizes/answer', {respuesta: 'Correcto'});
	} else{
		res.render('quizes/answer', {respuesta: 'Incorrecto'});

	};
};