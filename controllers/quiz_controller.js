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
		respuesta: 'Respuesta'
	});
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function (req, res) {
	console.log('Crear una pregunta con los datos', req.body);
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate()
		.then(function(err) {
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz.save({fields: ['pregunta', 'respuesta']})
					.then(function () {
						res.redirect('/quizes');
					});
			}
		});
};

// GET /quizes/id/edit
exports.edit = function (req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};


// PUT /quizes/id/
exports.update = function (req, res) {
	var quiz = req.quiz;
	quiz.pregunta = req.body.quiz.pregunta;
	quiz.respuesta = req.body.quiz.respuesta;

	quiz.validate()
		.then(function (err) {
			if (err) {
				res.render('quizes/edit', {quiz: quiz, errors: err.errors});
			} else {
				quiz.save({fields: ['pregunta', 'respuesta']})
					.then(function () {
						res.redirect('/quizes');
					});
			}
		});
};
