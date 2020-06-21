const express = require('express');
const router = express.Router();
const Grades = require('../models/Grades');

router.get('/findAll', async (req,res)=>{
    try{
        const grades = await Grades.find();
        res.json(grades);
    }catch(err){
        res.json({message:err})
    }
});

router.get('/findByStudentId/:id', async (req,res)=>{
    try{
        const studentGrades = await Grades.find({studentId: req.params.id});
        res.json(studentGrades);
    }catch(err){
        res.json({message:err})
    }
});

router.post('/addGrade',async (req,res) =>{
    const grade = new Grades({
        studentId: req.body.studentId,
        grade : req.body.grade,
        subject: req.body.subject
    });

    try{
        const savedGrade = await grade.save();
        res.json(savedGrade);
    }catch(err){
        res.json({message:err});
    }
});
module.exports = router;
