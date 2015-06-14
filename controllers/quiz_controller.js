var models = require('../models/models.js');

exports.load = function (req, res, next, quizId) {
	models.Quiz.findById(quizId).then(function (quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quiz='+quizId));
		}
	}).catch(function (error) {
		next(error);
	});
};

// GET /quizes?search=
exports.index = function (req, res) {
	var criteria = {
		order: '"pregunta" ASC'
	};
	if (req.query.search) {
		var search = '%' + req.query.search.replace(/[ ]+/g, '%') + '%';
		criteria.where = [ 'pregunta like ?', search ];
	}
	models.Quiz.findAll(criteria).then(function(quizes) {
		res.render('quizes/index', { quizes: quizes, errors: [] });
	});
};

// GET /quizes/:quizId(\\d+)
exports.show = function (req, res) {
	res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function (req, res) {
	var resultado = 'Incorrecta';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcta';
	}
	res.render('quizes/answer', { respuesta: resultado, quiz: req.quiz, errors: [] });
};

// GET /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build({
		pregunta: 'Pregunta',
		respuesta: 'Respuesta',
		tema: ''
	});
	models.Tematica.findAll().then(function(data) {
		res.render('quizes/new', {quiz: quiz, tematicas: data, errors: []});
	});
};

// POST /quizes/create
exports.create = function (req, res) {
	console.log('Crear una pregunta con los datos', req.body);
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate()
		.then(function(err) {
			if (err) {
				models.Tematica.findAll().then(function(data) {
					res.render('quizes/new', {quiz: quiz, tematicas: data, errors: err.errors});
				});
			} else {
				quiz.save({fields: ['pregunta', 'respuesta', 'tema']})
					.then(function () {
						res.redirect('/quizes');
					});
			}
		});
};

// GET /quizes/id/edit
exports.edit = function (req, res) {
	var quiz = req.quiz;
	models.Tematica.findAll().then(function(data) {
		res.render('quizes/edit', {quiz: quiz, tematicas: data, errors: []});
	});
};


// PUT /quizes/id/
exports.update = function (req, res) {
	var quiz = req.quiz;
	console.log('Modificar la pregunta '+quiz.id+' con los datos', req.body);

	quiz.pregunta = req.body.quiz.pregunta;
	quiz.respuesta = req.body.quiz.respuesta;
	quiz.tema = req.body.quiz.tema;

	quiz.validate()
		.then(function (err) {
			if (err) {
				models.Tematica.findAll().then(function(data) {
					res.render('quizes/edit', {quiz: quiz, tematicas: data, errors: err.errors});
				});
			} else {
				quiz.save({fields: ['pregunta', 'respuesta', 'tema']})
					.then(function () {
						res.redirect('/quizes');
					});
			}
		});
};


// DELETE /quizes/ide
exports.destroy = function (req, res) {
	var quiz = req.quiz;
	quiz.destroy().then(function () {
		res.redirect('/quizes');
	});
};
