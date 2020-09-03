const express = require('express');
const router = express.Router();
const quizController = require('../controller/QuizController')


router.post('/addQuestion', quizController.addQuestion);

router.get('/findByCategory/:category', quizController.findByCategory);

router.get('/findAllCategories', quizController.findAllCategories);

module.exports = router;
