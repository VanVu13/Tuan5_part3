const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// middleware auth để chỉ đăng nhập mới truy cập
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 */
router.get('/', productController.index);

// form thêm sản phẩm
router.get('/new', productController.newForm);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Thêm mới sản phẩm
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - quantity
 *               - supplierId
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               supplierId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sản phẩm đã được tạo
 */
router.post('/', productController.create);

// form sửa sản phẩm
router.get('/:id/edit', productController.editForm);
router.post('/:id', productController.update);

// xóa sản phẩm
router.post('/:id/delete', productController.delete);  // <-- sửa đường dẫn

module.exports = router;
