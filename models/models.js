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
