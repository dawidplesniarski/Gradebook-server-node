const Employee = require('../models/Employee');
const University = require('../models/University');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const EmployeeController = {
    findEmployeeById: async (req, res) => {
        try {
            const foundEmployee = await Employee.findById(req.params.employeeId).populate('universityId');
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
            login: req.body.login,
            password: hashedPassword,
            universityId: req.body.universityId,
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
            const employee = await Employee.findOne({login: req.body.login}).populate('universityId');

            const validPassword = await bcrypt.compare(
                req.body.password,
                employee.password
            );

            if (validPassword) {
                jwt.sign({employee}, 'secretKey', (err, token) => {
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
    }
};

module.exports = EmployeeController;