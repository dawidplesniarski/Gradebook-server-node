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
            res.status(404).send(err);
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
            if (course && courseSubjects) {
                res.status(200).send({
                    course: course,
                    courseSubjects: courseSubjects
                });
            } else {
                res.status(404).send('No course found')
            }
        } catch (err) {
            res.status(400).send(err);
        }
    },
    editCourseData: async (req, res) => {
        try {
            const course = await Course.findOne({courseName: req.body.courseName});
            if (course) {
                await Course.findOneAndUpdate({courseName: req.body.courseName},{
                    courseName: req.body.newCourseName
                },{useFindAndModify: false});
                await CourseSubjects.findOneAndUpdate({course: req.body.courseName},{
                    course: req.body.newCourseName
                },{useFindAndModify: false});
                res.status(200).send('Course with subjects updated successfully');
            } else {
                res.status(404).send(`There is no course with name ${req.body.courseName}`);
            }

        } catch (err) {
            res.status(400).send(err);
        }
    },
    addSubjectToSemester: async (req, res) => {
        try {
            const foundCourse = await CourseSubjects.findOne({course: req.body.courseName});
            if (foundCourse) {
                if(foundCourse.semesters[req.body.semester].includes(req.body.newSubject)) {
                    res.status(409).send(`Subject with name ${req.body.newSubject} already exists!`)
                } else {
                    const index = req.body.semester;
                    await CourseSubjects.updateOne({course: req.body.courseName},{
                            $push: {[`semesters.${index}`] : req.body.newSubject}
                        }
                    );
                    res.status(200).send('Subject added successfully');
                }
            } else {
                res.status(404).send(`Course with name ${req.body.courseName} not exists`)
            }
        } catch (err) {
            res.status(400).send(err);
        }
    },
    deleteSubjectFromSemester: async (req, res) => {
        try {
            const foundCourse = await CourseSubjects.findOne({course: req.body.courseName});
            if (foundCourse) {
                const index = req.body.semester;
                await CourseSubjects.updateOne({course: req.body.courseName},{
                        $pull: {[`semesters.${index}`] : req.body.subjectToRemove}
                    }
                );
                res.status(200).send('Subject removed successfully');
            } else {
                res.status(404).send(`Course with name ${req.body.courseName} not exists`)
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = CoursesController;