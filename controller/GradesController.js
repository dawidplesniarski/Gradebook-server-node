const Grades = require('../models/Grades');
const Subject = require('../models/Subject');
const User = require('../models/User');
const Course = require('../models/Course');
const _ = require('lodash');

const GradesController = {
    findAll: async (req, res) => {
        try {
            const grades = await Grades.find().populate('subject');
            res.json(grades);
        } catch (err) {
            res.json({message: err})
        }
    },
    findByAlbum: async (req, res) => {
        try {
            const studentGrades = await Grades.find({studentAlbum: req.params.studentAlbum}).populate('subject');
            res.json(studentGrades);
        } catch (err) {
            res.json({message: err})
        }
    },
    addGrade: async (req, res) => {
        const grade = new Grades({
            studentAlbum: req.body.studentAlbum,
            grade: req.body.grade,
            subject: req.body.subject
        });

        try {
            const savedGrade = await grade.save();
            res.status(201).send(savedGrade);
        } catch (err) {
            res.status(404).send({message: err});
        }
    },
    findLatest: async (req, res) => {
        try {
            const latestGrade = await Grades.findOne({studentAlbum: req.params.studentAlbum}, {}, {sort: {'date': -1}}).populate('subject');
            res.json(latestGrade);
        } catch (err) {
            res.json(err);
        }
    },
    addTestGrade: async (req, res) => {
        const subject = await Subject.findOne({subjectName: {$regex: new RegExp(req.body.subject, "i")}}, {_id: 1});
        const grade = new Grades({
            studentAlbum: req.body.studentAlbum,
            grade: req.body.grade,
            subject: subject
        });
        try {
            const savedGrade = await grade.save();
            res.status(201).send(savedGrade);
        } catch (err) {
            res.status(404).send({message: err});
        }
    },
    deleteGradeById: async (req, res) => {
        Grades.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                res.status(404).send('Error when delete grade');
            } else {
                res.status(200).send(`Grade with id ${req.params.id} deleted successfully`)
            }
        });
    },
    findBySemesterAndSubject: async (req, res) => {
        try {
            const {courseName} = await Course.findById(req.params.courseId); // pobieram nazwę kierunku po ID
            const semester = req.params.semester;
            const subject = req.params.subject;
            const students = await User.find({
                universityId: req.params.universityId,
                courseId: req.params.courseId
            }).populate(['universityId', 'courseId']);  // szukam studentów po kierunku i uczelni

            const studentsFilteredBySemesters = students.
            filter(student => student.semesters[student.courseId.
            findIndex(i => i.courseName === courseName)] == semester);  //studenci przefiltrowani po kierunku uczelni i semestrze

            const studentAlbums = [];
            studentsFilteredBySemesters.forEach(student => {
                studentAlbums.push(student.albumNo);
            });

            const gradesMatchingStudents = await Grades.find({studentAlbum: {$in: studentAlbums}}).populate('subject');
            const gradesFilteredBySubject = gradesMatchingStudents.filter(grade => grade.subject.subjectName === subject);


            function calculateAverage(album) {
                let temp = [];

                gradesFilteredBySubject.filter(g => g.studentAlbum === album).forEach(grade => {
                    temp.push(grade.grade);
                });
                return Math.round((_.sum(temp) / temp.length) / 0.5) * 0.5;
            }
            function getGradeName(grade) {
                const gradesNames = {
                    NDST: "ndst",
                    DST: "dst",
                    pDST: "+dst",
                    DB: "db",
                    pDB: "+db",
                    BDB: "bdb"
                }
                switch(grade) {
                    case 2:
                        return gradesNames.NDST;
                    case 3:
                       return gradesNames.DST;
                    case 3.5:
                        return gradesNames.pDST;
                    case 4:
                        return gradesNames.DB;
                    case 4.5:
                        return gradesNames.pDB
                    case 5:
                        return gradesNames.BDB;
                    default:
                        return '';
                }
            }
            const arrayToExportToPDF = [];
            studentsFilteredBySemesters.forEach(student => {
               arrayToExportToPDF.push({
                   name: student.name,
                   lastName: student.lastName,
                   album: student.albumNo,
                   average: `${calculateAverage(student.albumNo).toFixed(1)} ${getGradeName(calculateAverage(student.albumNo))}`
               })
            });

            res.status(200).send(arrayToExportToPDF);
        } catch (err) {
            res.status(404).send(err);
        }
    }
}
module.exports = GradesController;