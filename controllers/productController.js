const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
    const { search, supplierId } = req.query;
    let filter = {};

    if(search) filter.name = { $regex: search, $options: 'i' };
    if(supplierId && supplierId !== 'all') filter.supplierId = supplierId;

    const products = await Product.find(filter).populate('supplierId');
    const suppliers = await Supplier.find();

    res.render('products/index', { products, suppliers, search: search || '', selectedSupplier: supplierId || 'all' });
};

exports.newForm = async (req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/form', { product: {}, suppliers });
};

exports.create = async (req, res) => {
    await Product.create(req.body);
    res.redirect('/products');
};

exports.editForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/form', { product, suppliers });
};

exports.update = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
};

exports.delete = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};
