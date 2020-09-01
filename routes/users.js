const express = require('express');
const router = express.Router();
const userController = require('../controller/UsersController')


router.post('/test', verifyToken, userController.test);

router.get('/findById/:userId', userController.findByID);

router.post('/login', userController.login);

router.delete('/delete/:userId', userController.deleteUserByID);

router.post('/addUser', userController.addUser);

router.put('/changePassword/:userId', userController.changePassword);

router.get('/findAll', userController.findAll);

//just put verifyToken inside router to protect route with JWT

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;
