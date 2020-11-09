const express = require('express');
const router = express.Router();
const coursesController = require('../controller/CoursesController');
const verifyToken = require('../utils/verifyToken')

router.get('/findAll', coursesController.findAll);

router.post('/addCourse', coursesController.addCourse);

router.get('/findById/:courseId', coursesController.findById);

router.post('/addCourseWithSubjects', verifyToken, coursesController.addCourseWithSubjects);

router.get('/findCourseWithSubjects/:courseName', coursesController.findCourseWithSubjects);

router.put('/editCourseData', verifyToken, coursesController.editCourseData);

module.exports = router;