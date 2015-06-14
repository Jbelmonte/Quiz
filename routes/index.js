var express = require('express'),
	router = express.Router(),
	quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de quiz
router.param('quizId', quizController.load);

// Quiz
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

/* GET home page. */
router.get('/author', function(req, res, next) {
  res.render('author', {errors: []});
});

// Export
module.exports = router;
