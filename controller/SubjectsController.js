const Subject = require('../models/Subject');
const SubjectDetails = require('../models/SubjectDetails');
const CourseSubjects = require('../models/CourseSubjects');
const Grades = require('../models/Grades');
const User = require('../models/User');

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
    },
    findByStudent: async (req, res) => {
        try {
            const student = await User.findOne({albumNo: req.params.albumNo}).populate('courseId');
            const index = student.courseId.findIndex(e => e.courseName === req.params.courseName);
            const studentSemester = student.semesters[index];
            const courseSubjects = await CourseSubjects.findOne({course: req.params.courseName});
            const semesterSubjects = courseSubjects.semesters[studentSemester - 1];
            res.status(200).send(semesterSubjects);
        } catch (err) {
            res.status(405).send({err});
        }
    },
    addSubjectWithDetails: async (req, res) => {
        try {
            const subject = await Subject.findOne({subjectName: req.body.subjectName});
            if(!subject) {
                const newSubject = new Subject({
                    subjectName: req.body.subjectName
                });
                const newSubjectDetails = new SubjectDetails({
                    ects: req.body.ects,
                    hours: req.body.hours,
                    type: req.body.type,
                    subjectName: req.body.subjectName
                });
                await newSubject.save(newSubject);
                await newSubjectDetails.save(newSubjectDetails);
                res.status(201).send('Subject and subjects details created successfully')
            } else {
                res.status(409).send(`Subject with name ${req.body.subjectName} already exists!`)
            }
        } catch (err) {
            res.status(400).send({message: err});
        }
    }
};

module.exports = SubjectsController;