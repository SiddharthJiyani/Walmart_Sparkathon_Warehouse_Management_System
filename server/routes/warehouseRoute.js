const express = require('express');
const router = express.Router(); 

const { createWarehouse, getWarehouses, getWarehouse, updateWarehouse, deleteWarehouse } = require('../controllers/warehouseController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createWarehouse);
router.get('/', protect, getWarehouses);
router.get('/:id', protect, getWarehouse);
router.patch('/:id', protect, updateWarehouse);
router.delete('/:id', protect, deleteWarehouse);

module.exports = router;