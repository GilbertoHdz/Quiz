//Definicion del modelo de Quiz

module.exports = function(sequelize, DataType){
	return sequelize.define('Quiz',
			{
				pregunta:  DataType.STRING,
				respuesta: DataType.STRING,
			});
}