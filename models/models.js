var path = require('path');

//Cargar ORM
var Sequelize = require('sequelize');

//User BBDD SQLite:
var sequelize = new Sequelize(null. null, null,
						{dialect: 'sqlite', storage: 'quiz.sqlite'}
					);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

export.Quiz = Quiz; //Exportar la definición de la tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
	//success(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
		if(count === 0) { // la tabla se inicializa solo si esta vacia
			Quiz.create({
				pregunta:  'Capital de Italia',
				respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos Inicializada')});
		};
	});
});








