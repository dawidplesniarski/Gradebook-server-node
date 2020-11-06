const express = require('express');
const router = express.Router();
const employeeController = require('../controller/EmployeeController');
const verifyToken = require('../utils/verifyToken');

router.post('/addEmployee', verifyToken, employeeController.addEmployee);

router.get('/findById/:employeeId', employeeController.findEmployeeById);

router.get('/findAllEmployees', employeeController.findAllEmployees);

router.post('/login', employeeController.loginEmployee);

router.put('/editEmployeeData/:employeeId', verifyToken, employeeController.editEmployeeData);

router.put('/addEmployeeUniversity', verifyToken, employeeController.addEmployeeUniversity);

router.put('/deleteEmployeeUniversity', verifyToken, employeeController.deleteEmployeeUniversity);

module.exports = router;