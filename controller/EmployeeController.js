const Employee = require('../models/Employee');
const University = require('../models/University');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const EmployeeController = {
    findEmployeeById: async (req, res) => {
        try {
            const foundEmployee = await Employee.findById(req.params.employeeId).populate(['universityId', 'subjectId', 'courseId']);
            res.status(200).send(foundEmployee);
        } catch (err) {
            res.status(404).send({message: err});
        }
    },
    addEmployee: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const employeeWithLogin = await Employee.findOne({login: req.body.login});

        if (employeeWithLogin) {
            return res.status(409).send('User with this login already exists!');
        }

        const newEmployee = new Employee({
            academicTitle: req.body.academicTitle,
            name: req.body.name,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin,
            isEnabled: req.body.enabled,
            login: req.body.login,
            password: hashedPassword,
            universityId: req.body.universityId,
            courseId: req.body.courseId,
            subjectId: req.body.subjectId,
            email: req.body.email,
            imageUrl: req.body.imageUrl
        });
        try {
            const savedEmployee = await newEmployee.save();
            res.status(201).send(savedEmployee);
        } catch (err) {
            res.status(403).send({message: err});
        }
    },
    findAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.find().populate(['universityId', 'courseId', 'subjectId']);
            res.status(200).send(employees);
        } catch (err) {
            res.status(404).send({message: err});
        }
    },
    loginEmployee: async (req, res) => {
        try {
            const employee = await Employee.findOne({login: req.body.login}).populate(['universityId', 'courseId', 'subjectId']);

            const validPassword = await bcrypt.compare(
                req.body.password,
                employee.password
            );

            if (validPassword) {
                jwt.sign({employee}, 'secretkey', (err, token) => {
                    res.json({
                        employee: employee,
                        token: token
                    });
                });
            } else {
                throw new Error('Login or password incorrect');
            }
        } catch (err) {
            res.status(403).send({message: err});
        }
    },
    editEmployeeData: async (req, res) => {
        try {
            const employee = await Employee.findOneAndUpdate({_id: req.params.employeeId},
                {
                    academicTitle: req.body.academicTitle,
                    name: req.body.name,
                    lastName: req.body.lastName,
                    isAdmin: req.body.isAdmin,
                    isEnabled: req.body.enabled,
                    login: req.body.login,
                    imageUrl: req.body.imageUrl,
                    email: req.body.email
                }, {useFindAndModify: false});
            res.status(200).send(employee);
        } catch (err) {
            res.status(404).send(err);
        }
    },
    addEmployeeUniversity: async (req, res) => {
        try {
            const employee = await Employee.findById(req.body.employeeId);

            if(!employee.universityId.includes(req.body.universityId)) {
                await Employee.updateOne(
                    {_id: req.body.employeeId},
                    {$push: {universityId: req.body.universityId}}
                );
                res.status(200).send('University added successfully');
            } else {
                res.status(409).send(`University with id ${req.body.universityId} already exists`);
            }
        } catch (err) {
            res.status(400).send({message: err});
        }
    },
    deleteEmployeeUniversity: async (req, res) => {
        try {
            const employee = await Employee.findById(req.body.employeeId);
            if(employee.universityId.includes(req.body.universityId)){
                await Employee.updateOne(
                    {_id: req.body.employeeId},
                    {$pull: {universityId: req.body.universityId}}
                );
                res.status(200).send('University deleted successfully');
            } else {
                res.status(400).send(`University with id ${req.body.universityId} not exists`);
            }
        } catch (err) {
            res.status(400).send({message: err});
        }
    },
    addEmployeeCourse: async (req, res) => {
        try {
            const employee = await Employee.findById(req.body.employeeId);

            if(!employee.courseId.includes(req.body.courseId)) {
                await Employee.updateOne(
                    {_id: req.body.employeeId},
                    {$push: {courseId: req.body.courseId}}
                );
                res.status(200).send('Course added successfully');
            } else {
                res.status(409).send(`Course with id ${req.body.courseId} already exists`);
            }
        } catch (err) {
            res.status(400).send({message: err});
        }
    },
    deleteEmployeeCourse: async (req, res) => {
        try {
            const employee = await Employee.findById(req.body.employeeId);
            if(employee.courseId.includes(req.body.courseId)){
                await Employee.updateOne(
                    {_id: req.body.employeeId},
                    {$pull: {courseId: req.body.courseId}}
                );
                res.status(200).send('Course deleted successfully');
            } else {
                res.status(400).send(`Course with id ${req.body.courseId} not exists`);
            }
        } catch (err) {
            res.status(400).send({message: err});
        }
    },
    addEmployeeSubject: async (req, res) => {
        try {
            const employee = await Employee.findById(req.body.employeeId);

            if(!employee.subjectId.includes(req.body.subjectId)) {
                await Employee.updateOne(
                    {_id: req.body.employeeId},
                    {$push: {subjectId: req.body.subjectId}}
                );
                res.status(200).send('Subject added successfully');
            } else {
                res.status(409).send(`Subject with id ${req.body.subjectId} already exists`);
            }
        } catch (err) {
            res.status(400).send({message: err});
        }
    },
    deleteEmployeeSubject: async (req, res) => {
        try {
            const employee = await Employee.findById(req.body.employeeId);
            if(employee.subjectId.includes(req.body.subjectId)){
                await Employee.updateOne(
                    {_id: req.body.employeeId},
                    {$pull: {subjectId: req.body.subjectId}}
                );
                res.status(200).send('Subject deleted successfully');
            } else {
                res.status(400).send(`Subject with id ${req.body.subjectId} not exists`);
            }
        } catch (err) {
            res.status(400).send({message: err});
        }
    },
};

module.exports = EmployeeController;