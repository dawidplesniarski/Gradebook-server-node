const express = require('express');
const router = express.Router();
const Test = require('../models/Test');


router.post('/addQuestion',async (req,res) =>{
    const test = new Test({
        category: req.body.category,
        question : req.body.question,
        correctAnswer : req.body.correctAnswer,
        answers : req.body.answers
    });

    try{
        const savedTest = await test.save();
        res.json(savedTest);
    }catch(err){

    }
});

router.get('/findByCategory/:category', async(req,res) =>{
    try{
        const test = await Test.find({category : req.params.category});
        res.json(test);
        res.status(200);
    } catch(err){
        res.json({message:err})
    }
});

router.get('/findAllTestsCategory', async(req, res) =>{
    try{
        const tests = await Test.find();
        const categories = tests.map(category => category.category);
        const distinct = Array.from(new Set(categories));
        res.json(distinct);
        res.status(200);
    } catch(err){
        res.json(err);
    }
});

module.exports = router;
