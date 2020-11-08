const express = require('express');
const router = express.Router();
const universityController = require('../controller/UniversityController')
const verifyToken = require('../utils/verifyToken');

router.get('/findAll', universityController.findAll);

router.post('/addUniversity', verifyToken, universityController.addUniversity);

router.get('/findById/:universityId', universityController.findById);

router.put('/editUniversity', verifyToken, universityController.editUniversityData);

module.exports = router;