const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
    try {
        const { search = '', supplierId = 'all' } = req.query; // mặc định

        let filter = {};
        if(search) filter.name = { $regex: search, $options: 'i' };
        if(supplierId && supplierId !== 'all') filter.supplierId = supplierId;

        const products = await Product.find(filter).populate('supplierId');
        const suppliers = await Supplier.find();

        res.render('index', { 
            products, 
            suppliers, 
            search, 
            selectedSupplier: supplierId 
        });
    } catch(err) {
        console.error(err);
        res.send('Error loading products');
    }
});

module.exports = router;
