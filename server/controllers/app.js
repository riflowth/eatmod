const shop = require('../models/shop')

exports.getIndex = async (req, res) => {
    // TODO
    let shops = await shop.getShops();
    res.render(
        'index', {
           recommendMenus: [],
           recommendShops: shops
        }
    );
};

exports.getShop = (req, res) => {
    const { id } = req.params;
    res.render('shop', {});
};

exports.getShops = (req, res) => {
    res.render('shops', {});
};