exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

exports.isMember = (req, res, next) => {
    // TODO
    next();
};