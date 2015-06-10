var path = require('path'),
	Sequelize = require('sequelize');

// BBDD
var sequelize = new Sequelize(null, null, null,
								{ dialect: 'sqlite', storage: 'quiz.sqlite' });

// Definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

// Cargar e inicializar si está vacía
sequelize.sync().then(function () {
	Quiz.count().then(function (count) {
		if (count === 0) {
			Quiz.bulkCreate([
				{
					pregunta:  'Capital de Italia',
					respuesta: 'Roma'
				},
				{
					pregunta:  'Capital de España',
					respuesta: 'Madrid'
				},
				{
					pregunta:  'Nombre de nuestro planeta',
					respuesta: 'Tierra'
				},
				{
					pregunta:  'Nombre de nuestro satélite',
					respuesta: 'Luna'
				}
			]).then(function () {
				console.log('Base de datos inicializada');
			});
		}
	});
})
