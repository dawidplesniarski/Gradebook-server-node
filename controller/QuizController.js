const Test = require('../models/Test');

const QuizController = {
    addQuestion: async (req,res) =>{
        const test = new Test({
            category: req.body.category,
            question : req.body.question,
            correctAnswer : req.body.correctAnswer,
            answers : req.body.answers
        });

        try{
            const savedTest = await test.save();
            res.status(201).send(savedTest);
        }catch(err){
            res.status(404).send({message: err});
        }
    },
    findByCategory: async(req,res) =>{
        try{
            const test = await Test.find({category: {$regex: new RegExp(req.params.category, "i")}});
            res.json(test);
            res.status(200);
        } catch(err){
            res.json({message:err})
        }
    },
    findAllCategories: async(req, res) =>{
        try{
            const tests = await Test.find();
            const categories = tests.map(category => category.category);
            const distinct = Array.from(new Set(categories));
            res.json(distinct);
            res.status(200);
        } catch(err){
            res.json(err);
        }
    }
}
module.exports = QuizController;