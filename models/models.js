var path = require('path');

//process.env.DATABASE_URL = "sqlite://:@:/";

// Postgress DATABASE_URL = postgress://user:passwd@host:port/database
// SQLite 	 DATABASE_URL = sqlite://:@:/
console.log(process.env.DATABASE_URL);
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user 	 = (url[2] || null);
var pwd 	 = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port 	 = (url[5] || null);
var host 	 = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar  Modelo ORM
var Sequelize = require('sequelize');

//User BBDD SQLite o Postgres:
var sequelize = new Sequelize(DB_name, user, pwd,
	{ 
		dialect:  protocol, 
		protocol: protocol,
		port: 	  port,
		host: 	  host,
		storage:  storage,  // Solo SQLite (.env)
		omitNull: true		// Solo Postgres
	}
);

//Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

//Importar la definicion de la tabla Comment en quiz.js
var comment_path = path.join(__dirname, 'comment'); //Aqui funcionaba pero con heroku es mas minucioso y no funcionaba
var Comment = sequelize.import(comment_path);

//Relaciones
Comment.belongsTo(Quiz); //Comentario pertenece a quiz
Quiz.hasMany(Comment); // un quiz tiene muchos comentarios

exports.Quiz = Quiz; //Exportar la definición de la tabla Quiz
exports.Comment = Comment;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	//then(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count){
		if(count === 0) { // la tabla se inicializa solo si esta vacia
			Quiz.create({ 
				pregunta: 'Capital de Italia',
				respuesta: 'Roma',
				tema: 'Humanidades'
			});
			Quiz.create({ 
				pregunta: 'Capital de Portugal',
				respuesta: 'Lisboa',
				tema: 'Humanidades'
			})
			.then(function(){console.log('Base de datos Inicializada')});
		};
	});
});








