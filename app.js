const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();
const productRouter = require('./routes/products');
const supplierRouter = require('./routes/suppliers');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout'); // layout mặc định

// body parser
app.use(express.urlencoded({ extended: true }));

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// middleware để tất cả view có access userId
app.use((req, res, next) => {
    res.locals.userId = req.session.userId || null;
    next();
});

// routes
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/suppliers', supplierRouter);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
