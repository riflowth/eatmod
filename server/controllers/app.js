exports.getIndex = (req, res) => {
    // TODO for Backend
    res.render('index');
};

exports.getShop = (req, res) => {
    const { id } = req.params;
    res.render('shop', {});
};

exports.getShops = (req, res) => {
    res.render('shops', {});
};