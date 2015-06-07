var express = require('express'),
	router = express.Router(),
	quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});


// Quiz
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

/* GET home page. */
router.get('/author', function(req, res, next) {
  res.render('author');
});

// Export
module.exports = router;
