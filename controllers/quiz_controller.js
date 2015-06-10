var models = require('../models/models.js');

// GET /quizes?search=
exports.index = function (req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', { quizes: quizes });
	});
};

// GET /quizes/:quizId(\\d+)
exports.show = function (req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: quiz });
	});
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function (req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		var resultado = 'Incorrecta';
		if (req.query.respuesta === quiz.respuesta) {
			resultado = 'Correcta';
		}
		res.render('quizes/answer', { respuesta: resultado, quiz: quiz });
	});
};
