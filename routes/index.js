var express = require('express'),
	router = express.Router(),
	quizController = require('../controllers/quiz_controller'),
	commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de quiz
router.param('quizId', quizController.load);

// Quiz
router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit',	quizController.edit);
router.put('/quizes/:quizId(\\d+)',			quizController.update);
router.delete('/quizes/:quizId(\\d+)',		quizController.destroy);
router.get('/quizes/new',					quizController.new);
router.post('/quizes/create',				quizController.create);

router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);

/* GET home page. */
router.get('/author', function(req, res, next) {
  res.render('author', {errors: []});
});

// Export
module.exports = router;
