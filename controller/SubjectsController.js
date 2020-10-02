const Subject = require('../models/Subject');
const SubjectDetails = require('../models/SubjectDetails');

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
        try {
            const savedSubject = await subject.save();
            res.status(201).send(savedSubject);
        } catch (err) {
            res.json({message: err});
        }
    },
    findById: async (req, res) => {
        try {
            const subject = await Subject.findById(req.params.subjectId);
            const subjectDetails = await SubjectDetails.findOne({subjectName: subject.subjectName});
            const subjectWithDetails = {
                subject: subject,
                subjectDetails : subjectDetails
            }
            res.status(200).send(subjectWithDetails);
        } catch (err) {
            res.status(404).send(err);
        }
    },
    findByName: async (req, res) => {
        try{
            const subject = await Subject.findOne({subjectName: {$regex: new RegExp(req.params.subjectName, "i")}});
            const subjectDetails = await SubjectDetails.findOne({subjectName : subject.subjectName});
            const subjectWithDetails = {
                subject: subject,
                subjectDetails: subjectDetails
            }
            res.status(200).send(subjectWithDetails);
        }catch(err){
            res.status(404).send({message: err});
        }
    }
};

module.exports = SubjectsController;