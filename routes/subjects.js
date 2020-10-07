const express = require('express');
const router = express.Router();
const subjectsController = require('../controller/SubjectsController');

router.get('/findAll', subjectsController.findAll);

router.post('/addSubject', subjectsController.addSubject);

router.get('/findById/:subjectId', subjectsController.findById);

router.get('/findByName/:subjectName', subjectsController.findByName);

router.get('/totalEcts/:courseName/:semesterNumber/:studentAlbum', subjectsController.totalEcts);

module.exports = router;
