const CourseSubjects = require('../models/CourseSubjects');

const CourseSubjectsController = {
    findCourseSubjectsByCategory: async (req, res) => {
        try {
            const courseSubjects = await CourseSubjects.findOne({course: req.params.courseName});
            res.status(200).send(courseSubjects);
        } catch (err) {
            res.status(404).send(err);
        }
    },
    addCourseSubjects: async (req, res) => {
        const courseSubjects = new CourseSubjects({
            course: req.body.course,
            semesters: req.body.semesters
        });
        try {
            const savedCourseSubjects = await courseSubjects.save();
            res.status(201).send(savedCourseSubjects);
        } catch (err) {
            res.json(err);
        }
    }
};

module.exports = CourseSubjectsController;
