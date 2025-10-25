const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const empController = require('../controllers/employeeController');

// Admin-only
router.get('/', auth, roleCheck(['admin']), empController.getAllEmployees);

module.exports = router;
