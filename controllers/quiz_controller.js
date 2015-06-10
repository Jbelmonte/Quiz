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
		order: '`pregunta` ASC'
	};
	if (req.query.search) {
		var search = '%' + req.query.search.replace(/[ ]+/g, '%') + '%';
		criteria.where = [ 'pregunta like ?', search ];
	}
	models.Quiz.findAll(criteria).then(function(quizes) {
		res.render('quizes/index', { quizes: quizes });
	});
};

// GET /quizes/:quizId(\\d+)
exports.show = function (req, res) {
	res.render('quizes/show', { quiz: req.quiz });
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function (req, res) {
	var resultado = 'Incorrecta';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcta';
	}
	res.render('quizes/answer', { respuesta: resultado, quiz: req.quiz });
};
