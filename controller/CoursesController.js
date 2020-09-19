const Course = require('../models/Course');

const CoursesController = {
    findAll: async (req, res) => {
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (err) {
            res.json({message: err})
        }
    },
    addCourse: async (req, res) => {
        const course = new Course({
            courseName: req.body.courseName
        });

        try {
            const savedCourse = await course.save();
            res.status(201).send(savedCourse);
        } catch (err) {
            res.json({message: err});
        }
    },
    findById: async (req, res) => {
        try {
            const course = await Course.findById(req.params.courseId);
            res.status(200).send(course);
        } catch (err) {
            res.json({message: err})
        }
    }
}

module.exports = CoursesController;