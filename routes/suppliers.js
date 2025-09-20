const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// danh sách
router.get('/', supplierController.index);

// form thêm
router.get('/new', supplierController.newForm);
router.post('/save', supplierController.save); // dùng 1 route duy nhất

// form sửa
router.get('/:id/edit', supplierController.editForm);

// xóa
router.post('/:id', supplierController.delete);

module.exports = router;
