const express = require('express');
const router = express.Router();
const coursesController = require('../controller/CoursesController');

router.get('/findAll', coursesController.findAll);

router.post('/addCourse', coursesController.addCourse);

router.get('/findById/:courseId', coursesController.findById);

module.exports = router;