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
    res.status(201).json({ success: true });
};

exports.removeFoodData = (req, res) => {
    let id = req.body.id;

    database.deleteFoodData(id);
    res.status(201).json({ success: true });
};

exports.changeFoodData = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let price = req.body.price;
    let image_url = req.body.image_url;
    let shop_id = req.body.shop_id;
    database.updateFoodData(id,name,type,price,image_url,shop_id);
    res.status(201).json({ success: true });
};

/*
//แยกส่วน (แบบรวมง่ายกว่า ใช้แบบรวม)

//เพิ่มrecord ใหม่ (จอง id ใหม่)
exports.addNewRecord = (req, res) => {
    database.insertFoodId()
    database.insertFoodUrl()
    res.status(201).json({ success: true });
};

exports.addFoodName = (req, res) => {
    let name = req.body.name;
    database.insertFoodName(name)
    res.status(201).json({ success: true });
};

exports.addFoodType = (req, res) => {
    let type = req.body.type;
    database.insertFoodName(type)
    res.status(201).json({ success: true });
};

exports.addFoodPrice = (req, res) => {
    let price = req.body.price;
    database.insertFoodName(price)
    res.status(201).json({ success: true });
};

exports.addFoodShopId = (req, res) => {
    let shop_id = req.body.shop_id;
    database.insertFoodName(shop_id)
    res.status(201).json({ success: true });
};

*/