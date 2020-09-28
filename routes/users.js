const express = require('express');
const router = express.Router();
const userController = require('../controller/UsersController');
const verifyToken = require('../utils/verifyToken');


router.post('/test', verifyToken, userController.test);

router.get('/findById/:userId', userController.findByID);

router.post('/login', userController.login);

router.delete('/delete/:userId', userController.deleteUserByID);

router.post('/addUser', userController.addUser);

router.put('/changePassword/:userId', userController.changePassword);

router.get('/findAll', userController.findAll);

router.put('/updateImage', userController.updateImage);

router.get('/findUserCourses/:userId', userController.findUserCourses);

//just put verifyToken inside router to protect route with JWT

module.exports = router;
