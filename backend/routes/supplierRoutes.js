const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const ctrl = require('../controllers/supplierController');

router.post('/', auth, role(['admin','staff']), ctrl.createSupplier);
router.get('/', auth, ctrl.getSuppliers);
router.put('/:id', auth, role(['admin','staff']), ctrl.updateSupplier);

module.exports = router;
