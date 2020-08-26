const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.get('/findAll', async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message:err})
    }
});

// router.post('/test', verifyToken, async(req,res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err){
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 authData
//             });
//         }
//     });
// });

router.get('/findById/:userId', async (req,res)=>{
   try{
       const user = await User.findById(req.params.userId);
       res.json(user)
   } catch(err){
       res.json({message:err})
   }
});

router.post('/login', async (req, res)=>{
   try{
       const user = await User.findOne({login : req.body.login});

       const validPassword = await bcrypt.compare(
         req.body.password,
         user.password
       );

       if(validPassword){
           jwt.sign({user},'secretkey',(err,token)=>{
               res.json({
                   user: user,
                   token: token
               });
           })
       }else{
           throw new Error('Login or password wrong');
       }
   } catch (error){
       res.status(403);
       res.json({message:error});
   }
});

router.delete('/delete/:userId', async(req, res) =>{
    User.findByIdAndDelete(req.params.userId, (err) => {
        if (err) {
            res.status(404).send({message: `User with id: ${req.params.userId} not exists`});
        } else {
            res.send({message:`User with id: ${req.params.userId} deleted successfully`});
        }
    });
});

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

router.post('/addUser', async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userWithAlbum = await User.findOne({albumNo: req.body.albumNo});
    const userWithLogin = await User.findOne({login: req.body.login});

    if(userWithLogin || userWithAlbum) {
        return res
            .status(409)
            .send('User with album or login number already exists!');
    }

    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        albumNo: req.body.albumNo,
        isEnabled: req.body.enabled,
        login: req.body.login,
        password: hashedPassword,
        university: req.body.university
    });
   try{
        const addedUser = await newUser.save();
        res.status(201);
        res.json(addedUser);
   }catch(err){
       res.status(403);
       res.json({message:err});
   }
});

router.put('/changePassword/:userId', async(req,res) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.findById(req.params.userId);
    user.update({password: hashedNewPassword}, (err)=>{
        if(err){
            res.status(403).send({message: 'Cannot update password'});
        } else {
            res.status(200).send({message:'Task failed successfully'});
        }
    });
    // User.findByIdAndUpdate(req.params.userId,{password: hashedNewPassword}, (err)=>{
    //     if(err){
    //         res.status(403).send({message: 'Cannot update password'});
    //     } else {
    //         res.status(200).send({message:'Task failed successfully'});
    //     }
    // });
});

module.exports = router;
