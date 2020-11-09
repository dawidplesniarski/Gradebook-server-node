const Course = require('../models/Course');
const CourseSubjects = require('../models/CourseSubjects');

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
    },
    addCourseWithSubjects: async (req, res) => {
        const course = new Course({
            courseName: req.body.courseName
        });
        const courseSubjects = new CourseSubjects({
            course: req.body.courseName,
            semesters: req.body.semesters
        });

        try {
            const foundCourse = await Course.findOne({courseName: req.body.courseName});
            if(!foundCourse) {
                await course.save();
                await courseSubjects.save();
                res.status(201).send('Course with subjects created successfully!')
            } else {
                res.status(409).send(`Course with name ${req.body.courseName} already exists!`);
            }
        } catch(err) {
            res.status(400).send(err)
        }
    },
    findCourseWithSubjects: async (req, res) => {
        try {
            const course = await Course.findOne({courseName: req.params.courseName});
            const courseSubjects = await CourseSubjects.findOne({course: req.params.courseName});
            res.status(200).send({
                course: course,
                courseSubjects: courseSubjects
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = CoursesController;