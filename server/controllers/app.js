const Shop = require('../models/shop')

exports.getIndex = async (req, res) => {
    // TODO
    let shops = await Shop.getShops();
    res.render(
        'index', {
           recommendMenus: [],
           recommendShops: shops
        }
    );
};

exports.getShop = async (req, res) => {
    const { id } = req.params;
    let shop = await Shop.getShop(id);
    console.log(shop);
    res.render('shop', {
        name: shop.name,
        type: shop.type,
        location: shop.location,
        rating: 1,
        allRatings: 5,
        reviews: 5,
        openTime: shop.open,
        closeTime: shop.close
    });
};

exports.getShops = (req, res) => {
    res.render('shops', {});
};

exports.getLogin = (req, res) => {
    res.render('login', {});
};