const express = require('express');
const router = express.Router();
const permissionsController = require('../controller/PermissionsController')


router.post('/addPermission', permissionsController.addPermission);

router.get('/findByCategory/:category', permissionsController.findPermissionByCategory);


module.exports = router;
