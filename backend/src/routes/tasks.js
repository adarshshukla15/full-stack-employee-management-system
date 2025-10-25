const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const taskCtrl = require('../controllers/taskController');

// Admin creates/reads/updates/deletes tasks
router.post('/', auth, roleCheck(['admin']), taskCtrl.createTask);
router.get('/', auth, roleCheck(['admin']), taskCtrl.getAllTasks);
router.put('/:id', auth, roleCheck(['admin']), taskCtrl.updateTask);
router.delete('/:id', auth, roleCheck(['admin']), taskCtrl.deleteTask);

// Employee routes
router.get('/my', auth, roleCheck(['employee']), taskCtrl.getMyTasks);
router.patch('/:id/status', auth, roleCheck(['employee']), taskCtrl.updateStatus);

module.exports = router;
