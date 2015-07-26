//Definicion del modelo de Quiz

module.exports = function(sequelize, DataType){
	return sequelize.define('Quiz',
			{
				pregunta: {
					type: DataType.STRING,
					validate: { notEmpty: {msg: "-> Falta Pregunta"}}
				},
				respuesta: {
					type: DataType.STRING,
					validate: { notEmpty: {msg: "-> Falta Respuesta"}}
				},
				tema: {
					type: DataType.STRING,
					validate: { notEmpty: {msg:"-> Falta Tema"}}
				}
			}
		);
}