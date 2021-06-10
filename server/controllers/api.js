const Shop = require('../models/shop');
const Menu = require('../models/menu');

exports.addFoodData = (req, res) => {
    const { id, name, type, price, shop_id } = req.body;
    Menu.insertFoodData(id, name, type, price, shop_id);
    res.status(201).json({ success: true });
};

exports.removeFoodData = (req, res) => {
    const { id } = req.body;
    Menu.deleteFoodData(id);
    res.status(201).json({ success: true });
};

exports.changeFoodData = (req, res) => {
    const { id, name, type, price, shop_id } = req.body;
    Menu.updateFoodData(id, name, type, price, shop_id);
    res.status(201).json({ success: true });
};

exports.updateReview = async (req, res) => {
    const { id, title, review, rating, foodId } = req.body;

    let findReview;
    try {
        findReview = await Shop.getReview(id);
        await Shop.updateReview(title, review, rating, new Date(), foodId, id);
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
    const { title, review, rating, foodId, shopId } = req.body;
    const userId = req.user;

    let findShop;
    try{
        findShop = await Shop.getShop(shopId);
        await Shop.writeReview(title, review, rating, new Date(), foodId, userId, shopId);
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
    const { id } = req.body;
    
    let findReview;
    try{
        findReview = await Shop.getReview(id);
        await Shop.deleteReview(id);
        res.status(200).json({ success: true });
    } catch {  
        if (findReview == null){
            res.status(404).json({ success: false });
        } else {
            res.status(500).json({ success: false });
        }
    }
};