const Subject = require('../models/Subject');

const SubjectsController = {
    findAll: async (req, res) => {
        try {
            const subjects = await Subject.find();
            res.status(200).send(subjects);
        } catch (err) {
            res.json({message: err});
        }
    },
    addSubject: async (req, res) => {
        const subject = new Subject({
            subjectName: req.body.subjectName
        });
        try{
            const savedSubject = await subject.save();
            res.status(201).send(savedSubject);
        }catch (err){
            res.json({message: err});
        }
    },
    findById: async (req, res) =>{
        try{
            const subject = await Subject.findById(req.params.subjectId);
            res.status(200).send(subject);
        } catch(err){
            res.status(404).send(err);
        }
    }
};

module.exports = SubjectsController;