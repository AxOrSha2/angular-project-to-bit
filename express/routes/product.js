const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/', productController.findProducts);
router.get('/:id', productController.findProduct);
router.put('/:id', productController.updateProducts);
router.delete('/:id', productController.deleteProducts);

module.exports = router;