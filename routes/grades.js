const express = require('express');
const router = express.Router();
const gradesController = require('../controller/GradesController');
const verifyToken = require('../utils/verifyToken');

router.get('/findAll', gradesController.findAll);

router.get('/findByAlbum/:studentAlbum', gradesController.findByAlbum);

router.post('/addGrade', gradesController.addGrade);

module.exports = router;