const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const ctrl = require('../controllers/productController');

router.post('/', auth, role(['admin','staff']), ctrl.createProduct);
router.get('/', auth, ctrl.getProducts);
router.get('/:id', auth, ctrl.getProduct);
router.put('/:id', auth, role(['admin','staff']), ctrl.updateProduct);
router.delete('/:id', auth, role(['admin']), ctrl.deleteProduct);

module.exports = router;
