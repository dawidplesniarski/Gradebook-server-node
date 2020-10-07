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
                subjectDetails: subjectDetails
            }
            res.status(200).send(subjectWithDetails);
        } catch (err) {
            res.status(404).send(err);
        }
    },
    findByName: async (req, res) => {
        try {
            const subject = await Subject.findOne({subjectName: {$regex: new RegExp(req.params.subjectName, "i")}});
            const subjectDetails = await SubjectDetails.findOne({subjectName: subject.subjectName});
            const subjectWithDetails = {
                subject: subject,
                subjectDetails: subjectDetails
            }
            res.status(200).send(subjectWithDetails);
        } catch (err) {
            res.status(404).send({message: err});
        }
    },
    totalEcts: async (req, res) => {
        try {
            if (req.params.semesterNumber < 1) {
                throw new Error('Wrong semester number typed');
            }
            const semesterSubjects = await CourseSubjects.findOne({course: req.params.courseName});
            const subjectsArray = semesterSubjects.semesters[req.params.semesterNumber - 1]; // lista przedmiotow z kierunku i semestru

            const subjectsDetails = await SubjectDetails.find({"subjectName": {$in: subjectsArray}}); //lista przedmiotow nalezaca do w.w tablicy

            const grades = await Grades.find({grade: 2, studentAlbum: req.params.studentAlbum}).populate('subject'); //lista ocen 2.0 danego studenta

            var negativeGradesCategories = [];

            grades.forEach(elem => {
                negativeGradesCategories.push(elem.subject.subjectName); // tworzymy tablicę przedmiotów z ktorych album ma 2.0
            });

            const negativeGradesCategoriesNoDuplicate = negativeGradesCategories.filter((v, i) => negativeGradesCategories.indexOf(v) === i);

            let ects = 0;
            let totalEcts = 0;
            subjectsDetails.forEach(elem => {
                if (!negativeGradesCategoriesNoDuplicate.includes(elem.subjectName)) {
                    ects += elem.ects;
                }
                totalEcts += elem.ects;
            });
            res.status(200).send({ects: ects, totalEcts: totalEcts});
        } catch (err) {
            res.status(400).send({err});
        }
    }
};

module.exports = SubjectsController;