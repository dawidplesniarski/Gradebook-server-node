const Subject = require('../models/Subject');
const SubjectDetails = require('../models/SubjectDetails');
const CourseSubjects = require('../models/CourseSubjects');
const Grades = require('../models/Grades');

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
    },
    totalEcts: async (req, res) => {
        try{
            if (req.params.semesterNumber < 1) {
                throw new Error('Wrong semester number typed');
            }
            const semesterSubjects = await CourseSubjects.findOne({course: req.params.courseName});
            const subjectsArray = semesterSubjects.semesters[req.params.semesterNumber - 1]; // lista przedmiotow z kierunku i semestru

            const subjectsDetails = await SubjectDetails.find({"subjectName": {$in: subjectsArray}}); //lista przedmiotow nalezaca do w.w tablicy

            const grades = await Grades.find({grade : 2}, {studentAlbum: "30785"}).populate('subject'); //lista ocen 2.0 danego studenta

            //TODO: porównaj które z grades należą do subjectsArray a jak należą to nie podliczaj ich do całości ects

            let ects = 0;
            subjectsDetails.forEach(elem =>{
                ects += elem.ects;
            });
            res.status(200).send({ects: ects});
        } catch (err) {
            //res.status(400).send({err});
            res.json(err);
        }
    }
};

module.exports = SubjectsController;