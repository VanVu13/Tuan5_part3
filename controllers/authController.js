const User = require('../models/User');

exports.registerForm = (req, res) => { 
    res.render('register', { error: null }); 
};

exports.register = async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        const user = new User({ username, password, email, phone });
        await user.save();
        req.session.userId = user._id;
        res.redirect('/');
    } catch(err){
        res.render('register', { error: err.message });
    }
};

exports.loginForm = (req, res) => { 
    res.render('login', { error: null }); 
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if(!user) return res.render('login', { error: 'User not found' });
        const match = await user.comparePassword(password);
        if(!match) return res.render('login', { error: 'Wrong password' });
        req.session.userId = user._id;
        res.redirect('/');
    } catch(err) {
        res.render('login', { error: err.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};
