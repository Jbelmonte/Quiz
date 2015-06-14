var path = require('path'),
	Sequelize = require('sequelize');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*)?\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null),
	user     = (url[2] || null),
	pwd      = (url[3] || null),
	protocol = (url[1] || null),
	dialect  = (url[1] || null),
	port     = (url[5] || null),
	host     = (url[4] || null),
	storage  = process.env.DATABASE_STORAGE;

// BBDD
var sequelize = new Sequelize(DB_name, user, pwd,
							{
								dialect: dialect,
								protocol: protocol,
								port: port,
								host: host,
							    storage: storage,
								omitNull: true
							});

// Definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

// Tematica
var Tematica = sequelize.import(path.join(__dirname, 'tematica'));
exports.Tematica = Tematica;

// Cargar e inicializar si está vacía
sequelize.sync().then(function () {
	// Inicializar Quiz
	Tematica.count().then(function (count) {
		if (count === 0) {
			Tematica.bulkCreate([
				{ codigo: 'otro', descripcion: 'Otro'},
				{ codigo: 'humanidades', descripcion: 'Humanidades'},
				{ codigo: 'ocio', descripcion: 'Ocio'},
				{ codigo: 'ciencia', descripcion: 'Ciencia'},
				{ codigo: 'tecnologia', descripcion: 'Tecnología'}
			]).then(function () {
				console.log('Base de datos inicializada con temáticas');
			});
		}
	});
	Quiz.count().then(function (count) {
		if (count === 0) {
			Quiz.bulkCreate([
				{
					pregunta:  'Capital de Italia',
					respuesta: 'Roma',
					tema: 'humanidades'
				},
				{
					pregunta:  'Capital de España',
					respuesta: 'Madrid',
					tema: 'humanidades'
				},
				{
					pregunta:  'Nombre de nuestro planeta',
					respuesta: 'Tierra',
					tema: 'ciencia'
				},
				{
					pregunta:  'Nombre de nuestro satélite',
					respuesta: 'Luna',
					tema: 'ciencia'
				}
			]).then(function () {
				console.log('Base de datos inicializada con preguntas');
			});
		}
	});
})
