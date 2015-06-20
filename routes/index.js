var express = require('express'),
	router = express.Router(),
	quizController = require('../controllers/quiz_controller'),
	commentController = require('../controllers/comment_controller'),
	sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});


// Rutas de session
router.get('/login',	sessionController.new);
router.post('/login',	sessionController.create);
router.get('/logout',	sessionController.destroy);


// Autoload de quiz
router.param('quizId', quizController.load);

// Quiz
router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

router.get('/quizes/:quizId(\\d+)/edit',	sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',			sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',		sessionController.loginRequired, quizController.destroy);
router.get('/quizes/new',					sessionController.loginRequired, quizController.new);
router.post('/quizes/create',				sessionController.loginRequired, quizController.create);

router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);

/* GET home page. */
router.get('/author', function(req, res, next) {
  res.render('author', {errors: []});
});

// Export
module.exports = router;
