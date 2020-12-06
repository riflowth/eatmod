const database = require('../models/database.js');

exports.getShops = (req, res) => {
    // TODO

    console.log("hi");
};

exports.getShopById = (req, res) => {
    // TODO
};

exports.addFoodData = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let price = req.body.price;
    let shop_id = req.body.shop_id;
    database.insertFoodData(id,name,type,price,shop_id);
    console.log("pain")
    res.status(201).json({ success: true });
};