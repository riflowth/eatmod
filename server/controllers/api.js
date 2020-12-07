const Shop = require('../models/shop');
const Menu = require('../models/menu');

exports.addFoodData = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let price = req.body.price;
    let shop_id = req.body.shop_id;
    Menu.insertFoodData(id, name, type, price, shop_id);
    res.status(201).json({ success: true });
};

exports.removeFoodData = (req, res) => {
    let id = req.body.id;
    Menu.deleteFoodData(id);
  
    res.status(201).json({ success: true });
};

exports.changeFoodData = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let price = req.body.price;
    let shop_id = req.body.shop_id;
    Menu.updateFoodData(id, name, type, price, shop_id);
  
    res.status(201).json({ success: true });
};

exports.writeReview = (req, res) => {
    let review = req.body.review;
    let userId = 1;
    let rating = req.body.rating;
    let shopId = req.body.shopId;
    Shop.writeReview(rating, userId, review, shopId);
    
    res.status(201).json({ success: true });
};

exports.updateReview = (req, res) => {
    let review = req.body.review;
    let userId = 1;
    let rating = req.body.rating;
    let shopId = req.body.shopId;
    Shop.updateReview(rating, userId, review, shopId);

    res.status(200).json({ success: true });
}

exports.deleteReview = (req, res) => {
    let shopId = req.body.shopId;
    let userId = 1;
    Shop.deleteReview(userId, shopId);
    
    res.status(200).json({ success: true });
}

exports.getShopLink = async (req, res) => {
    let id = req.body.id;
    Menu.getShopLinkByMenuId(id);

    res.status(200).json({ success: true });
}