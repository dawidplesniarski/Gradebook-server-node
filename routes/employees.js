const express = require('express');
const router = express.Router();
const employeeController = require('../controller/EmployeeController');
const verifyToken = require('../utils/verifyToken');

router.post('/addEmployee', employeeController.addEmployee);

router.get('/findById/:employeeId', employeeController.findEmployeeById);

router.get('/findAllEmployees', employeeController.findAllEmployees);

router.post('/login', employeeController.loginEmployee);

module.exports = router;