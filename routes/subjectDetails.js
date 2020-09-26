const express = require('express');
const router = express.Router();
const subjectDetailsController = require('../controller/SubjectDetailsController');

router.get('/findByName/:subjectName', subjectDetailsController.findBySubjectName);

router.post('/addSubjectDetails', subjectDetailsController.addSubjectDetails);

module.exports = router;