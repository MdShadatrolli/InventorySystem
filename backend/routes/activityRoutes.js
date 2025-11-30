const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/activityController');

router.get('/', auth, ctrl.getActivities);

module.exports = router;
