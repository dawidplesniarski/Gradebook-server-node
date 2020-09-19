const express = require('express');
const router = express.Router();
const universityController = require('../controller/UniversityController')

router.get('/findAll', universityController.findAll);

router.post('/addUniversity', universityController.addUniversity);

router.get('/findById/:universityId', universityController.findById);

module.exports = router;