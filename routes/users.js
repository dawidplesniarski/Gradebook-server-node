const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/findAll', async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message:err})
    }
});

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
       if(user.password === req.body.password){
           res.json(user);
       }else{
           res.json('Wrong password');
       }

   }catch(error){
       res.json({message:error})
   }

});

router.post('/addUser', async (req,res)=>{
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        albumNo: req.body.albumNo,
        isEnabled: req.body.enabled,
        login: req.body.login,
        password: req.body.password,
        university: req.body.university
    });
   try{
        const addedUser = await newUser.save();
        res.json(addedUser);
   }catch(err){
       res.json({message:err});
   }
});

module.exports = router;
