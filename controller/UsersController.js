const User = require('../models/User');
const Course = require('../models/Course');
const University = require('../models/University');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const UserController = {
    findByID: async (req, res) => {
        try {
            const foundUser = await User.findById(req.params.userId).populate(['courseId', 'universityId']);
            res.json(foundUser);
        } catch (err) {
            res.json({message: err})
        }
    },
    findAll: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.json({message: err})
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({login: req.body.login});
            const courseName = await Course.findById(user.courseId);
            const universityName = await University.findById(user.universityId);

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (validPassword) {
                jwt.sign({user}, 'secretkey', (err, token) => {
                    res.json({
                        user: user,
                        token: token,
                        course: courseName,
                        university: universityName
                    });
                })
            } else {
                throw new Error('Login or password wrong');
            }
        } catch (error) {
            res.status(403);
            res.json({message: error});
        }
    },
    deleteUserByID: async (req, res) => {
        User.findByIdAndDelete(req.params.userId, (err) => {
            if (err) {
                res.status(404).send({message: `User with id: ${req.params.userId} not exists`});
            } else {
                res.send({message: `User with id: ${req.params.userId} deleted successfully`});
            }
        });
    },
    addUser: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userWithAlbum = await User.findOne({albumNo: req.body.albumNo});
        const userWithLogin = await User.findOne({login: req.body.login});

        if (userWithLogin || userWithAlbum) {
            return res
                .status(409)
                .send('User with album or login number already exists!');
        }

        const newUser = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            albumNo: req.body.albumNo,
            isEnabled: req.body.enabled,
            login: req.body.login,
            password: hashedPassword,
            universityId: req.body.universityId,
            imageUrl: req.body.imageUrl,
            email: req.body.email,
            courseId: req.body.courseId
        });
        try {
            const addedUser = await newUser.save();
            res.status(201);
            res.json(addedUser);
        } catch (err) {
            res.status(403);
            res.json({message: err});
        }
    },
    changePassword: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
        const user = await User.findById(req.params.userId);

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (validPassword && req.body.newPassword === req.body.confirmPassword) {
            user.update({password: hashedNewPassword}, (err) => {
                if (err) {
                    res.status(403).send({message: 'Cannot update password'});
                } else {
                    res.status(200).send({message: 'Task failed successfully'});
                }
            });
        } else {
            res.status(403).send({message: 'your account password is not correct or new passwords not matches'});
        }
    },
    test: async (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(418);
            } else {
                res.json({
                    authData
                });
            }
        });
    },
    updateImage: async (req, res) => {
        try {
            await User.findOneAndUpdate({albumNo: req.body.albumNo}, {imageUrl: req.body.imageUrl});
            res.status(200).send('Image url updated successfully');
        } catch (err) {
            res.status(404).send('Problem with url update');
        }
    },
    findUserCourses: async (req, res) => {
        try {
           const courses = await User.findById(req.params.userId).populate(['courseId']).select('courseId');
           res.status(200).send(courses.courseId);
        } catch (err) {
            res.status(404).send({message: err});
        }
    }
}

module.exports = UserController;
