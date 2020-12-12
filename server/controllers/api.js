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

exports.updateReview = async (req, res) => {
    let { title, review, rating, date, foodId, shopId } = req.body; 
    let userId = req.user;

    let findReview;
    try {
        findReview = await Shop.getReview(userId, shopId);
        await Shop.updateReview(title, review, rating, date, foodId, userId, shopId);
        res.status(200).json({ success: true });
    } catch {
        if ( findReview == null){
            res.status(404).json({ success: false });
        } else {
            res.status(500).json({ success: false });
        }
    }
};

exports.writeReview = async (req, res) => {
    let { title, review, rating, date, foodId, shopId } = req.body;
    let userId = req.user;

    let findShop;
    try{
        findShop = await Shop.getShop(shopId);
        await Shop.writeReview(title, review, rating, date, foodId, userId, shopId);
        res.status(201).json({ success: true });
    } catch {  
        if (findShop == null){
            res.status(404).json({ success: false });
        } else {
            res.status(500).json({ success: false });
        }
    }
};

exports.deleteReview = async (req, res) => {
    let { shopId } = req.body;
    let userId = req.user;
    
    let findReview;
    try{
        findReview = await Shop.getReview(userId, shopId);
        await Shop.deleteReview(userId, shopId);
        res.status(200).json({ success: true });
    } catch {  
        if (findReview == null){
            res.status(404).json({ success: false });
        } else {
            res.status(500).json({ success: false });
        }
    }
};